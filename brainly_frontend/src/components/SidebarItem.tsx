import type { ReactElement } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface ItemInterface {
  text: string;
  icon?: ReactElement;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem(props: ItemInterface) {
  return (
    <ListItemButton
      onClick={props.onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        color: '#374151',
        py: 1.2,
        px: 2,
        borderRadius: 2,
        maxWidth: 200,
        transition: 'background 0.18s, color 0.18s',
        position: 'relative',
        cursor: 'pointer',
        background: props.active ? 'linear-gradient(90deg, #e3f2fd 60%, #bbdefb 100%)' : undefined,
        fontWeight: props.active ? 700 : 500,
        '&:before': props.active ? {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 6,
          bottom: 6,
          width: 5,
          borderRadius: 3,
          background: 'linear-gradient(180deg, #1976d2 0%, #42a5f5 100%)',
        } : {},
        '&:hover': {
          background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)',
          color: '#1976d2',
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