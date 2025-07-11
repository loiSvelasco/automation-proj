import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditOrderModalProps {
  open: boolean;
  order: {
    dr: string;
    description: string;
    unitCost: string;
    quantity: number;
    boxes: number;
    amount: number;
  } | null;
  onSave: (order: any) => void;
  onClose: () => void;
}

export default function EditOrderModal({ open, order, onSave, onClose }: EditOrderModalProps) {
  const [form, setForm] = useState(order || { dr: '', description: '', unitCost: '', quantity: 1, boxes: 1, amount: 0 });

  React.useEffect(() => {
    setForm(order || { dr: '', description: '', unitCost: '', quantity: 1, boxes: 1, amount: 0 });
  }, [order]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'quantity' || name === 'boxes' ? Number(value) : value }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input name="dr" value={form.dr} onChange={handleChange} placeholder="DR" className="w-full" />
          <Input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full" />
          <Input name="unitCost" value={form.unitCost} onChange={handleChange} placeholder="Unit Cost" className="w-full" />
          <Input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="w-full" />
          <Input name="boxes" type="number" value={form.boxes} onChange={handleChange} placeholder="Box/es" className="w-full" />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 