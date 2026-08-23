"use client";

export type ImageKitUploadResult = {
  url: string;
  fileId: string;
  name: string;
  thumbnailUrl?: string;
};

type AuthParams = {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
};

function isAuthParams(value: unknown): value is AuthParams {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  return (
    typeof data.token === "string" &&
    typeof data.signature === "string" &&
    typeof data.publicKey === "string" &&
    (typeof data.expire === "number" || typeof data.expire === "string")
  );
}

async function fetchUploadAuth(): Promise<AuthParams> {
  const response = await fetch("/api/imagekit/auth", {
    method: "GET",
    credentials: "same-origin",
    cache: "no-store",
  });

  const raw = await response.text();

  if (!response.ok) {
    throw new Error(
      response.status === 401
        ? "Please sign in as admin to upload images."
        : `ImageKit auth failed (${response.status}): ${raw || "empty response"}`,
    );
  }

  if (!raw.trim()) {
    throw new Error(
      "ImageKit auth returned an empty response. Restart the server and try again.",
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(
      "ImageKit auth returned invalid JSON. Check /api/imagekit/auth and your session.",
    );
  }

  if (!isAuthParams(parsed)) {
    throw new Error(
      "ImageKit auth response is missing token/signature/publicKey.",
    );
  }

  return {
    token: parsed.token,
    signature: parsed.signature,
    publicKey: parsed.publicKey,
    expire: Number(parsed.expire),
  };
}

function parseUploadBody(raw: string) {
  if (!raw.trim()) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function uploadWithXhr(
  file: File,
  auth: AuthParams,
  options?: {
    folder?: string;
    onProgress?: (percent: number) => void;
    signal?: AbortSignal;
  },
): Promise<ImageKitUploadResult> {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.set("file", file);
    form.set("fileName", file.name.replace(/[^\w.\-]+/g, "_"));
    form.set("publicKey", auth.publicKey);
    form.set("signature", auth.signature);
    form.set("expire", String(auth.expire));
    form.set("token", auth.token);
    form.set("useUniqueFileName", "true");
    if (options?.folder) form.set("folder", options.folder);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://upload.imagekit.io/api/v1/files/upload");

    xhr.upload.onprogress = (event) => {
      if (!event.total || !options?.onProgress) return;
      options.onProgress(Math.round((event.loaded / event.total) * 100));
    };

    const onAbort = () => {
      xhr.abort();
      reject(new Error("Upload aborted."));
    };

    if (options?.signal) {
      if (options.signal.aborted) {
        reject(new Error("Upload aborted."));
        return;
      }
      options.signal.addEventListener("abort", onAbort, { once: true });
    }

    xhr.onload = () => {
      options?.signal?.removeEventListener("abort", onAbort);
      const raw = xhr.responseText ?? "";
      const parsed = parseUploadBody(raw);

      if (xhr.status >= 200 && xhr.status < 300) {
        const url = typeof parsed?.url === "string" ? parsed.url : "";
        const fileId = typeof parsed?.fileId === "string" ? parsed.fileId : "";
        if (!url || !fileId) {
          reject(new Error("ImageKit upload succeeded but returned no URL."));
          return;
        }
        resolve({
          url,
          fileId,
          name: typeof parsed?.name === "string" ? parsed.name : file.name,
          thumbnailUrl:
            typeof parsed?.thumbnailUrl === "string"
              ? parsed.thumbnailUrl
              : undefined,
        });
        return;
      }

      const message =
        (typeof parsed?.message === "string" && parsed.message) ||
        (raw.trim() ? raw.slice(0, 300) : "");

      if (xhr.status === 403) {
        reject(
          new Error(
            message ||
              "ImageKit rejected upload (403). Public + private keys are invalid or from different accounts — regenerate both at imagekit.io/dashboard/developer/api-keys, update .env, restart npm run dev.",
          ),
        );
        return;
      }

      reject(
        new Error(
          message ||
            `ImageKit upload failed (${xhr.status})${raw ? `: ${raw.slice(0, 200)}` : " with empty response"}.`,
        ),
      );
    };

    xhr.onerror = () => {
      options?.signal?.removeEventListener("abort", onAbort);
      reject(new Error("Network error while uploading to ImageKit."));
    };

    xhr.send(form);
  });
}

export async function uploadFileToImageKit(
  file: File,
  options?: {
    folder?: string;
    onProgress?: (percent: number) => void;
    signal?: AbortSignal;
  },
): Promise<ImageKitUploadResult> {
  const auth = await fetchUploadAuth();
  return uploadWithXhr(file, auth, options);
}

export async function uploadFilesToImageKit(
  files: File[],
  options?: {
    folder?: string;
    onFileProgress?: (index: number, percent: number) => void;
  },
): Promise<ImageKitUploadResult[]> {
  const results: ImageKitUploadResult[] = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const uploaded = await uploadFileToImageKit(file, {
      folder: options?.folder,
      onProgress: (percent) => options?.onFileProgress?.(index, percent),
    });
    results.push(uploaded);
  }

  return results;
}
