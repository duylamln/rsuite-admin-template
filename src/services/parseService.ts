// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { PagedResult } from "@/entities/Entity";
import Parse from "parse/dist/parse.min.js";

export function setFields<T>(targetObj: Parse.Object, sourceObj: T) {
  let k: keyof T;
  for (k in sourceObj) {
    const v = sourceObj[k];
    targetObj.set(k == "id" ? "objectId" : k, v);
  }
  return targetObj;
}

export class ParseCRUDService<T> {
  objectName: string;
  convertToEntity: (obj: Parse.Object) => T;
  constructor(objectName: string, convertToEntity: (obj: Parse.Object) => T) {
    this.objectName = objectName;
    this.convertToEntity = convertToEntity;
  }
  async getById(id: string): Promise<T | null> {
    try {
      const q = new Parse.Query(this.objectName);
      const res = await q.get(id);
      if (!res) return null;
      return this.convertToEntity(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getAll({
    page = 1,
    pageSize = 25,
  }: {
    page: number;
    pageSize: number;
  }): Promise<PagedResult<T>> {
    try {
      const q = new Parse.Query(this.objectName);

      //order
      q.descending("createdAt");
      //paging
      q.limit(pageSize);
      q.skip((page - 1) * pageSize);
      const pCustomers: Parse.Object[] = await q.find();
      const total = await q.count();
      const customers = pCustomers.map(this.convertToEntity);
      return new PagedResult<T>(customers, total, page, pageSize);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createOrUpdate(customer: T): Promise<string> {
    const c = new Parse.Object(this.objectName);
    c.set(customer);

    try {
      const res: Parse.Object = await c.save();
      return res.id;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    const c = new Parse.Object(this.objectName);
    c.set("objectId", id);
    try {
      await c.destroy();
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const createParseCRUDService = <T>(
  objectName: string,
  convertToEntity: (obj: Parse.Object) => T,
) => new ParseCRUDService(objectName, convertToEntity);
export default createParseCRUDService;
