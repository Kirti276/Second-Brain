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
    background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
    color: "#fff",
    borderRadius: 999,
    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.15)",
    fontWeight: 700,
    fontSize: size === "lg" ? "1.1rem" : size === "sm" ? "0.9rem" : "1rem",
    textTransform: "none",
    transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
    '&:hover': {
      background: "linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)",
      boxShadow: "0 4px 16px rgba(25, 118, 210, 0.25)",
      transform: "scale(1.03)",
    },
    '&:active': {
      background: "linear-gradient(90deg, #0d47a1 0%, #1976d2 100%)",
      boxShadow: "0 2px 8px rgba(25, 118, 210, 0.20)",
      transform: "scale(0.98)",
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