type Slug = {
  current: string;
  _type: "slug";
};

type Category = {
  _id: string;
  name: string;
  slug: Slug;
};

type CategoryList = Category[];

type Slug = {
  current: string;
  _type: "slug";
};

type ImageAsset = {
  _ref: string;
  _type: "reference";
};

type Image = {
  _type: "image";
  asset: ImageAsset;
};

type CategoryReference = {
  _ref: string;
  _type: "reference";
  name: string;
};

type Product = {
  _id: string;
  _type: "product";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name: string;
  description: string;
  slug: Slug;
  image: Image;
  price: number;
  dimensions: {
    depth: string;
    width: string;
    height: string;
  };
  features: string[];
  category: CategoryReference;
  quantity: number;
  tags: string[];
};

type ProductList = Product[];
export interface Order {
  _id: string;
  _type: "order";
  totalAmount: number;
  returnTo: Address;
  shippingAddress: Address;
  orderDate: string;
  orderStatus: string;
  insuranceProvider: string;
  customerId: string;
  totalWeight: number;
  _originalId: string;
  trackingId: string;
  _rev: string;
  orderItems: OrderItem[];
  _createdAt: string;
  trackingStatus: string;
  paymentStatus: string;
  shipFrom: Address;
  labelMessages: LabelMessages;
  shipDate: string;
  paymentMethod: string;
  _updatedAt: string;
}

interface Address {
  city: string;
  countryCode?: string;
  postalCode: string;
  name?: string;
  state: string;
  address?: string;
  street?: string;
}

interface OrderItem {
  subtotal: number;
  productName: string;
  quantity: number;
  productId: object;
  price: number;
}

interface LabelMessages {
  reference3: string | null;
  reference1: string | null;
  reference2: string | null;
}
