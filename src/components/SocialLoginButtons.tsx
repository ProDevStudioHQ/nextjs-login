import React from 'react';
import { motion } from 'framer-motion';

interface SocialLoginButtonsProps {
  isLoading?: boolean;
  onSocialLogin?: (provider: string) => void;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ 
  isLoading = false,
  onSocialLogin 
}) => {
  const socialProviders = [
    {
      name: 'Google',
      label: 'Google',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      ),
      gradient: 'from-red-500/20 via-transparent to-yellow-500/20',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]',
      borderColor: 'border-red-500/20 hover:border-red-500/50',
    },
    {
      name: 'Facebook',
      label: 'Facebook',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      gradient: 'from-blue-500/20 via-transparent to-blue-400/20',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]',
      borderColor: 'border-blue-500/20 hover:border-blue-500/50',
    },
    {
      name: 'Apple',
      label: 'Apple',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.05 13.5c-.91 2.18-.69 4.85 2.05 6.32.61 1.08 1.34 1.92 2.1 2.32.85.47 1.79.7 2.79.64-.27-.33-.5-.73-.66-1.19-.27-.72-.4-1.58-.4-2.58 0-1.13.11-2.35.32-3.64.21-1.29.53-2.5.94-3.62H17.05zM7.05 13.5c-.91 2.18-.69 4.85 2.05 6.32 1.39.77 3.03 1.15 4.87 1.15 1.84 0 3.48-.38 4.87-1.15 2.74-1.47 2.96-4.14 2.05-6.32H7.05z" />
          <path d="M7 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3m10 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3m0-1c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4m-10 0c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z" />
        </svg>
      ),
      gradient: 'from-slate-400/20 via-transparent to-slate-300/20',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(203,213,225,0.3)]',
      borderColor: 'border-slate-400/20 hover:border-slate-400/50',
    },
    {
      name: 'GitHub',
      label: 'GitHub',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      gradient: 'from-orange-500/20 via-transparent to-yellow-500/20',
      hoverGlow: 'hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]',
      borderColor: 'border-orange-500/20 hover:border-orange-500/50',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: 'tween' as const,
      },
    },
    hover: {
      y: -2,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const dividerVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.6,
        type: 'tween' as const,
      },
    },
  };

  return (
    <div className="space-y-5">
      {/* Separator */}
      <div className="relative">
        <motion.div 
          className="absolute inset-0 flex items-center origin-center"
          variants={dividerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
        </motion.div>
        <div className="relative flex justify-center">
          <span className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-widest bg-slate-950">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Buttons */}
      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {socialProviders.map((provider) => (
          <motion.button
            key={provider.name}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={isLoading}
            onClick={() => onSocialLogin?.(provider.name.toLowerCase())}
            className={`relative group w-full px-4 py-3 rounded-xl border transition-all duration-300 ${provider.borderColor} ${provider.hoverGlow} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${provider.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            {/* Blur overlay on hover */}
            <div className="absolute inset-0 rounded-xl bg-slate-900/30 group-hover:bg-slate-900/10 transition-all duration-300"></div>

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center gap-2">
              {/* Icon */}
              <div className="text-slate-300 group-hover:text-white transition-colors duration-300">
                {provider.icon}
              </div>
              
              {/* Label - hidden on small screens */}
              <span className="hidden sm:inline text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors duration-300">
                {provider.label}
              </span>
            </div>

            {/* Loading spinner */}
            {isLoading && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-3 h-3 border-2 border-slate-600 border-t-yellow-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Info text */}
      <motion.p 
        className="text-center text-xs text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        We&apos;ll never post to your social accounts
      </motion.p>
    </div>
  );
};
