import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function AccountPopup({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="absolute top-full right-0 mt-2 w-[340px] bg-white rounded-lg shadow-2xl border border-gray-100 z-50 overflow-hidden">
        <div className="p-5">
          <h3 className="text-base font-semibold text-dark text-center mb-4">
            Sign in to your account
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs text-dark-300 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-dark-300">Password</label>
                <Link to="/forgot-password" onClick={onClose} className="text-xs text-info hover:underline">Forget Password</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 px-3 pr-10 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-300 hover:text-dark"
                  aria-label="Toggle password"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-600 text-white text-xs font-bold py-2.5 rounded transition-colors flex items-center justify-center gap-2"
            >
              LOGIN →
            </button>
          </form>

          {/* Create account */}
          <div className="text-center mt-4">
            <p className="text-xs text-dark-300 mb-2">Don't have account</p>
            <Link
              to="/signup"
              onClick={onClose}
              className="block w-full border border-gray-200 text-primary hover:bg-gray-50 text-xs font-bold py-2.5 rounded transition-colors"
            >
              CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
