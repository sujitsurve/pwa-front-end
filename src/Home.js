import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Add this for custom styles

export default function Home() {
  const [message, setMessage] = useState('');

  const sendPushNotification = async () => {
    if (!message) {
      alert('Please enter a message!');
      return;
    }

    try {
      const response = await fetch('https://pwa-demo-gku9.onrender.com/send-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          icon: "/qualys.png"
        }),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        alert('Failed to send push notification');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the push notification');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Home Component</h1>

      <div className="mb-3">
        <label htmlFor="notificationMessage" className="form-label">
          Enter Notification Message
        </label>
        <input
          type="text"
          id="notificationMessage"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={sendPushNotification}>
        Send Push Notification
      </button>
    </div>
  );
}


// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'; // Add this for custom styles

// export default function Home() {
//   const [message, setMessage] = useState('');
//   const [intervalId, setIntervalId] = useState(null);
//   const [isSending, setIsSending] = useState(false); // To toggle the interval

//   const sendPushNotification = async () => {
//     if (!message) {
//       alert('Please enter a message!');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/send-push', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message: message,
//           icon: "/qualys.png",
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Push notification sent successfully:', data);
//       } else {
//         console.error('Failed to send push notification');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const startSendingNotifications = () => {
//     if (!message) {
//       alert('Please enter a message before starting!');
//       return;
//     }

//     if (isSending) {
//       alert('Notifications are already being sent!');
//       return;
//     }

//     setIsSending(true);

//     // Start the interval
//     const id = setInterval(() => {
//       sendPushNotification();
//     }, 5000); // Send notification every 5 seconds
//     setIntervalId(id);
//   };

//   const stopSendingNotifications = () => {
//     if (intervalId) {
//       clearInterval(intervalId);
//       setIntervalId(null);
//       setIsSending(false);
//       alert('Stopped sending notifications!');
//     }
//   };

//   // Cleanup the interval on component unmount
//   useEffect(() => {
//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [intervalId]);

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Home Component</h1>

//       <div className="mb-3">
//         <label htmlFor="notificationMessage" className="form-label">
//           Enter Notification Message
//         </label>
//         <input
//           type="text"
//           id="notificationMessage"
//           className="form-control"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//       </div>

//       <div className="d-flex gap-3">
//         <button className="btn btn-success" onClick={startSendingNotifications}>
//           Start Sending Notifications
//         </button>
//         <button className="btn btn-danger" onClick={stopSendingNotifications}>
//           Stop Sending Notifications
//         </button>
//       </div>
//     </div>
//   );
// }
