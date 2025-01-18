import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Add this for custom styles

export default function Home() {
  const [message, setMessage] = useState('');
  const [notificationStatus, setNotificationStatus] = useState(null);

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
        setNotificationStatus('success');
      } else {
        setNotificationStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setNotificationStatus('error');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-light">
            <div className="card-body">
              {/* <h2 className="card-title text-center text-info mb-4">Push Notification Demo</h2> */}
              <p className="card-text text-center text-muted mb-4">
                Enter a message and send a push notification through this demo app.
              </p>

              <div className="mb-3">
                <label htmlFor="notificationMessage" className="form-label">
                  Notification Message
                </label>
                <input
                  type="text"
                  id="notificationMessage"
                  className="form-control"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="text-center">
                <button
                  className="btn btn-primary w-100"
                  onClick={sendPushNotification}
                  disabled={notificationStatus === 'loading'}
                >
                  {notificationStatus === 'loading' ? (
                    <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                  ) : (
                    'Send Notification'
                  )}
                </button>
              </div>

              {notificationStatus && (
                <div
                  className={`mt-3 text-center alert ${
                    notificationStatus === 'success' ? 'alert-success' : 'alert-danger'
                  }`}
                  role="alert"
                >
                  {notificationStatus === 'success'
                    ? 'Push Notification Sent Successfully!'
                    : 'Error sending Push Notification'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
