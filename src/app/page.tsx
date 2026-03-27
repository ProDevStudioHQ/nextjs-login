'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { 
  AnimatedSpaceBackground, 
  LoginForm, 
  SignUpForm, 
  ForgotPasswordForm,
  SocialLoginButtons 
} from '@/components';

type AuthMode = 'login' | 'signup' | 'forgot-password';

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');
      alert(`Login successful! Welcome back ${data.user.name}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (user: { name: string; email: string; password: string; confirmPassword: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');
      alert('Registration successful! Please login.');
      setAuthMode('login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (email: string) => {
    setIsLoading(true);
    console.log('Forgot password:', { email });
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleSocialLogin = (provider: string) => {
    console.log('Social login:', provider);
    alert(`Logging in with ${provider} (integration ready)`);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const transitionVariants: Transition = {
    duration: 0.3,
    type: 'tween',
  };

  return (
    <div className="relative w-full min-h-screen bg-slate-950 overflow-hidden">
      {/* Animated Background */}
      <AnimatedSpaceBackground />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Branding */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="space-y-8">
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-red-600 to-yellow-600 shadow-lg shadow-red-500/50"
                >
                  <span className="text-white font-bold text-xl">⚡</span>
                </motion.div>

                {/* Heading */}
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold text-white">
                    Welcome Back
                  </h1>
                  <p className="text-xl text-slate-400">
                    Experience the next generation of futuristic design with our premium authentication platform.
                  </p>
                </div>

                {/* Features List */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[
                    'Secure & encrypted authentication',
                    'Seamless social login integration',
                    'Premium user experience',
                    'Fully responsive design',
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 text-slate-300"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Floating Accent */}
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-3xl"
                ></motion.div>
              </div>
            </motion.div>

            {/* Right Side - Auth Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              {/* Card Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-600/20 rounded-2xl blur-2xl"></div>

              {/* Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="relative bg-slate-950/80 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-red-600 to-yellow-600 rounded-b-full opacity-50"></div>

                {/* Animated Background Gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/5 via-transparent to-yellow-600/5 pointer-events-none"></div>

                {/* Content */}
                <div className="relative space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={authMode}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="space-y-1"
                      >
                        <h2 className="text-3xl font-bold text-white">
                          {authMode === 'login' && 'Sign In'}
                          {authMode === 'signup' && 'Create Account'}
                          {authMode === 'forgot-password' && 'Reset Password'}
                        </h2>
                        <p className="text-slate-400 text-sm">
                          {authMode === 'login' && 'Sign in to access your account'}
                          {authMode === 'signup' && 'Join us, it only takes a minute'}
                          {authMode === 'forgot-password' && 'Get back into your account'}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Forms */}
                  <AnimatePresence mode="wait">
                    {authMode === 'login' && (
                      <motion.div
                        key="login"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transitionVariants}
                      >
                        <LoginForm
                          onSubmit={handleLogin}
                          isLoading={isLoading}
                          onSignupClick={() => setAuthMode('signup')}
                          onForgotPasswordClick={() => setAuthMode('forgot-password')}
                        />
                      </motion.div>
                    )}

                    {authMode === 'signup' && (
                      <motion.div
                        key="signup"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transitionVariants}
                      >
                        <SignUpForm
                          onSubmit={handleSignUp}
                          isLoading={isLoading}
                          onLoginClick={() => setAuthMode('login')}
                        />
                      </motion.div>
                    )}

                    {authMode === 'forgot-password' && (
                      <motion.div
                        key="forgot"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transitionVariants}
                      >
                        <ForgotPasswordForm
                          onSubmit={handleForgotPassword}
                          isLoading={isLoading}
                          onBackClick={() => setAuthMode('login')}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Social Login - Only show on login page */}
                  {authMode === 'login' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <SocialLoginButtons
                        isLoading={isLoading}
                        onSocialLogin={handleSocialLogin}
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Bottom Accent */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-600/10 rounded-full blur-3xl"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="fixed top-4 left-4 lg:hidden z-20"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-yellow-600 shadow-lg shadow-red-500/50"
        >
          <span className="text-white font-bold text-lg">⚡</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
