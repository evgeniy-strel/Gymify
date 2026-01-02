import api from "./axios";

export async function duplicateCall(callback: Function, count: number) {
  for (var i = 1; i <= count; i++) {
    await callback(i);
  }
}

export async function requestNotifications() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
}

export async function notifyTimerFinished() {
  if (Notification.permission !== "granted") return;

  const registration = await navigator.serviceWorker.getRegistration();

  registration?.showNotification("⏱ Таймер окончен", {
    body: "Можно начинать следующий подход 💪",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
  });
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

const publicVapidKey =
  "BCBXbSeBwn9sHuc7LYdowGwMdrLvzlapzd9-cngRZ0cE7LpZoY1rwO4SNJzzsD7Sj3669JjsT8MaYgz_05Wqrcw";

export async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  await api.post("/subscribe", JSON.stringify(subscription));
}

export function startTimer() {
  api.post("/start-timer", { seconds: 75 });
}

export async function enablePush() {
  if (!("serviceWorker" in navigator)) {
    alert("Service Worker не поддерживается");
    return;
  }

  if (Notification.permission === "granted") {
    await subscribeToPush();
    alert("Уведомления включены ✅");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    alert("Разрешение не дано");
    return;
  }

  await subscribeToPush();
  alert("Уведомления включены ✅");
}
