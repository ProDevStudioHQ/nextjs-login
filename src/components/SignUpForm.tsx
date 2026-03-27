import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface SignUpFormProps {
  onSubmit?: (user: { name: string; email: string; password: string; confirmPassword: string }) => void;
  isLoading?: boolean;
  onLoginClick?: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  isLoading = false,
  onLoginClick,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
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
      {/* Name Field */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <User className="w-4 h-4 text-yellow-500" />
          Full Name
        </label>
        <div className="relative group">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-slate-900/80 group-hover:border-slate-600"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/0 to-yellow-600/0 group-focus-within:from-red-600/10 group-focus-within:to-yellow-600/10 pointer-events-none transition-all duration-300"></div>
        </div>
        {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
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
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-slate-900/80 group-hover:border-slate-600"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/0 to-yellow-600/0 group-focus-within:from-red-600/10 group-focus-within:to-yellow-600/10 pointer-events-none transition-all duration-300"></div>
        </div>
        {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
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
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Create a strong password"
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
        {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
      </motion.div>

      {/* Confirm Password Field */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <Lock className="w-4 h-4 text-yellow-500" />
          Confirm Password
        </label>
        <div className="relative group">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="Confirm your password"
            className="w-full px-4 py-3 pr-12 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 transition-all duration-300 focus:outline-none focus:border-yellow-500/50 focus:bg-slate-900/80 group-hover:border-slate-600"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-yellow-500 transition-colors duration-200"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/0 to-yellow-600/0 group-focus-within:from-red-600/10 group-focus-within:to-yellow-600/10 pointer-events-none transition-all duration-300"></div>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-400">{errors.confirmPassword}</p>
        )}
      </motion.div>

      {/* Terms Checkbox */}
      <motion.div variants={itemVariants}>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => {
              setAgreedToTerms(e.target.checked);
              if (errors.terms) {
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  delete newErrors.terms;
                  return newErrors;
                });
              }
            }}
            className="w-4 h-4 rounded border border-slate-600 bg-slate-900/50 cursor-pointer accent-yellow-500 mt-1"
          />
          <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
            I agree to the{' '}
            <button type="button" className="text-yellow-500 hover:text-yellow-400">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-yellow-500 hover:text-yellow-400">
              Privacy Policy
            </button>
          </span>
        </label>
        {errors.terms && <p className="text-xs text-red-400 mt-1">{errors.terms}</p>}
      </motion.div>

      {/* Sign Up Button */}
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </span>
        </motion.button>
      </motion.div>

      {/* Login Link */}
      <motion.div variants={itemVariants} className="text-center">
        <p className="text-slate-400 text-sm">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onLoginClick}
            className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors duration-200"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </motion.form>
  );
};
