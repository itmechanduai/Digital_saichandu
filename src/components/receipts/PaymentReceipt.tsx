import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Mail, 
  Printer,
  CheckCircle,
  CreditCard,
  Calendar
} from 'lucide-react';

interface PaymentReceiptData {
  receiptNumber: string;
  paymentDate: string;
  invoiceNumber: string;
  customerInfo: {
    name: string;
    email: string;
    company: string;
  };
  paymentMethod: {
    type: 'credit_card' | 'bank_transfer' | 'paypal' | 'stripe';
    last4?: string;
    brand?: string;
  };
  amount: number;
  transactionId: string;
  status: 'completed' | 'pending' | 'failed';
}

interface PaymentReceiptProps {
  receipt: PaymentReceiptData;
  onDownload?: () => void;
  onEmail?: () => void;
  onPrint?: () => void;
}

const PaymentReceipt: React.FC<PaymentReceiptProps> = ({
  receipt,
  onDownload,
  onEmail,
  onPrint
}) => {
  const getPaymentMethodDisplay = () => {
    switch (receipt.paymentMethod.type) {
      case 'credit_card':
        return `${receipt.paymentMethod.brand} •••• ${receipt.paymentMethod.last4}`;
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'paypal':
        return 'PayPal';
      case 'stripe':
        return 'Stripe';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = () => {
    switch (receipt.status) {
      case 'completed':
        return 'text-emerald-600 bg-emerald-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Action Buttons */}
      <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Payment Receipt</h2>
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

      {/* Receipt Content */}
      <div className="p-8" id="receipt-content">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-xl mx-auto mb-4 inline-block">
            Digital Saichandu
          </div>
          <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Receipt</h1>
          <p className="text-gray-600">Thank you for your payment!</p>
        </div>

        {/* Payment Status */}
        <div className="text-center mb-8">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor()}`}>
            {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
          </span>
        </div>

        {/* Receipt Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Receipt Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Receipt #:</span>
                  <span className="font-medium text-gray-900">{receipt.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date:</span>
                  <span className="font-medium text-gray-900">{receipt.paymentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Invoice #:</span>
                  <span className="font-medium text-gray-900">{receipt.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium text-gray-900 text-sm">{receipt.transactionId}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium text-gray-900">{receipt.customerInfo.name}</p>
                </div>
                {receipt.customerInfo.company && (
                  <div>
                    <span className="text-gray-600">Company:</span>
                    <p className="font-medium text-gray-900">{receipt.customerInfo.company}</p>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium text-gray-900">{receipt.customerInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payment Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium text-gray-900">{getPaymentMethodDisplay()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-emerald-600">
                  {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600 mb-1">Amount Paid</p>
              <p className="text-3xl font-bold text-blue-600">₹{receipt.amount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="border-t border-gray-200 pt-6">
          <div className="text-center text-gray-600">
            <p className="font-semibold">Digital Saichandu</p>
            <p>Hyderabad, Telangana, India</p>
            <p>info@digitalsaichandu.com | +91 9390437608</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            This is an official payment receipt. Keep this for your records.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            For questions about this payment, contact us at info@digitalsaichandu.com
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentReceipt;