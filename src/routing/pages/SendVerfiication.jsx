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
      setStatusMessage({ type: 'error', text: 'Ange en giltig e-postadress.' });
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
        setStatusMessage({ type: 'error', text: res.data.message || 'Misslyckades att skicka kod.' });
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Okänt fel vid utskick.';
      setStatusMessage({ type: 'error', text: `Fel: ${msg}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <h2 className="form-title">Skicka verifieringskod</h2>

        {statusMessage && (
          <p className={statusMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}>
            {statusMessage.text}
          </p>
        )}

        <form onSubmit={handleSend} className="login-portal-form" noValidate>
          <label className="form-label" htmlFor="email">
            E-postadress
          </label>
          <input
            className="form-input"
            id="email"
            name="email"
            type="email"
            placeholder="du@exempel.com"
            value={email}
            onChange={e => setEmail(e.target.value.trim())}
            required
          />

          <button className="btn-primary form-btn" type="submit" disabled={loading}>
            {loading ? 'Skickar…' : 'Skicka kod'}
          </button>
        </form>

        <p className="form-footer">
          Har du redan en kod?{' '}
          <button
            className="text-indigo-600 hover:underline"
            onClick={() => navigate('/verify-code', { state: { email } })}
          >
            Gå till verifikation
          </button>
        </p>
      </div>
    </div>
  );
}
