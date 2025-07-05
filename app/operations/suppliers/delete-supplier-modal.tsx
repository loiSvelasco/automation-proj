import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Supplier } from "./page";

interface DeleteSupplierModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  supplier: Supplier | null;
}

export default function DeleteSupplierModal({ open, onClose, onDelete, supplier }: DeleteSupplierModalProps) {
  if (!supplier) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Supplier</DialogTitle>
        </DialogHeader>
        <div className="py-4">Are you sure you want to delete <span className="font-semibold">{supplier.companyName}</span>?</div>
        <DialogFooter>
          <Button onClick={() => onDelete(supplier.id)} className="bg-red-600 text-white">Delete</Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 