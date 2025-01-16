// swDev.js
export default function swDev() {
  const publicVapidKey = "BKrVB2IR7gv0uKiJTKRPWUiUvEqbyLEU34-WFXq5yxQ94bsxDhVomxJmO7t4nJ1aFyhfocK9mWNQRE9t_x27Zx8"; 

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  }

  // Check for Service Worker and Push API support
  if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker.register("/sw.js", { scope: '/' })  // Ensure the correct scope
      .then((registration) => {
        console.log("Service Worker registered:", registration);

        // Subscribe to push notifications
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });
      })
      .then((subscription) => {
        console.log("Push subscription:", subscription);

        // Send subscription to the server (store it for sending notifications)
        return fetch("https://pwa-demo-gku9.onrender.com/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
      .catch((error) => {
        console.error("Service Worker registration or Push subscription failed:", error);
      });
  } else {
    console.log("Push messaging is not supported in this browser.");
  }
}
