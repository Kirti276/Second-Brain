import { TextField, useTheme } from "@mui/material";
import Box from "@mui/material/Box";

interface Inputprops {
  placeholder: string;
  reference?: any;
  type?: string;
}

export function Input(props: Inputprops) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        inputRef={props.reference}
        placeholder={props.placeholder}
        type={props.type || "text"}
        variant="outlined"
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            background: isDark 
              ? 'rgba(30, 41, 59, 0.9)' 
              : 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: isDark ? '#334155' : '#e0e0e0',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: isDark ? '#667eea' : '#42a5f5',
            },
            '&.Mui-focused': {
              background: isDark ? 'rgba(30, 41, 59, 1)' : '#fff',
              '& fieldset': {
                borderColor: '#667eea',
                borderWidth: 2,
              },
            },
          },
          '& .MuiInputBase-input': {
            padding: '14px 16px',
            fontSize: '1rem',
            fontWeight: 500,
            color: isDark ? '#f1f5f9' : '#1e293b',
            '&::placeholder': {
              opacity: isDark ? 0.6 : 0.7,
            },
          },
        }}
      />
    </Box>
  );
}