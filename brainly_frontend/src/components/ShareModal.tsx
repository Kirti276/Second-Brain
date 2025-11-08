import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "./Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  shareUrl: string;
}

export function ShareModal({ open, onClose, shareUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (err) {
        console.error("Fallback copy failed:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: isDark 
            ? '0 8px 32px rgba(0, 0, 0, 0.5)' 
            : '0 8px 32px rgba(25, 118, 210, 0.25)',
          overflow: 'hidden',
          background: isDark 
            ? 'rgba(15, 23, 42, 0.95)' 
            : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(6px)',
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          background: isDark 
            ? 'rgba(0, 0, 0, 0.7)' 
            : 'rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(2px)',
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          fontWeight: 800,
          fontSize: '1.3rem',
          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
        }}
      >
        Share Your Brain
        <IconButton 
          aria-label="close" 
          onClick={onClose} 
          sx={{ 
            ml: 2, 
            color: '#fff',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 3, background: 'transparent' }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            Share this link with others to let them view your brain:
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
            <TextField
              value={shareUrl}
              variant="outlined"
              fullWidth
              size="small"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                borderRadius: 2,
                background: isDark ? 'rgba(30, 41, 59, 0.5)' : '#f5faff',
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: isDark ? '#334155' : undefined,
                  },
                },
                '& .MuiInputBase-input': {
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                  color: isDark ? '#f1f5f9' : undefined,
                },
              }}
            />
            <IconButton
              onClick={handleCopy}
              sx={{
                bgcolor: copied 
                  ? '#4caf50' 
                  : isDark 
                    ? '#667eea' 
                    : '#1976d2',
                color: '#fff',
                '&:hover': {
                  bgcolor: copied 
                    ? '#45a049' 
                    : isDark 
                      ? '#5568d3' 
                      : '#1565c0',
                },
                minWidth: 48,
                height: 40,
                transition: 'all 0.3s ease',
              }}
              title={copied ? "Copied!" : "Copy to clipboard"}
            >
              {copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
            </IconButton>
          </Box>
          {copied && (
            <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CheckCircleIcon sx={{ fontSize: 16 }} /> Link copied to clipboard!
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: 2, background: 'transparent' }}>
        <Button onClick={onClose} variant="primary" text="Done" size="md" />
      </DialogActions>
    </Dialog>
  );
}

