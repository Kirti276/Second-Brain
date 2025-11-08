import { Input } from "../components/Input";
import { Button } from "../components/Button";
import axios from "axios";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Logo } from "../icons/Logo";
import Alert from "@mui/material/Alert";
import { ThemeToggle } from "../components/ThemeToggle";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(-5deg); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (e: any) {
      if (e.response && e.response.status === 403) {
        setError("Invalid username or password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: isDark
          ? 'linear-gradient(-45deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
          : 'linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        backgroundSize: '400% 400%',
        animation: `${gradientShift} 15s ease infinite`,
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: isDark
            ? 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.2), transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.2), transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3), transparent 50%)',
          animation: `${pulse} 4s ease-in-out infinite`,
        },
      }}
    >
      {/* Theme toggle in top right */}
      <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
        <ThemeToggle />
      </Box>
      {/* Animated floating shapes */}
      <Box
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: isDark ? 'rgba(102, 126, 234, 0.15)' : 'rgba(255, 255, 255, 0.1)',
          top: '15%',
          right: '10%',
          animation: `${float} 6s ease-in-out infinite`,
          backdropFilter: 'blur(10px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: isDark ? 'rgba(118, 75, 162, 0.12)' : 'rgba(255, 255, 255, 0.08)',
          bottom: '10%',
          left: '15%',
          animation: `${float} 8s ease-in-out infinite reverse`,
          backdropFilter: 'blur(10px)',
        }}
      />

      <Paper
        elevation={24}
        sx={{
          p: 5,
          borderRadius: 6,
          minWidth: 400,
          maxWidth: 420,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: isDark 
            ? 'rgba(15, 23, 42, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: isDark
            ? '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(51, 65, 85, 0.5)'
            : '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.5)',
          border: isDark
            ? '1px solid rgba(51, 65, 85, 0.8)'
            : '1px solid rgba(255, 255, 255, 0.8)',
          position: 'relative',
          zIndex: 1,
          animation: 'fadeInUp 0.6s ease-out',
          '@keyframes fadeInUp': {
            from: {
              opacity: 0,
              transform: 'translateY(30px)',
            },
            to: {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
        }}
      >
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              width: '100%', 
              mb: 2,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)',
            }}
          >
            {error}
          </Alert>
        )}
        <Box 
          sx={{ 
            color: 'primary.main', 
            fontSize: 90, 
            mb: 1,
            animation: `${float} 3s ease-in-out infinite`,
            filter: 'drop-shadow(0 4px 8px rgba(25, 118, 210, 0.3))',
          }}
        >
          <Logo size="xl" />
        </Box>
        <Typography 
          variant="h3" 
          fontWeight={900} 
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 0.5,
            letterSpacing: 1,
          }}
        >
          Welcome Back
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          mb={4}
          textAlign="center"
          sx={{ opacity: 0.7, maxWidth: 300 }}
        >
          Sign in to access your second brain
        </Typography>
        <Box sx={{ width: '100%', mb: 2.5 }}>
          <Input reference={usernameRef} placeholder="Username" />
        </Box>
        <Box sx={{ width: '100%', mb: 3 }}>
          <Input reference={passwordRef} type="password" placeholder="Password" />
        </Box>
        <Button
          onClick={signin}
          loading={loading}
          variant="primary"
          text="Sign In"
          size="md"
          Fullwidth={true}
        />
        <Typography variant="body2" color="text.secondary" mt={3} sx={{ opacity: 0.8 }}>
          Don't have an account?{' '}
          <Link 
            href="/signup" 
            underline="hover" 
            sx={{ 
              fontWeight: 700,
              color: '#667eea',
              '&:hover': {
                color: '#764ba2',
              },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}