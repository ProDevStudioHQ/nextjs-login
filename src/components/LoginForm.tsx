import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
  isLoading?: boolean;
  onSignupClick?: () => void;
  onForgotPasswordClick?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  onSignupClick,
  onForgotPasswordClick,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(email, password);
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

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
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
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-slate-900/80 group-hover:border-slate-600"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/0 to-yellow-600/0 group-focus-within:from-red-600/10 group-focus-within:to-yellow-600/10 pointer-events-none transition-all duration-300"></div>
        </div>
        {errors.email && (
          <p className="text-xs text-red-400">{errors.email}</p>
        )}
      </motion.div>

      {/* Password Field */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Lock className="w-4 h-4 text-yellow-500" />
          Password
        </label>
        <div className="relative group">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            placeholder="Enter your password"
            className="w-full px-4 py-3 pr-12 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-slate-900/80 group-hover:border-slate-600"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-yellow-500 transition-colors duration-200"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/0 to-yellow-600/0 group-focus-within:from-red-600/10 group-focus-within:to-yellow-600/10 pointer-events-none transition-all duration-300"></div>
        </div>
        {errors.password && (
          <p className="text-xs text-red-400">{errors.password}</p>
        )}
      </motion.div>

      {/* Remember Me & Forgot Password */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between text-sm"
      >
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border border-slate-600 bg-slate-900/50 cursor-pointer accent-yellow-500"
          />
          <span className="text-slate-400 group-hover:text-slate-300 transition-colors">
            Remember me
          </span>
        </label>
        <button
          type="button"
          onClick={onForgotPasswordClick}
          className="text-slate-400 hover:text-yellow-500 transition-colors duration-200"
        >
          Forgot password?
        </button>
      </motion.div>

      {/* Sign In Button */}
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
            {isLoading ? 'Signing in...' : 'Sign In'}
          </span>
        </motion.button>
      </motion.div>

      {/* Sign Up Link */}
      <motion.div variants={itemVariants} className="text-center">
        <p className="text-slate-400 text-sm">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onSignupClick}
            className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors duration-200"
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </motion.form>
  );
};
