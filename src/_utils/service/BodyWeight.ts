import api from "../axios";

export interface IBodyWeight {
  id: string;
  value_kg: number;
  measured_at: string;
  created_at: string;
  dynamics: number;
  is_year?: boolean;
}

class BodyWeightService {
  async create(item: Partial<IBodyWeight>): Promise<IBodyWeight | null> {
    try {
      const res = await api.post("/bodyWeight", item);
      return res.data;
    } catch (error: any) {
      console.error("Error creating bodyWeight:", error);
      return null;
    }
  }

  async getAll({ grouped }: { grouped?: boolean } = {}): Promise<
    IBodyWeight[]
  > {
    try {
      const res = await api.get("/bodyWeight", {
        params: {
          grouped,
        },
      });
      return res.data;
    } catch (error: any) {
      console.error("Failed to fetch bodyWeight:", error);
      return [];
    }
  }

  async getCurrent(): Promise<IBodyWeight | null> {
    try {
      const res = await api.get("/bodyWeight/current");
      return res.data;
    } catch (error) {
      console.error("Failed to fetch current bodyWeight:", error);
      return null;
    }
  }
}

export default new BodyWeightService();
