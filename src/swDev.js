export default function swDev() {
  const publicVapidKey = "BKrVB2IR7gv0uKiJTKRPWUiUvEqbyLEU34-WFXq5yxQ94bsxDhVomxJmO7t4nJ1aFyhfocK9mWNQRE9t_x27Zx8";

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
  }

  // Function to set up the service worker and push subscription
  async function setupPushNotifications() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered:", registration);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });
      console.log("Push Subscription:", subscription);

      // Send subscription to the server
      await fetch("https://pwa-demo-gku9.onrender.com/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });
      console.log("Push subscription sent to the server");
    } catch (error) {
      console.error("Error during push notification setup:", error);
    }
  }

  // Check permission status directly
  function checkPermission() {
    if (Notification.permission === "granted") {
      console.log("Notification permission already granted!");
      setupPushNotifications(); // Directly set up push notifications
    } else if (Notification.permission === "default") {
      // If permission not granted yet, show modal
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
              setupPushNotifications();
            } else {
              console.log("Notification permission denied!");
            }
          } catch (error) {
            console.error("Error during notification setup:", error);
          }
        });
      }
    } else {
      console.log("Notification permission denied!");
    }
  }

  // Show prompt to add to home screen for iOS users
  function showAddToHomeScreenPrompt() {
    const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone;

    if (isIos && !isInStandaloneMode) {
      const iosPrompt = document.getElementById("ios-prompt");
      if (iosPrompt) {
        iosPrompt.style.display = "block";

        // Add event listener to dismiss button
        const dismissIosPrompt = document.getElementById("dismiss-ios-prompt");
        if (dismissIosPrompt) {
          dismissIosPrompt.addEventListener("click", () => {
            iosPrompt.style.display = "none";
          });
        }
      }
    }
  }

  // Wait for user interaction on iOS or browsers where APIs need it
  document.addEventListener(
    "click",
    () => {
      if ("Notification" in window && "serviceWorker" in navigator) {
        checkPermission();
        showAddToHomeScreenPrompt();
      } else {
        console.log("Notifications or Service Workers are not supported in this browser.");
      }
    },
    { once: true } // Trigger only once after user interaction
  );
}
