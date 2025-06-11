import { api } from "@/common/libs/api";
import type { ISeries, SeriesDataSource } from "./SeriesDataSource";

export class SeriesApiDataSource implements SeriesDataSource {
  static async getSeries(title?: string): Promise<ISeries[]> {
    const data = await api.get(`/books/?title=${title ?? ""}`);
    return data.data;
  }
}
