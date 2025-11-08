import type { ReactElement } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";

interface ItemInterface {
  text: string;
  icon?: ReactElement;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem(props: ItemInterface) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <ListItemButton
      onClick={props.onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        color: props.active 
          ? '#667eea' 
          : isDark ? '#94a3b8' : '#64748b',
        py: 1.5,
        px: 2.5,
        borderRadius: 3,
        maxWidth: 240,
        transition: 'all 0.25s cubic-bezier(.4,0,.2,1)',
        position: 'relative',
        cursor: 'pointer',
        background: props.active 
          ? isDark
            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(118, 75, 162, 0.2) 100%)'
            : 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%)'
          : 'transparent',
        fontWeight: props.active ? 700 : 600,
        '&:before': props.active ? {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 8,
          bottom: 8,
          width: 4,
          borderRadius: '0 4px 4px 0',
          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)',
        } : {},
        '&:hover': {
          background: isDark
            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
          color: '#667eea',
          transform: 'translateX(4px)',
        },
      }}
    >
      {props.icon && (
        <ListItemIcon sx={{ minWidth: 36, color: 'inherit', pr: 1 }}>{props.icon}</ListItemIcon>
      )}
      <ListItemText primary={props.text} primaryTypographyProps={{ fontWeight: 600, fontSize: 16 }} />
    </ListItemButton>
  );
}