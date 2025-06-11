import { NOT_IMPLEMENTED_ERROR } from "@/common/types/errors";
import { SeriesApiDataSource } from "./SeriesApiDataSource";
import { SeriesInternalDataSource } from "./SeriesInternalDatasource";

export interface ISeries {
  id?: number;
  name?: string;
  description?: string;
}

export abstract class SeriesDataSource {
  static async getSeries(title: string = ""): Promise<ISeries[]> {
    void title;
    throw NOT_IMPLEMENTED_ERROR;
  }
}

export function getSeriesDataSource(): typeof SeriesDataSource {
  const DATASOURCE_TO_USE = "API";
  const dataSource: typeof SeriesDataSource =
    DATASOURCE_TO_USE === "API"
      ? SeriesApiDataSource
      : SeriesInternalDataSource;
  return dataSource;
}
