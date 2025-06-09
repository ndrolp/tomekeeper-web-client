import { NOT_IMPLEMENTED_ERROR } from "@/common/types/errors";
import type { ExtrasCount, ExtrasDataSource } from "./ExtrasDatasource";

export class ExtrasInternalDataSource implements ExtrasDataSource {
  static async getCounts(): Promise<ExtrasCount> {
    throw NOT_IMPLEMENTED_ERROR;
  }
}
