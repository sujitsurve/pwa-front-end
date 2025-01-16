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

    event.waitUntil(
        this.registration.showNotification(title, options)
    );
});
