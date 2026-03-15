import { AxiosResponse } from "axios";
import api from "../axios";

const PUBLIC_VAPID_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

export interface ITimerData {
  active: boolean;
  started: string;
  end: string;
  secondsLeft: number;
  event: string;
}

export interface ICheckData {
  ok: boolean;
  status: ITimerData;
}

class TimersService {
  async start({
    seconds,
    event,
  }: {
    seconds: number;
    event: string;
  }): Promise<AxiosResponse<object> | undefined> {
    try {
      await this._requestPermissionToNotification();
      const subscription = await this._getSubscribeDataToPush();
      return api.post("/timers/start", { seconds, subscription, event });
    } catch (error: any) {
      console.error("Failed to start timer:", error);
    }
  }

  async reset(): Promise<AxiosResponse<object> | undefined> {
    try {
      return api.get("/timers/reset");
    } catch (error: any) {
      console.error("Failed to reset timer:", error);
    }
  }

  async check(): Promise<AxiosResponse<ICheckData> | undefined> {
    try {
      return api.get("/timers/check");
    } catch (error: any) {
      console.error("Failed to check timer:", error);
    }
  }

  private _urlBase64ToUint8Array(
    base64String: string,
  ): Uint8Array<ArrayBuffer> {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
  }

  private async _getSubscribeDataToPush(): Promise<PushSubscription> {
    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this._urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
    });

    return subscription;
  }

  private async _requestPermissionToNotification(): Promise<void> {
    if (!("serviceWorker" in navigator)) {
      alert("Service Worker не поддерживается");
      return;
    }

    if (Notification.permission === "granted") {
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Разрешение не дано");
      return;
    }
  }
}

export default new TimersService();
