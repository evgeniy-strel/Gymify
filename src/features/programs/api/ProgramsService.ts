import { api } from "../../../utils";

export interface IProgram {
  id: string;
  title: string;
  description: string;
  currentWeek: number;
  totalWeek: number;
  created_at: Date;
}

class ProgramsService {
  async create(
    item: Pick<IProgram, "id" | "title" | "description">,
  ): Promise<IProgram | null> {
    try {
      const res = await api.post("/programs", item);
      return res.data;
    } catch (error: any) {
      console.error("Error creating program:", error);
      return null;
    }
  }

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

  async delete(programId: IProgram["id"]): Promise<IProgram> {
    try {
      const res = await api.delete(`/programs/${programId}`);
      return res.data;
    } catch (error) {
      console.error("Failed to delete program", error);
      throw error;
    }
  }
}

export default new ProgramsService();
