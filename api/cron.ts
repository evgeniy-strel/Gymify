import { api } from "../src/utils";

export default async function handler(req: any, res: any) {
  try {
    await api.get("/check-timers");

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Cron error:", err);
    res.status(500).json({ ok: false });
  }
}
