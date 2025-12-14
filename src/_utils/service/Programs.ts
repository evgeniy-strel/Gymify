import api from "../axios";

export interface IProgram {
  id: string;
  title: string;
  description: string;
  currentWeek: number;
  totalWeek: number;
  created_at: Date;
}

class ProgramsService {
  async getAll(): Promise<IProgram[]> {
    try {
      const response = await api.get("/programs");
      return response.data;
    } catch (error) {
      console.error("Error fetching programs:", error);
      return [];
    }
  }

  async getById(id: string): Promise<IProgram | null> {
    try {
      const response = await api.get(`/programs/${id}`);
      return response.data;
    } catch (error: any) {
      alert("Error loading program:\n" + error.message);
      return null;
    }
  }
}

export default new ProgramsService();
