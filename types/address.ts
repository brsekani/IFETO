export interface Address {
  id: string;
  label: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  isDefault: boolean;
}
