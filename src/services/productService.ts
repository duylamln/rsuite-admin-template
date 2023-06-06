// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Parse from "parse/dist/parse.min.js";

import { PagedResult, Product } from "@/entities/Entity";
import { ParseCRUDService } from "./parseService";

export function createEmptyProduct() {
  return {} as Product;
}

function convertToProductEntity(customerObj: Parse.Object): Product {
  const { id } = customerObj;
  const name = customerObj.get("name");
  const description = customerObj.get("description");
  const category = customerObj.get("category");
  const price = customerObj.get("price");
  const rating = customerObj.get("rating");
  const stock = customerObj.get("stock");
  const thumbnail = customerObj.get("thumbnail");
  const images = customerObj.get("images");

  return {
    id,
    name,
    description,
    category,
    price,
    rating,
    stock,
    thumbnail,
    images,
  } as Product;
}

class ProductService extends ParseCRUDService<Product> {
  constructor() {
    super("Product", convertToProductEntity);
  }
  async getAll({
    page = 1,
    pageSize = 25,
    keyword = "",
  }: {
    page: number;
    pageSize: number;
    keyword: string;
  }): Promise<PagedResult<Product>> {
    try {
      const q = new Parse.Query(this.objectName);

      // filter
      if (keyword) {
        const qId = new Parse.Query(this.objectName).contains(
          "objectId",
          keyword,
        );

        q._orQuery([qId]);
      }

      //order
      q.descending("createdAt");
      //paging
      q.limit(pageSize);
      q.skip((page - 1) * pageSize);

      //execute
      const pProducts: Parse.Object[] = await q.find();
      const total = await q.count();

      //handle results
      const products = pProducts.map(this.convertToEntity);
      return new PagedResult<Product>(products, total, page, pageSize);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
const productService = new ProductService();
export default productService;
