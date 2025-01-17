// swDev.js

export default function swDev() {
  const publicVapidKey = "BKrVB2IR7gv0uKiJTKRPWUiUvEqbyLEU34-WFXq5yxQ94bsxDhVomxJmO7t4nJ1aFyhfocK9mWNQRE9t_x27Zx8"; 

  // Helper function to convert the VAPID key to the correct format
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  }

  // Check if Notification API is supported
  if ("Notification" in window) {
    // Request permission to show notifications
    requestNotificationPermission().then(() => {
      // Check if Service Worker and PushManager are supported
      if ("serviceWorker" in navigator && "PushManager" in window) {
        // Register the service worker
        navigator.serviceWorker.register("/sw.js", { scope: '/' })
          .then((registration) => {
            console.log("Service Worker registered:", registration);

            // Subscribe to push notifications if permission is granted
            return registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
            });
          })
          .then((subscription) => {
            console.log("Push subscription:", subscription);

            // Send subscription to the server
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
        console.log("PushManager is not supported in this browser.");
        alert("Push notifications are not supported in this browser.");
      }
    }).catch((error) => {
      console.error("Error requesting notification permission:", error);
    });
  } else {
    console.log("Notification API is not supported in this browser.");
    alert("Notifications are not supported in this browser.");
  }
}

// Function to request notification permission
function requestNotificationPermission() {
  return new Promise((resolve, reject) => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        console.log("Notification permission already granted");
        resolve(); // Permission is already granted, no need to ask
      } else if (Notification.permission === "denied") {
        console.log("Notification permission denied");
        reject("Permission denied by user");
      } else {
        // Ask the user for permission
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            console.log("Notification permission granted");
            resolve();
          } else {
            console.log("Notification permission denied");
            reject("Permission denied by user");
          }
        }).catch((err) => {
          console.error("Error requesting notification permission:", err);
          reject(err);
        });
      }
    } else {
      console.log("Notifications are not supported by this browser.");
      reject("Notifications not supported");
    }
  });
}
