export default function swDev() {
  const publicVapidKey = "BKrVB2IR7gv0uKiJTKRPWUiUvEqbyLEU34-WFXq5yxQ94bsxDhVomxJmO7t4nJ1aFyhfocK9mWNQRE9t_x27Zx8"; 

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  }

  // Request Notification Permission
  const notificationModal = document.getElementById("notification-modal");
  const allowNotificationsButton = document.getElementById("allow-notifications");

  if (notificationModal && allowNotificationsButton) {
    notificationModal.style.display = "block";

    allowNotificationsButton.addEventListener("click", async () => {
      notificationModal.style.display = "none";

      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted!");
          // Register service worker
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log("Service Worker registered:", registration);


          // Subscribe to push notifications
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
          });
          console.log("Push Subscription:", subscription);

          // Send subscription to the server
          return fetch("https://pwa-demo-gku9.onrender.com/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(subscription),
          });
        } else {
          console.log("Notification permission denied!");
          alert("Notification permission denied!");
        }
      } catch (error) {
        console.error("Error during notification setup:", error);
        alert("Error during notification setup:", error);
      }
    });
  }
}
