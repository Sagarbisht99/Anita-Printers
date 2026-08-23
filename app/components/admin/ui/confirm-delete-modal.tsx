"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/app/components/admin/ui/button";
import { Modal } from "@/app/components/admin/ui/modal";

type ConfirmDeleteModalProps = {
  open: boolean;
  title?: string;
  itemLabel: string;
  description?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConfirmDeleteModal({
  open,
  title = "Delete item",
  itemLabel,
  description,
  loading,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      open={open}
      onClose={loading ? () => undefined : onClose}
      title={title}
      description={description ?? "This action cannot be undone."}
      size="md"
    >
      <div className="space-y-5">
        <div className="flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3.5">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-300">
            <Trash2 className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white">
              Delete{" "}
              <span className="text-rose-200">&ldquo;{itemLabel}&rdquo;</span>?
            </p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">
              Ye permanently remove ho jayega. Undo nahi hoga.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={loading}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            loading={loading}
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
