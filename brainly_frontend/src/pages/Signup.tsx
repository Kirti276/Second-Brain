import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import { Logo } from "../icons/Logo";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    setError(null);
    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });
      navigate("/signin");
      alert("You have signed up!");
    } catch (e: any) {
      if (e.response && e.response.status === 409) {
        setError("User already exists. Please sign in or use a different username.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #f5faff 100%)',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 5,
          minWidth: 340,
          maxWidth: 380,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 8px 32px rgba(25, 118, 210, 0.10)',
        }}
      >
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>
        )}
        <Box sx={{ color: 'primary.main', fontSize: 80, mb: 1 }}>
          <Logo size="xl" />
        </Box>
        <Typography variant="h4" fontWeight={800} color="primary" mb={1}>
          Brainly
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          Create your Brainly account
        </Typography>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Input reference={usernameRef} placeholder="Username" />
        </Box>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Input reference={passwordRef} placeholder="Password" />
        </Box>
        <Button
          onClick={signup}
          loading={false}
          variant="primary"
          text="Signup"
          size="md"
          Fullwidth={true}
        />
        <Typography variant="body2" color="text.secondary" mt={3}>
          Already have an account?{' '}
          <Link href="/signin" underline="hover" color="primary" sx={{ fontWeight: 600 }}>
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}