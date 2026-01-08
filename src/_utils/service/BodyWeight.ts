import api from "../axios";

export interface IBodyWeight {
  id: string;
  value_kg: number;
  measured_at: string;
  created_at: string;
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

  async getAll(): Promise<IBodyWeight[]> {
    try {
      const res = await api.get("/bodyWeight");
      return res.data;
    } catch (error: any) {
      console.error("Failed to fetch bodyWeight:", error);
      return [];
    }
  }
}

export default new BodyWeightService();
