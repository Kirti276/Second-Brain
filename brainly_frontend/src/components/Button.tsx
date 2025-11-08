import React from "react";
import MuiButton from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  onClick?: () => void;
  Fullwidth?: boolean;
  loading?: boolean;
}

const variantMap = {
  primary: "contained",
  secondary: "outlined",
};

const sizeMap = {
  sm: "small",
  md: "medium",
  lg: "large",
};

export const Button = (props: ButtonProps) => {
  const { variant = "primary", size = "md", text, startIcon, endIcon, onClick, Fullwidth, loading } = props;

  // Custom styles for primary variant
  const primaryStyles = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    borderRadius: 999,
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    fontWeight: 700,
    fontSize: size === "lg" ? "1.1rem" : size === "sm" ? "0.9rem" : "1rem",
    textTransform: "none",
    transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
    position: "relative",
    overflow: "hidden",
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      transition: 'left 0.5s',
    },
    '&:hover': {
      background: "linear-gradient(135deg, #5568d3 0%, #6a3d91 100%)",
      boxShadow: "0 6px 20px rgba(102, 126, 234, 0.5)",
      transform: "translateY(-2px) scale(1.02)",
      '&::before': {
        left: '100%',
      },
    },
    '&:active': {
      background: "linear-gradient(135deg, #5568d3 0%, #6a3d91 100%)",
      boxShadow: "0 2px 10px rgba(102, 126, 234, 0.4)",
      transform: "translateY(0) scale(0.98)",
    },
  };

  // Custom styles for secondary variant
  const secondaryStyles = {
    borderRadius: 999,
    fontWeight: 700,
    fontSize: size === "lg" ? "1.1rem" : size === "sm" ? "0.9rem" : "1rem",
    textTransform: "none",
    color: "#1976d2",
    borderColor: "#1976d2",
    background: "#e3f2fd",
    '&:hover': {
      background: "#bbdefb",
      borderColor: "#1565c0",
      color: "#1565c0",
    },
    '&:active': {
      background: "#90caf9",
      borderColor: "#0d47a1",
      color: "#0d47a1",
    },
  };

  return (
    <MuiButton
      variant={variantMap[variant] as "contained" | "outlined"}
      size={sizeMap[size] as "small" | "medium" | "large"}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      fullWidth={!!Fullwidth}
      disabled={loading}
      sx={variant === "primary" ? primaryStyles : secondaryStyles}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : text}
    </MuiButton>
  );
};