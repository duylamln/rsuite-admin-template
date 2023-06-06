import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import productService from "../services/productService";
import { appSettings } from "@/config";
import { PagedResult, Product } from "@/entities/Entity";

interface ProductQuery {
  page: number;
  pageSize: number;
  keyword: string;
}

export interface ProductStateModel {
  query: ProductQuery;
  pagedProducts: PagedResult<Product>;
  isLoading: boolean;
  isLoaded: boolean;
  selectedProduct: Product | null;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setKeyword: (keyword: string) => void;
  setSelectedProduct: (p: Product | null) => void;
  fetchProducts: () => Promise<null | undefined>;
  createOrUpdateProduct: (p: Product) => Promise<Product>;
  deleteProduct: (id: string) => Promise<boolean>;
}

const storeDefinition: StateCreator<ProductStateModel> = (set, get) => ({
  query: { page: 1, pageSize: appSettings.defaultPageSize, keyword: "" },
  pagedProducts: PagedResult.empty<Product>(),
  isLoading: false,
  isLoaded: false,
  selectedProduct: null,
  nextPage: () => {
    const query = get().query;
    set(() => ({ query: { ...query, page: query.page + 1 } }));
    get().fetchProducts();
  },
  prevPage: () => {
    const query = get().query;
    set(() => ({ query: { ...query, page: query.page - 1 } }));
    get().fetchProducts();
  },
  goToPage: page => {
    const query = get().query;
    set(() => ({ query: { ...query, page: page } }));
    get().fetchProducts();
  },
  setKeyword: (keyword: string) => {
    const query = get().query;
    set(() => ({ query: { ...query, keyword: keyword } }));
    get().fetchProducts();
  },
  setSelectedProduct: c => {
    set(() => ({
      selectedProduct: c != null ? { ...c } : null,
    }));
  },
  fetchProducts: async () => {
    try {
      set(() => ({ isLoading: true }));
      const pagedProducts = await productService.getAll(get().query);
      set(() => ({
        pagedProducts: pagedProducts as PagedResult<Product>,
        isLoading: false,
        isLoaded: true,
      }));
    } catch (error) {
      set(() => ({
        isLoading: false,
        isLoaded: false,
      }));
      return Promise.reject(error);
    }
  },
  createOrUpdateProduct: async (p: Product) => {
    try {
      const id = await productService.createOrUpdate(p);
      p.id = id;
      const pagedProducts = get().pagedProducts;
      const updated = !pagedProducts.items.some(x => x.id == p.id)
        ? {
            ...pagedProducts,
            items: [p, ...pagedProducts.items],
          }
        : {
            ...pagedProducts,
            items: pagedProducts.items.map(x => {
              if (x.id == p.id) return { ...p };
              return x;
            }),
          };
      set(() => ({ pagedProducts: updated }));
      return p;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteProduct: async (id: string) => {
    try {
      await productService.delete(id);
      const pagedProducts = get().pagedProducts;
      const updated = {
        ...pagedProducts,
        items: pagedProducts.items.filter(x => x.id != id),
      };
      set(() => ({ pagedProducts: updated }));
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  },
});
const useProductStore = create<ProductStateModel>()(
  devtools(storeDefinition, { name: "ProductStore" }),
);

export default useProductStore;
