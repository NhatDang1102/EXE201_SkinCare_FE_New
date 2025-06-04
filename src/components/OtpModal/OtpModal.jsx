import { useState } from 'react';
import './OtpModal.css';

export default function OtpModal({ email, onClose, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    try {
      const response = await fetch("https://skincareapp.somee.com/SkinCare/Auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP");
      }

      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to verify OTP.");
    }
  };

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <h3>Verify OTP</h3>
        <p>We’ve sent a code to: <b>{email}</b></p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <div className="otp-actions">
          <button onClick={handleVerify}>Verify</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
