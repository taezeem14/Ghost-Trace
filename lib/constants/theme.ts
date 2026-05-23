export const GhostTheme = {
  colors: {
    background: '#0a0a0a',
    surface: '#121212',
    border: '#262626',
    textPrimary: '#e5e5e5',
    textSecondary: '#a3a3a3',
    primary: '#00ff41',
    primaryDim: 'rgba(0, 255, 65, 0.2)',
    danger: '#ff3333',
    warning: '#ffcc00',
    info: '#00ccff',
    safe: '#00cc66',
  },
  typography: {
    fontFamily: '"Fira Code", monospace',
  }
};

export const AnimationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};
