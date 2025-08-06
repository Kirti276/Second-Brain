import { useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Input } from "./Input"; // If Input is used elsewhere

interface ContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContentModal({ open, onClose }: ContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const type = typeRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        link,
        type,
        title,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(25, 118, 210, 0.25)',
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(6px)',
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          background: 'rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(2px)',
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1.2rem',
        }}
      >
        Add Content
        <IconButton aria-label="close" onClick={onClose} sx={{ ml: 2, color: '#fff' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 3, background: 'transparent' }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            inputRef={titleRef}
            label="Title"
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              borderRadius: 2,
              background: '#f5faff',
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />
          <TextField
            inputRef={linkRef}
            label="Link"
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              borderRadius: 2,
              background: '#f5faff',
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />
          <Select
            inputRef={typeRef}
            displayEmpty
            defaultValue=""
            fullWidth
            size="small"
            sx={{
              minWidth: 120,
              borderRadius: 2,
              background: '#f5faff',
              '& .MuiSelect-select': { borderRadius: 2 },
            }}
          >
            <MenuItem value="" disabled>
              <em>Select Type</em>
            </MenuItem>
            <MenuItem value="Youtube">Youtube</MenuItem>
            <MenuItem value="Twitter">Twitter</MenuItem>
            <MenuItem value="Google Doc">Google Doc</MenuItem>
            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
            <MenuItem value="Instagram">Instagram</MenuItem>
            <MenuItem value="Spotify">Spotify</MenuItem>
          </Select>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: 2, background: 'transparent' }}>
        <Button onClick={addContent} variant="primary" text="Submit" size="md" />
      </DialogActions>
    </Dialog>
  );
}

