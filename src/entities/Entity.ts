export interface Entity {
  id: string;
}

export class PagedResult<T> {
  constructor(
    items: T[],
    total: number,
    page: number,
    pageSize: number | null = 25,
  ) {
    this.items = items;
    this.total = total;
    this.page = page;
    this.pageSize = pageSize || 20;
    this.totalPage =
      Math.floor(this.total / this.pageSize) +
      (this.total % this.pageSize > 0 ? 1 : 0);
  }
  static empty<T>() {
    return new PagedResult<T>([], 0, 1, 20);
  }
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPage: number;
}

export interface Product extends Entity {
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
}

export interface Customer extends Entity {
  name: string;
  address: string;
  mobile: string;
  note: string;
  avatar: string;
  email: string;
}
