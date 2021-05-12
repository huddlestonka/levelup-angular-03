export interface BaseEntity {
  id: string | null;
  title?: string | null;
}

export interface Customer extends BaseEntity {
  title: string;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  orders?: Order[];
}

export interface Order extends BaseEntity {
  title: string;
  description: string;
  customerId: any;
}
