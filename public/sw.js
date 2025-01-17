// Push Notification Event
self.addEventListener('push', (event) => {
    console.log("Push event received:", event);

    let payload = event.data ? event.data.json() : {};
    console.log("Notification Payload:", payload);

    const title = payload.title || "Default Title";
    const options = {
        body: payload.body || "Default Body",
        icon: payload.icon || '/logo192.png',
    };

    // Display notification
    event.waitUntil(
        self.registration.showNotification(title, options).catch((err) => {
            console.error("Notification failed to show:", err);
        })
    );
});

// Optional: Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
    event.notification.close();
    // Add any logic here to handle the notification click, like opening a URL
});
