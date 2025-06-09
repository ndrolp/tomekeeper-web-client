import { NOT_IMPLEMENTED_ERROR } from "@/common/types/errors";
import { ExtrasApiDataSource } from "./ExtrasApiDatasource";
import { ExtrasInternalDataSource } from "./ExtrasInternalDatasource";

export abstract class ExtrasDataSource {
  static async getCounts(): Promise<ExtrasCount> {
    throw NOT_IMPLEMENTED_ERROR;
  }
}

export interface ExtrasCount {
  books: number;
}

export function getExtrasDataSource(): typeof ExtrasDataSource {
  const DATASOURCE_TO_USE = "API";
  const dataSource: typeof ExtrasDataSource =
    DATASOURCE_TO_USE === "API"
      ? ExtrasApiDataSource
      : ExtrasInternalDataSource;

  return dataSource;
}
