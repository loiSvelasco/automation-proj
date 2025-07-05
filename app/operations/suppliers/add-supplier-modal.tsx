import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Supplier } from "./page";

interface AddSupplierModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (supplier: Supplier) => void;
}

export default function AddSupplierModal({ open, onClose, onAdd }: AddSupplierModalProps) {
  const [form, setForm] = useState<Omit<Supplier, "id">>({
    supplierId: "",
    companyName: "",
    address: "",
    contactNumber: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...form, id: Date.now() } as Supplier);
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input name="supplierId" placeholder="Supplier ID" value={form.supplierId} onChange={handleChange} required />
          <Input name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} required />
          <Input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          <Input name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} required />
          <DialogFooter>
            <Button type="submit" className="bg-gray-800 text-white">Add Supplier</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 