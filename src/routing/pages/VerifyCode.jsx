import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import verificationApi from '../../api/verificationApi';
import authApi from '../../api/authApi';

export default function VerifyCode() {
  const location = useLocation();
  const navigate = useNavigate();
  const prefilledEmail = location.state?.email || '';

  const [email, setEmail] = useState(prefilledEmail);
  const [code, setCode] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(prefilledEmail);
  }, [prefilledEmail]);

  const handleVerify = async e => {
    e.preventDefault();
    setStatusMessage(null);

    if (!email.trim() || !code.trim()) {
      setStatusMessage({ type: 'error', text: 'email and code is required' });
      return;
    }

    setLoading(true);
    try {

      const res = await verificationApi.post('/verify', { email, code }); //verifyes from the verificationapi
      if (res.data.succeeded) {

        await authApi.post('/api/auth/verify-email', { email }); //after successfull validation, sends the email back to authService to flag the user with Email verifyed = True
        setStatusMessage({
          type: 'success',
          text: 'Email validated! Redirecting...'
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setStatusMessage({
          type: 'error',
          text: res.data.message || 'Invalid or expired code.'
        });
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Error, Try again.';
      setStatusMessage({ type: 'error', text: `Fel: ${msg}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <h2 className="form-title">Verify Account</h2>

        {statusMessage && (
          <p className={statusMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}>
            {statusMessage.text}
          </p>
        )}

        <form onSubmit={handleVerify} className="login-portal-form" noValidate>
          <label className="form-label" htmlFor="email">
            E-postadress
          </label>
          <input
            className="form-input"
            id="email"
            name="email"
            type="email"
            placeholder="example@exempel.com"
            value={email}
            onChange={e => setEmail(e.target.value.trim())}
            required
          />

          <label className="form-label" htmlFor="code">
            Verifcation Code
          </label>
          <input
            className="form-input"
            id="code"
            name="code"
            type="text"
            placeholder="123456"
            maxLength={6}
            value={code}
            onChange={e => setCode(e.target.value.trim())}
            required
          />

          <button className="btn-primary form-btn" type="submit" disabled={loading}>
            {loading ? 'Verifying' : 'Verifying'}
          </button>
        </form>

        <p className="form-footer">
          Havent recived a code?{' '}
          <Link to="/send-verification" state={{ email }}>
            Send again!
          </Link>
        </p>
      </div>
    </div>
  );
}
