import { NOT_IMPLEMENTED_ERROR } from "@/common/types/errors";
import type { ISeries, SeriesDataSource } from "./SeriesDataSource";

export class SeriesInternalDataSource implements SeriesDataSource {
  static async getSeries(title?: string): Promise<ISeries[]> {
    void title;
    throw NOT_IMPLEMENTED_ERROR;
  }
}
