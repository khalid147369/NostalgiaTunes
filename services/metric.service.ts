import { Stats } from "@/types";
import { api } from "./api";

export const MetricService = {
  getAll(): Promise<Stats> {
    return api.get<Stats>("/counts/getAllCounts").then(response => response.data);
  }


};
