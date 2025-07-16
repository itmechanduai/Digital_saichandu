import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Mail, 
  Printer,
  Calendar,
  DollarSign,
  FileText
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerInfo: {
    name: string;
    email: string;
    company: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  terms?: string;
}

interface InvoiceTemplateProps {
  invoice: InvoiceData;
  onDownload?: () => void;
  onEmail?: () => void;
  onPrint?: () => void;
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({
  invoice,
  onDownload,
  onEmail,
  onPrint
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Action Buttons */}
      <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Invoice Preview</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
          <button
            onClick={onEmail}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </button>
          <button
            onClick={onPrint}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="p-8" id="invoice-content">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-xl mb-4">
              Digital Saichandu
            </div>
            <div className="text-gray-600">
              <p className="font-semibold">Digital Saichandu</p>
              <p>Hyderabad, Telangana, India</p>
              <p>info@digitalsaichandu.com</p>
              <p>+91 9390437608</p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
            <div className="text-gray-600">
              <p><span className="font-medium">Invoice #:</span> {invoice.invoiceNumber}</p>
              <p><span className="font-medium">Date:</span> {invoice.date}</p>
              <p><span className="font-medium">Due Date:</span> {invoice.dueDate}</p>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Bill To:</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-900">{invoice.customerInfo.name}</p>
            {invoice.customerInfo.company && (
              <p className="text-gray-600">{invoice.customerInfo.company}</p>
            )}
            <p className="text-gray-600">{invoice.customerInfo.address}</p>
            <p className="text-gray-600">
              {invoice.customerInfo.city}, {invoice.customerInfo.zipCode}
            </p>
            <p className="text-gray-600">{invoice.customerInfo.country}</p>
            <p className="text-gray-600 mt-2">{invoice.customerInfo.email}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 font-semibold text-gray-900">Description</th>
                <th className="text-center py-3 font-semibold text-gray-900">Qty</th>
                <th className="text-right py-3 font-semibold text-gray-900">Rate</th>
                <th className="text-right py-3 font-semibold text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-4 text-gray-900">{item.description}</td>
                  <td className="py-4 text-center text-gray-600">{item.quantity}</td>
                  <td className="py-4 text-right text-gray-600">${item.rate.toLocaleString()}</td>
                  <td className="py-4 text-right font-medium text-gray-900">
                    ${item.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium text-gray-900">₹{invoice.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax:</span>
              <span className="font-medium text-gray-900">₹{invoice.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-gray-200">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-lg font-bold text-blue-600">₹{invoice.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        <div className="grid md:grid-cols-2 gap-8">
          {invoice.notes && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Notes:</h4>
              <p className="text-gray-600 text-sm">{invoice.notes}</p>
            </div>
          )}
          {invoice.terms && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions:</h4>
              <p className="text-gray-600 text-sm">{invoice.terms}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            Thank you for your business! For questions about this invoice, contact us at info@digitalsaichandu.com
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceTemplate;