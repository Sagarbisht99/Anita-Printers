"use client";

import { useMemo, useState } from "react";
import { useCreateOrder } from "@/app/hooks/admin";
import { Button } from "@/app/components/admin/ui/button";
import { Field, Input, Select } from "@/app/components/admin/ui/field";

function formatMoney(value: number) {
  if (!Number.isFinite(value)) return "0.00";
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function OrderForm({
  products,
  onSuccess,
}: {
  products: { id: number; titleName: string; pricing: number }[];
  onSuccess: () => void;
}) {
  const create = useCreateOrder();
  const [error, setError] = useState<string | null>(null);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unitPrice, setUnitPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [totalTouched, setTotalTouched] = useState(false);

  const selectedProduct = useMemo(
    () => products.find((product) => String(product.id) === productId),
    [productId, products],
  );

  const computedTotal = useMemo(() => {
    const qty = Number(quantity);
    const price = Number(unitPrice);
    if (!Number.isFinite(qty) || !Number.isFinite(price)) return 0;
    return Math.round(qty * price * 100) / 100;
  }, [quantity, unitPrice]);

  function syncTotal(nextQty: string, nextUnitPrice: string) {
    const qty = Number(nextQty);
    const price = Number(nextUnitPrice);
    if (!Number.isFinite(qty) || !Number.isFinite(price)) {
      setTotalAmount("");
      return;
    }
    setTotalAmount(String(Math.round(qty * price * 100) / 100));
  }

  function handleProductChange(value: string) {
    setProductId(value);
    const product = products.find((item) => String(item.id) === value);
    if (!product) return;
    const nextUnit = String(product.pricing);
    setUnitPrice(nextUnit);
    setTotalTouched(false);
    syncTotal(quantity, nextUnit);
  }

  function handleQuantityChange(value: string) {
    setQuantity(value);
    if (!totalTouched) syncTotal(value, unitPrice);
  }

  function handleUnitPriceChange(value: string) {
    setUnitPrice(value);
    if (!totalTouched) syncTotal(quantity, value);
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    try {
      await create.mutateAsync(formData);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create order.");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Customer name">
          <Input name="customerName" required placeholder="Rahul Sharma" />
        </Field>
        <Field label="Phone">
          <Input name="phoneNumber" required placeholder="9876543210" />
        </Field>
      </div>

      <Field label="Email">
        <Input
          name="email"
          type="email"
          required
          placeholder="customer@email.com"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Product">
          <Select
            name="productId"
            required
            value={productId}
            onChange={(e) => handleProductChange(e.target.value)}
          >
            <option value="" disabled>
              Select product
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.titleName}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Status">
          <Select name="status" defaultValue="pending">
            <option value="pending">Pending</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Quantity">
          <Input
            name="quantity"
            type="number"
            min={1}
            step={1}
            required
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
          />
        </Field>
        <Field label="Single piece price (₹)">
          <Input
            name="unitPrice"
            type="number"
            min={0.01}
            step="0.01"
            required
            value={unitPrice}
            onChange={(e) => handleUnitPriceChange(e.target.value)}
            placeholder={
              selectedProduct
                ? String(selectedProduct.pricing)
                : "e.g. 250"
            }
          />
        </Field>
        <Field label="Total order amount (₹)">
          <Input
            name="totalAmount"
            type="number"
            min={0.01}
            step="0.01"
            required
            value={totalAmount}
            onChange={(e) => {
              setTotalTouched(true);
              setTotalAmount(e.target.value);
            }}
            placeholder="Qty × price"
          />
        </Field>
      </div>

      <p className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-400">
        Calculated: {quantity || 0} × ₹{formatMoney(Number(unitPrice) || 0)} ={" "}
        <span className="font-medium text-[#93C5FD]">
          ₹{formatMoney(computedTotal)}
        </span>
        {totalTouched ? " · total can also be set manually" : ""}
      </p>

      {products.length === 0 ? (
        <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
          Create a product first before adding orders.
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
          {error}
        </p>
      ) : null}

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="submit"
          loading={create.isPending}
          disabled={products.length === 0}
        >
          Create order
        </Button>
      </div>
    </form>
  );
}
