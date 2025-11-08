import { IconButton, Tooltip, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} arrow>
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: mode === 'light' ? '#667eea' : '#fbbf24',
          bgcolor: mode === 'light' 
            ? 'rgba(102, 126, 234, 0.1)' 
            : 'rgba(251, 191, 36, 0.1)',
          border: `2px solid ${mode === 'light' ? 'rgba(102, 126, 234, 0.2)' : 'rgba(251, 191, 36, 0.2)'}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: mode === 'light' 
              ? 'rgba(102, 126, 234, 0.2)' 
              : 'rgba(251, 191, 36, 0.2)',
            transform: 'rotate(180deg) scale(1.1)',
            borderColor: mode === 'light' ? '#667eea' : '#fbbf24',
          },
        }}
      >
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
}

