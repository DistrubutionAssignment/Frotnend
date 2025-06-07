import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import verificationApi from '../../api/verificationApi';

export default function SendVerification() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async e => {
    e.preventDefault();
    setStatusMessage(null);

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setStatusMessage({ type: 'error', text: 'Enter a Valid Email' });
      return;
    }

    setLoading(true);
    try {

      const res = await verificationApi.post('/send', { email });
      if (res.data.succeeded) {
        setStatusMessage({ type: 'success', text: 'Kod skickad! Kolla din inkorg.' });
        setTimeout(() => {
          navigate('/verify-code', { state: { email } });
        }, 1500);
      } else {
        setStatusMessage({ type: 'error', text: res.data.message || 'An error occured when sending code.' });
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Unknown error';
      setStatusMessage({ type: 'error', text: `Error: ${msg}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <h2 className="form-title">Sending Verification</h2>

        {statusMessage && (
          <p className={statusMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}>
            {statusMessage.text}
          </p>
        )}

        <form onSubmit={handleSend} className="login-portal-form" noValidate>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-input"
            id="email"
            name="email"
            type="email"
            placeholder="Example@exempel.com"
            value={email}
            onChange={e => setEmail(e.target.value.trim())}
            required
          />

          <button className="btn-primary form-btn" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Code'}
          </button>
        </form>

        <p className="form-footer">
          Already have a code?{' '}
          <button
            className="btn-primary form-btn"
            onClick={() => navigate('/verify-code', { state: { email } })}
          >
            Go to verification!
          </button>
        </p>
      </div>
    </div>
  );
}
