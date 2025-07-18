import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactToPrint from 'react-to-print';
import JsBarcode from 'jsbarcode';
import { 
  Plus, 
  Minus, 
  Download, 
  Mail, 
  Printer,
  Calendar,
  DollarSign,
  FileText,
  Save,
  Trash2,
  Edit,
  Image
} from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Invoice data structure
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
  taxRate: number;
  tax: number;
  total: number;
  notes?: string;
  terms?: string;
}

// Create a separate component for the printable content
const InvoiceContent = React.forwardRef<HTMLDivElement, { 
  invoice: any, 
  companyDetails: any, 
  logoUrl: string, 
  watchedItems: any[], 
  subtotal: number, 
  tax: number, 
  total: number, 
  watch: any 
}>((props, ref) => {
  const { invoice, companyDetails, logoUrl, watchedItems, subtotal, tax, total, watch } = props;
  
  // Generate barcode when component mounts
  React.useEffect(() => {
    setTimeout(() => {
      const barcodeElement = document.getElementById('barcode');
      if (barcodeElement) {
        JsBarcode(barcodeElement, watch('invoiceNumber'), {
          format: "CODE128",
          width: 1.5,
          height: 40,
          displayValue: false
        });
      }
    }, 100);
  }, [watch]);
  
  return (
    <div className="p-8 print-content" id="invoice-content" ref={ref}>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="mb-4">
            <img 
              src={logoUrl} 
              alt="Company Logo" 
              className="h-16 w-auto"
            />
          </div>
          <div className="text-gray-600">
            <p className="font-semibold">{companyDetails.name}</p>
            <p>{companyDetails.address}</p>
            <p>{companyDetails.email}</p>
            <p>{companyDetails.phone}</p>
            <p>{companyDetails.website}</p>
            <p className="font-medium">{companyDetails.gst}</p>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h1>
          <div className="text-gray-600">
            <p><span className="font-medium">Invoice #:</span> {watch('invoiceNumber')}</p>
            <p><span className="font-medium">Date:</span> {watch('date')}</p>
            <p><span className="font-medium">Due Date:</span> {watch('dueDate')}</p>
          </div>
          <div className="mt-4">
            <svg id="barcode" className="ml-auto"></svg>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Bill To:</h3>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{watch('customerInfo.name')}</p>
          {watch('customerInfo.company') && (
            <p className="text-gray-600">{watch('customerInfo.company')}</p>
          )}
          <p className="text-gray-600">{watch('customerInfo.address')}</p>
          <p className="text-gray-600">
            {watch('customerInfo.city')}, {watch('customerInfo.zipCode')}
          </p>
          <p className="text-gray-600">{watch('customerInfo.country')}</p>
          <p className="text-gray-600 mt-2">{watch('customerInfo.email')}</p>
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
            {watchedItems.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-4 text-gray-900">{item.description}</td>
                <td className="py-4 text-center text-gray-600">{item.quantity}</td>
                <td className="py-4 text-right text-gray-600">₹{item.rate?.toLocaleString()}</td>
                <td className="py-4 text-right font-medium text-gray-900">
                  ₹{(item.quantity * item.rate)?.toLocaleString()}
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
            <span className="font-medium text-gray-900">₹{subtotal?.toLocaleString() || '0'}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">GST ({watch('taxRate')}%):</span>
            <span className="font-medium text-gray-900">₹{tax?.toLocaleString() || '0'}</span>
          </div>
          <div className="flex justify-between py-3 border-t-2 border-gray-200">
            <span className="text-lg font-semibold text-gray-900">Total:</span>
            <span className="text-lg font-bold text-blue-600">₹{total?.toLocaleString() || '0'}</span>
          </div>
        </div>
      </div>

      {/* Notes and Terms */}
      <div className="grid md:grid-cols-2 gap-8">
        {watch('notes') && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Notes:</h4>
            <p className="text-gray-600 text-sm">{watch('notes')}</p>
          </div>
        )}
        {watch('terms') && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions:</h4>
            <p className="text-gray-600 text-sm">{watch('terms')}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-8 border-t border-gray-200 text-center">
        <p className="text-gray-500 text-sm">
          Thank you for your business! For questions about this invoice, contact us at {companyDetails.email}
        </p>
      </div>
    </div>
  );
});

// Form validation schema
const schema = yup.object({
  invoiceNumber: yup.string().required('Invoice number is required'),
  date: yup.string().required('Date is required'),
  dueDate: yup.string().required('Due date is required'),
  customerInfo: yup.object({
    name: yup.string().required('Customer name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    company: yup.string(),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    zipCode: yup.string().required('ZIP code is required'),
    country: yup.string().required('Country is required'),
  }),
  items: yup.array().of(
    yup.object({
      description: yup.string().required('Description is required'),
      quantity: yup.number().required('Quantity is required').min(1, 'Minimum quantity is 1'),
      rate: yup.number().required('Rate is required').min(0, 'Rate must be positive'),
    })
  ).min(1, 'At least one item is required'),
  taxRate: yup.number().min(0, 'Tax rate must be positive').max(100, 'Tax rate cannot exceed 100%'),
  notes: yup.string(),
  terms: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

const InvoiceGenerator: React.FC = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const componentRef = useRef(null);
  const [logoUrl, setLogoUrl] = useState('/ds.logo.png');
  const [companyDetails, setCompanyDetails] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    website: '',
    gst: ''
  });
  
  // Generate a random invoice number if not provided
  const generateInvoiceNumber = () => {
    const prefix = 'INV';
    const year = new Date().getFullYear();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-${year}-${randomNum}`;
  };

  // Set default values for the form
  const defaultValues = {
    invoiceNumber: generateInvoiceNumber(),
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    customerInfo: {
      name: '',
      email: '',
      company: '',
      address: '',
      city: '',
      zipCode: '',
      country: 'India',
    },
    items: [
      {
        id: '1',
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0,
      },
    ],
    taxRate: 18, // Default GST rate in India
    notes: 'Thank you for your business!',
    terms: 'Payment is due within 15 days of invoice date.',
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // Watch form values to calculate totals
  const watchedItems = watch('items');
  const watchedTaxRate = watch('taxRate');
  const watchedInvoiceNumber = watch('invoiceNumber');

  // Calculate subtotal, tax, and total
  const calculateSubtotal = () => {
    return watchedItems.reduce((sum, item) => {
      const quantity = item.quantity || 0;
      const rate = item.rate || 0;
      return sum + (quantity * rate);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = (subtotal * (watchedTaxRate / 100));
  const total = subtotal + tax;

  React.useEffect(() => {
    watchedItems.forEach((item, index) => {
      const quantity = item.quantity || 0;
      const rate = item.rate || 0;
      const amount = quantity * rate;
      
      if (amount !== item.amount) {
        setValue(`items.${index}.amount`, amount);
      }
    });
  }, [watchedItems, setValue]);

  const onSubmit = async (data: FormData) => {
    setPreviewMode(true);
    console.log('Preview mode enabled, invoice data:', data);
    
    // Calculate totals for preview
    const calculatedSubtotal = calculateSubtotal();
    const calculatedTax = (calculatedSubtotal * (data.taxRate / 100));
    const calculatedTotal = calculatedSubtotal + calculatedTax;
    
    // Update form values with calculated totals
    setValue('subtotal', calculatedSubtotal);
    setValue('tax', calculatedTax);
    setValue('total', calculatedTotal);
  };

  function handleAddItem() {
    append({
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    });
  };

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    alert('In a production environment, this would download the invoice as a PDF');
    console.log('Download invoice:', componentRef.current);
  };

  const handleSendEmail = () => {
    // In a real implementation, this would send the invoice via email
    alert('In a production environment, this would send the invoice via email');
    console.log('Send email with invoice:', componentRef.current);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Invoice Generator</h1>
        <div className="flex items-center space-x-3">
          {previewMode ? (
            <>
              <button
                onClick={() => setPreviewMode(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit className="h-5 w-5 mr-2 inline-block" />
                Edit Invoice
              </button>
              <ReactToPrint
                trigger={() => (
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Printer className="h-5 w-5 mr-2 inline-block" />
                    Print
                  </button>
                )}
                content={() => componentRef.current}
                documentTitle={`Invoice-${watchedInvoiceNumber || 'New'}`}
              />
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-5 w-5 mr-2 inline-block" />
                Download PDF
              </button>
              <button
                onClick={handleSendEmail}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2 inline-block" />
                Send Email
              </button>
            </>
          ) : (
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              type="button"
            >
              <Save className="h-5 w-5 mr-2 inline-block" />
              Preview Invoice
            </button>
          )}
        </div>
      </div>

      {previewMode ? (
        // Invoice Preview
        <div className="bg-white rounded-xl shadow-lg overflow-hidden"> 
          <InvoiceContent
            ref={componentRef}
            invoice={watch()}
            companyDetails={companyDetails}
            logoUrl={logoUrl}
            watchedItems={watchedItems}
            subtotal={subtotal}
            tax={tax}
            total={total}
            watch={watch}
          />
        </div>
      ) : (
        // Invoice Form
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-xl p-6 custom-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Logo
                </label>
                <div className="flex items-center space-x-4">
                  <img 
                    src={logoUrl} 
                    alt="Company Logo" 
                    className="h-16 w-auto border rounded-lg p-2"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <Image className="h-4 w-4 mr-2 inline-block" />
                    Change Logo
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Details
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={companyDetails.name}
                    onChange={(e) => setCompanyDetails({...companyDetails, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company Name"
                  />
                  <input
                    type="text"
                    value={companyDetails.address}
                    onChange={(e) => setCompanyDetails({...companyDetails, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    value={companyDetails.gst}
                    onChange={(e) => setCompanyDetails({...companyDetails, gst: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="GSTIN"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 custom-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Invoice Details</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('invoiceNumber')}
                    type="text"
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.invoiceNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="INV-2024-00001"
                  />
                </div>
                {errors.invoiceNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.invoiceNumber.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('date')}
                    type="date"
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.date ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('dueDate')}
                    type="date"
                    className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.dueDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 custom-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name *
                </label>
                <input
                  {...register('customerInfo.name')}
                  type="text"
                  className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.customerInfo?.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.customerInfo?.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.customerInfo.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  {...register('customerInfo.email')}
                  type="email"
                  className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.customerInfo?.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.customerInfo?.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.customerInfo.email.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company (Optional)
                </label>
                <input
                  {...register('customerInfo.company')}
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Company Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  {...register('customerInfo.address')}
                  type="text"
                  className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.customerInfo?.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="123 Main St"
                />
                {errors.customerInfo?.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.customerInfo.address.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  {...register('customerInfo.city')}
                  type="text"
                  className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.customerInfo?.city ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="City"
                />
                {errors.customerInfo?.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.customerInfo.city.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  {...register('customerInfo.zipCode')}
                  type="text"
                  className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.customerInfo?.zipCode ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="123456"
                />
                {errors.customerInfo?.zipCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.customerInfo.zipCode.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <select
                  {...register('customerInfo.country')}
                  className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.customerInfo?.country ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
                {errors.customerInfo?.country && (
                  <p className="mt-1 text-sm text-red-600">{errors.customerInfo.country.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 custom-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Invoice Items</h2>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-semibold text-gray-900">Description</th>
                    <th className="text-center py-3 font-semibold text-gray-900">Quantity</th>
                    <th className="text-right py-3 font-semibold text-gray-900">Rate (₹)</th>
                    <th className="text-right py-3 font-semibold text-gray-900">Amount (₹)</th>
                    <th className="text-center py-3 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={field.id} className="border-b border-gray-100">
                      <td className="py-4">
                        <input
                          {...register(`items.${index}.description`)}
                          type="text"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.items?.[index]?.description ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Item description"
                        />
                      </td>
                      <td className="py-4">
                        <input
                          {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                          type="number"
                          min="1"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center ${
                            errors.items?.[index]?.quantity ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                      </td>
                      <td className="py-4">
                        <input
                          {...register(`items.${index}.rate`, { valueAsNumber: true })}
                          type="number"
                          min="0"
                          step="0.01"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right ${
                            errors.items?.[index]?.rate ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                      </td>
                      <td className="py-4 text-right font-medium text-gray-900">
                        ₹{((watchedItems[index]?.quantity || 0) * (watchedItems[index]?.rate || 0)).toLocaleString()}
                      </td>
                      <td className="py-4 text-center">
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <div className="w-64 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Tax Rate (%):</span>
                    <input 
                      {...register('taxRate', { valueAsNumber: true })}
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                    />
                  </div>
                  <span className="font-medium text-gray-900">₹{tax.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between pt-3 border-t-2 border-gray-200 mt-2">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-blue-600">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 custom-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  {...register('notes')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional notes for the customer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Terms & Conditions
                </label>
                <textarea
                  {...register('terms')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Terms and conditions for this invoice"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Preview Invoice</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default InvoiceGenerator;