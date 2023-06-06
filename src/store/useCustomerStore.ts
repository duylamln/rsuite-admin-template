import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import customerService from "../services/customerService";
import { appSettings } from "@/config";
import { Customer, PagedResult } from "@/entities/Entity";

interface CustomerQuery {
  page: number;
  pageSize: number;
  keyword: string;
}

export interface CustomerStateModel {
  query: CustomerQuery;
  pagedCustomers: PagedResult<Customer>;
  isLoading: boolean;
  isLoaded: boolean;
  selectedCustomer: Customer | null;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setKeyword: (keyword: string) => void;
  setSelectedCustomer: (customer: Customer | null) => void;
  fetchCustomers: () => Promise<null | undefined>;
  createOrUpdateCustomer: (customer: Customer) => Promise<Customer>;
  deleteCustomer: (id: string) => Promise<boolean>;
}

const storeDefinition: StateCreator<CustomerStateModel> = (set, get) => ({
  query: { page: 1, pageSize: appSettings.defaultPageSize, keyword: "" },
  pagedCustomers: PagedResult.empty<Customer>(),
  isLoading: false,
  isLoaded: false,
  selectedCustomer: null,
  nextPage: () => {
    const query = get().query;
    set(() => ({ query: { ...query, page: query.page + 1 } }));
    get().fetchCustomers();
  },
  prevPage: () => {
    const query = get().query;
    set(() => ({ query: { ...query, page: query.page - 1 } }));
    get().fetchCustomers();
  },
  goToPage: page => {
    const query = get().query;
    set(() => ({ query: { ...query, page: page } }));
    get().fetchCustomers();
  },
  setKeyword: (keyword: string) => {
    const query = get().query;
    set(() => ({ query: { ...query, keyword: keyword } }));
    get().fetchCustomers();
  },
  setSelectedCustomer: customer => {
    set(() => ({
      selectedCustomer: customer != null ? { ...customer } : null,
    }));
  },
  fetchCustomers: async () => {
    try {
      set(() => ({ isLoading: true }));
      const pagedCustomers = await customerService.getAll(get().query);
      set(() => ({
        pagedCustomers: pagedCustomers as PagedResult<Customer>,
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
  createOrUpdateCustomer: async (customer: Customer) => {
    try {
      const id = await customerService.createOrUpdate(customer);
      customer.id = id;
      const pagedCustomers = get().pagedCustomers;
      const updated = !pagedCustomers.items.some(x => x.id == customer.id)
        ? {
            ...pagedCustomers,
            items: [customer, ...pagedCustomers.items],
          }
        : {
            ...pagedCustomers,
            items: pagedCustomers.items.map(x => {
              if (x.id == customer.id) return { ...customer };
              return x;
            }),
          };
      set(() => ({ pagedCustomers: updated }));
      return customer;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteCustomer: async (id: string) => {
    try {
      await customerService.delete(id);
      const pagedCustomers = get().pagedCustomers;
      const updated = {
        ...pagedCustomers,
        items: pagedCustomers.items.filter(x => x.id != id),
      };
      set(() => ({ pagedCustomers: updated }));
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  },
});
const useCustomerStore = create<CustomerStateModel>()(
  devtools(storeDefinition, { name: "CustomerStore" }),
);

export default useCustomerStore;
