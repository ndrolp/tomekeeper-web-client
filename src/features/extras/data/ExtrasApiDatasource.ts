import { api } from "@/common/libs/api";
import type { ExtrasCount, ExtrasDataSource } from "./ExtrasDatasource";

export class ExtrasApiDataSource implements ExtrasDataSource {
  static async getCounts(): Promise<ExtrasCount> {
    const data = await api.get<ExtrasCount>("/extras/counts");
    return data.data;
  }
}
