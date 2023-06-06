// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Parse from "parse/dist/parse.min.js";

import { ParseCRUDService } from "./parseService";
import { Customer, PagedResult } from "@/entities/Entity";

export function createEmptyCustomer() {
  return {} as Customer;
}

function convertToCustomerEntity(customerObj: Parse.Object): Customer {
  const { id } = customerObj;
  const name = customerObj.get("name");
  const address = customerObj.get("address");
  const mobile = customerObj.get("mobile");
  const note = customerObj.get("note");
  const email = customerObj.get("email");

  return { name, address, mobile, note, id, email } as Customer;
}

class CustomerService extends ParseCRUDService<Customer> {
  constructor() {
    super("Customer", convertToCustomerEntity);
  }
  async getAll({
    page = 1,
    pageSize = 25,
    keyword = "",
  }: {
    page: number;
    pageSize: number;
    keyword: string;
  }): Promise<PagedResult<Customer>> {
    try {
      const q = new Parse.Query(this.objectName);

      // filter
      if (keyword) {
        const qId = new Parse.Query(this.objectName).contains(
          "objectId",
          keyword,
        );
        const qName = new Parse.Query(this.objectName).contains(
          "name",
          keyword,
        );
        const qAddress = new Parse.Query(this.objectName).contains(
          "address",
          keyword,
        );
        const qMobile = new Parse.Query(this.objectName).contains(
          "mobile",
          keyword,
        );

        const qNote = new Parse.Query(this.objectName).contains(
          "note",
          keyword,
        );
        q._orQuery([qId, qName, qAddress, qMobile, qNote]);
      }

      //order
      q.descending("createdAt");
      //paging
      q.limit(pageSize);
      q.skip((page - 1) * pageSize);

      //execute
      const pCustomers: Parse.Object[] = await q.find();
      const total = await q.count();

      //handle results
      const customers = pCustomers.map(this.convertToEntity);
      return new PagedResult<Customer>(customers, total, page, pageSize);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
const customerService = new CustomerService();
export default customerService;
