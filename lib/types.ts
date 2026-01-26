// lib/types.ts (Adding Signup specific types)

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "CUSTOMER" | "ADMIN"; // Ensure role is typed
  isVerified: boolean;
}

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

// 1. Type for the data sent in the request body
export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

// 2. Type for the successful server response structure
export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    newUser: User; // Use the User type defined above
  };
  statusCode: number;
}

export interface LoginResponse {
  success: true;
  message: "Login successful"; // You can use a literal type for precision
  data: {
    accessToken: string; // The crucial JWT returned upon successful login
  };
  statusCode: 201; // Or whatever status code your server returns (e.g., 200)
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyEmailResponseByCode {
  success: true;
  message: string;
  data: {
    accessToken: string;
  };
  statusCode: 201;
}

export interface VerifyEmailRequestByCode {
  userId: string;
  code: string;
}

export interface ResendVerificationCodeResponse {
  success: true;
  message: string;
  data: {
    message: string;
  };
  statusCode: 201;
}

export interface ResendVerificationCodeRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: true;
  message: "Password reset code has been sent to your email. Please check your inbox."; // You can use a literal type for precision
  data: {
    message: "Password reset code has been sent to your email. Please check your inbox.";
  };
  statusCode: 201; // Or whatever status code your server returns (e.g., 200)
}

// Profile & Account Types

export interface GetProfileResponse {
  success: true;
  message: string;
  data: User;
  statusCode: 200;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  // Add other updatable fields as necessary
}

export interface UpdateProfileResponse {
  success: true;
  message: string;
  data: {
    user: User;
  };
  statusCode: 200;
}

export interface ChangePasswordRequest {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ChangePasswordResponse {
  success: true;
  message: string;
  data: null | {};
  statusCode: 200;
}

export interface DeleteAccountRequest {
  reason: string;
  password: string;
}

export interface DeleteAccountResponse {
  success: true;
  message: string;
  data: null | {};
  statusCode: 200;
}

// Order Types

export interface OrderItem {
  id: string;
  cartId: string;
  product: {
    id: string;
    name: string;
    images: string[];
    status: string;
    weight: number;
    baseCost: number;
    quantity: number;
    vendorId: string;
    createdAt: string;
    updatedAt: string;
    categoryId: string;
    description: string;
    storageInstructions: string;
  };
  quantity: number;
  createdAt: string;
  productId: string;
  updatedAt: string;
  priceAtTime: number;
  weightAtTime: number;
}

export interface Order {
  id: string;
  userId: string;
  type: string;
  items: OrderItem[];
  deliveryAddressId: string;
  currencyId: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRateAtTime: number;
  subtotal: number;
  totalWeight: number;
  deliveryFee: number;
  totalAmountPaid: number;
  trackingNumber: string | null;
  shippingCarrier: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;
  paymentStatus: string;
  deliveryAddress: {
    id: string;
    userId: string;
    label: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface GetOrdersResponse {
  success: true;
  message: string;
  data: {
    data: Order[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  statusCode: 200;
}

export interface GetOrderByIdResponse {
  success: true;
  message: string;
  data: Order;
  statusCode: 200;
}
export interface Address {
  id: string;
  userId: string;
  firstname: string;
  lastname: string;
  phone: string;
  label: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetAddressesResponse {
  success: true;
  message: string;
  data: Address[];
  statusCode: 200;
}

export interface AddAddressRequest {
  firstname: string;
  lastname: string;
  phone: string;
  label?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface AddAddressResponse {
  success: true;
  message: string;
  data: Address;
  statusCode: 201;
}

export interface UpdateAddressRequest {
  firstname?: string;
  lastname?: string;
  phone?: string;
  label?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  isDefault?: boolean;
}

export interface UpdateAddressResponse {
  success: true;
  message: string;
  data: Address;
  statusCode: 200;
}

export interface DeleteAddressResponse {
  success: true;
  message: string;
  data: null | {};
  statusCode: 200;
}

export interface SetDefaultAddressResponse {
  success: true;
  message: string;
  data: Address;
  statusCode: 200;
}
