import { X, Printer, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpenseItem {
  id: number;
  date: string;
  payee: string;
  particulars: string;
  type: string;
  amount: number;
}

interface ExpensesPrintDownloadModalProps {
  open: boolean;
  onClose: () => void;
  type: 'print' | 'download';
  expenses: ExpenseItem[];
  date: string;
  bcb: string;
  cashOnHand: number;
  onAction: () => void;
}

export default function ExpensesPrintDownloadModal({
  open,
  onClose,
  type,
  expenses,
  date,
  bcb,
  cashOnHand,
  onAction,
}: ExpensesPrintDownloadModalProps) {
  if (!open) return null;
  const totalExpenses = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          {type === 'print' ? <Printer className="w-5 h-5" /> : <Download className="w-5 h-5" />}
          {type === 'print' ? 'Print Expenses' : 'Download Expenses'}
        </h2>
        {/* Print/Download Layout - API ready */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <div>
              <div className="text-sm text-gray-500">Date</div>
              <div className="font-semibold text-gray-900">{date}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">BCB</div>
              <div className="font-semibold text-gray-900">Php {bcb}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Cash on Hand</div>
              <div className="font-semibold text-gray-900">Php {Number(cashOnHand).toLocaleString(undefined, { minimumFractionDigits: 0 })}</div>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">#</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Payee</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Particulars</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 text-sm text-gray-900">{idx + 1}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.date}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.payee}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.particulars}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.type}</td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right">{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <div className="text-lg font-bold">Total: Php {totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md flex items-center gap-2 font-semibold"
            onClick={onAction}
          >
            {type === 'print' ? <Printer className="w-5 h-5" /> : <Download className="w-5 h-5" />}
            {type === 'print' ? 'Print' : 'Download'}
          </Button>
          <Button
            variant="outline"
            className="px-6 py-2 rounded-md font-semibold"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
} 