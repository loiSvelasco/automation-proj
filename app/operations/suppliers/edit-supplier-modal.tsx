import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Supplier } from "./page";

interface EditSupplierModalProps {
  open: boolean;
  onClose: () => void;
  onEdit: (supplier: Supplier) => void;
  supplier: Supplier | null;
}

export default function EditSupplierModal({ open, onClose, onEdit, supplier }: EditSupplierModalProps) {
  const [form, setForm] = useState<Omit<Supplier, "id">>({
    supplierId: "",
    companyName: "",
    address: "",
    contactNumber: ""
  });
  useEffect(() => {
    if (supplier) {
      const { id, ...rest } = supplier;
      setForm(rest);
    }
  }, [supplier]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supplier) onEdit({ ...form, id: supplier.id } as Supplier);
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Supplier</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input name="supplierId" placeholder="Supplier ID" value={form.supplierId} onChange={handleChange} required />
          <Input name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} required />
          <Input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          <Input name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} required />
          <DialogFooter>
            <Button type="submit" className="bg-gray-800 text-white">Save Changes</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 