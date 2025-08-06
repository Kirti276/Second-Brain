import { Input } from "../components/Input";
import { Button } from "../components/Button";
import axios from "axios";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Logo } from "../icons/Logo";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard"); // redirect the user to dashboard
    alert("you are signed in");
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
        <Box sx={{ color: 'primary.main', fontSize: 80, mb: 1 }}>
          <Logo size="xl" />
        </Box>
        <Typography variant="h4" fontWeight={800} color="primary" mb={1}>
          Brainly
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          Welcome back!
        </Typography>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Input reference={usernameRef} placeholder="Username" />
        </Box>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Input reference={passwordRef} placeholder="Password" />
        </Box>
        <Button
          onClick={signin}
          loading={false}
          variant="primary"
          text="Signin"
          size="md"
          Fullwidth={true}
        />
        <Typography variant="body2" color="text.secondary" mt={3}>
          Don't have an account?{' '}
          <Link href="/signup" underline="hover" color="primary" sx={{ fontWeight: 600 }}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}