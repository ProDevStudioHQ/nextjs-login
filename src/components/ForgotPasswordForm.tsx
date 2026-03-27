import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => void;
  isLoading?: boolean;
  onBackClick?: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  isLoading = false,
  onBackClick,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setError('');
      onSubmit?.(email);
      setSubmitted(true);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (submitted) {
    return (
      <motion.div
        className="space-y-4"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex justify-center"
          >
            <CheckCircle className="w-16 h-16 text-green-400" />
          </motion.div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Check Your Email</h3>
            <p className="text-slate-400 text-sm">
              We&apos;ve sent a password reset link to{' '}
              <span className="font-medium text-yellow-500">{email}</span>
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 space-y-2 text-left">
            <p className="text-sm text-slate-400">
              <span className="font-medium text-slate-300">Didn&apos;t receive the email?</span>
            </p>
            <ul className="text-xs text-slate-400 space-y-1 ml-4 list-disc">
              <li>Check your spam folder</li>
              <li>Verify the email address is correct</li>
              <li>Your email may take a few minutes to arrive</li>
            </ul>
          </div>

          <div className="space-y-2 pt-4">
            <motion.button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setEmail('');
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-slate-900 border border-slate-700 hover:border-yellow-500/50 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Try Another Email
            </motion.button>

            <motion.button
              type="button"
              onClick={onBackClick}
              className="w-full py-3 px-4 text-slate-400 hover:text-yellow-500 font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Reset Your Password</h3>
        <p className="text-sm text-slate-400">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </motion.div>

      {/* Email Field */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Mail className="w-4 h-4 text-yellow-500" />
          Email
        </label>
        <div className="relative group">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-slate-900/80 group-hover:border-slate-600"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/0 to-yellow-600/0 group-focus-within:from-red-600/10 group-focus-within:to-yellow-600/10 pointer-events-none transition-all duration-300"></div>
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </motion.div>

      {/* Send Reset Link Button */}
      <motion.div variants={itemVariants}>
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-700 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-red-500/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
          <span className="relative">
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </span>
        </motion.button>
      </motion.div>

      {/* Back to Login Link */}
      <motion.div variants={itemVariants} className="text-center">
        <button
          type="button"
          onClick={onBackClick}
          className="text-slate-400 hover:text-yellow-500 font-medium transition-colors duration-200 text-sm flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>
      </motion.div>
    </motion.form>
  );
};
