import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  features: string[];
  deliveryTime: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  popular?: boolean;
  new?: boolean;
}

interface ProductContextType {
  products: Product[];
  categories: string[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  searchProducts: (query: string) => Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Sample product data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Google Ads Campaign Management',
    description: 'Complete Google Ads campaign setup and management with keyword research, ad copy creation, bid optimization, and performance tracking. Our experts will maximize your ROI and drive quality traffic to your website.',
    shortDescription: 'Professional Google Ads campaign setup and management',
    price: 15000,
    originalPrice: 20000,
    image: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg',
    images: [
      'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg',
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    ],
    category: 'Digital Marketing Services',
    features: ['Keyword Research', 'Ad Copy Creation', 'Bid Management', 'Performance Tracking', '24/7 Monitoring'],
    deliveryTime: '3-5 business days',
    rating: 4.9,
    reviews: 127,
    inStock: true,
    popular: true
  },
  {
    id: '2',
    name: 'Meta Ads (Facebook & Instagram)',
    description: 'Strategic Facebook and Instagram advertising campaigns designed to reach your target audience with precision. Includes creative development, audience targeting, A/B testing, and detailed analytics.',
    shortDescription: 'Facebook & Instagram advertising campaigns',
    price: 12000,
    originalPrice: 16000,
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
    images: [
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'
    ],
    category: 'Digital Marketing Services',
    features: ['Audience Targeting', 'Creative Development', 'A/B Testing', 'Social Analytics', 'Campaign Optimization'],
    deliveryTime: '2-4 business days',
    rating: 4.8,
    reviews: 89,
    inStock: true
  },
  {
    id: '3',
    name: 'Lead Generation System',
    description: 'Automated lead generation system with landing page creation, lead magnets, email sequences, and CRM integration. Turn visitors into qualified leads and customers.',
    shortDescription: 'Complete automated lead generation solution',
    price: 20000,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    images: [
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
    ],
    category: 'Digital Marketing Services',
    features: ['Landing Page Creation', 'Lead Magnets', 'Email Sequences', 'CRM Integration', 'Analytics Dashboard'],
    deliveryTime: '5-7 business days',
    rating: 4.9,
    reviews: 156,
    inStock: true,
    new: true
  },
  {
    id: '4',
    name: 'Professional Website Development',
    description: 'Modern, responsive website development with SEO optimization, fast loading speeds, and user-friendly design. Perfect for businesses looking to establish a strong online presence.',
    shortDescription: 'Custom website development with SEO optimization',
    price: 30000,
    originalPrice: 40000,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    images: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      'https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg'
    ],
    category: 'Digital Marketing Services',
    features: ['Responsive Design', 'SEO Optimization', 'Speed Optimization', 'Content Management', 'Mobile-First'],
    deliveryTime: '10-14 business days',
    rating: 4.9,
    reviews: 203,
    inStock: true,
    popular: true
  },
  {
    id: '5',
    name: 'AI Chatbot Development',
    description: '24/7 customer support with intelligent AI chatbots. Natural language processing, multi-platform integration, and custom training for your specific business needs.',
    shortDescription: 'Intelligent AI chatbot for customer support',
    price: 25000,
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    images: [
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg'
    ],
    category: 'AI Services',
    features: ['Natural Language Processing', 'Multi-platform Integration', 'Custom Training', '24/7 Support', 'Analytics'],
    deliveryTime: '7-10 business days',
    rating: 4.8,
    reviews: 94,
    inStock: true,
    new: true
  },
  {
    id: '6',
    name: 'Workflow Automation',
    description: 'Streamline your business processes with AI-powered workflow automation. Process mapping, task automation, integration setup, and ongoing optimization.',
    shortDescription: 'AI-powered business process automation',
    price: 30000,
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    images: [
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg'
    ],
    category: 'AI Services',
    features: ['Process Mapping', 'Task Automation', 'Integration Setup', 'Monitoring', 'Optimization'],
    deliveryTime: '10-15 business days',
    rating: 4.9,
    reviews: 67,
    inStock: true
  },
  {
    id: '7',
    name: 'Social Media Management',
    description: 'Comprehensive social media management across all major platforms. Content creation, scheduling, community engagement, and performance analytics.',
    shortDescription: 'Full-service social media management',
    price: 18000,
    originalPrice: 22000,
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
    images: [
      'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg'
    ],
    category: 'Digital Marketing Services',
    features: ['Content Creation', 'Post Scheduling', 'Community Management', 'Performance Analytics', 'Monthly Reports'],
    deliveryTime: 'Ongoing monthly service',
    rating: 4.7,
    reviews: 112,
    inStock: true
  },
  {
    id: '8',
    name: 'SEO Optimization Package',
    description: 'Comprehensive SEO optimization to improve your website\'s visibility in search engines. Includes keyword research, on-page optimization, technical SEO, and monthly reporting.',
    shortDescription: 'Boost your search engine rankings',
    price: 22000,
    image: 'https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg',
    images: [
      'https://images.pexels.com/photos/270632/pexels-photo-270632.jpeg',
      'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg'
    ],
    category: 'Digital Marketing Services',
    features: ['Keyword Research', 'On-Page Optimization', 'Technical SEO', 'Link Building', 'Monthly Reporting'],
    deliveryTime: 'Initial setup: 7-10 days, then ongoing',
    rating: 4.8,
    reviews: 87,
    inStock: true
  }
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const categories = [
    'Digital Marketing Services',
    'AI Services',
    'Tools & Automation',
    'Training / Consultation'
  ];

  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => product.category === category);
  };

  const searchProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const value = {
    products,
    categories,
    getProductById,
    getProductsByCategory,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};