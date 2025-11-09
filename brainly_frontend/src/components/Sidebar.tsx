import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitteIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { SpotifyIcon } from "../icons/SpotifyIcon";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import { GdocIcon } from "../icons/GdocIcon";
import { InstaIcon } from "../icons/InstaIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import ExtensionIcon from '@mui/icons-material/Extension';  // For “Others” icon
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTheme } from "@mui/material/styles";

interface SidebarProps {
  selectedApp: string | null;
  onSelectApp: (app: string | null) => void;
}

const appItems = [
  { text: "All", icon: <DashboardIcon sx={{ fontSize: 24 }} />, type: null },
  { text: "Youtube", icon: <YoutubeIcon size={"md"} />, type: "Youtube" },
  { text: "Spotify", icon: <SpotifyIcon size={"md"} />, type: "Spotify" },
  { text: "Twitter", icon: <TwitterIcon size={"md"} />, type: "Twitter" },
  { text: "Google Docs", icon: <GdocIcon size={"md"} />, type: "Google Doc" },
  { text: "LinkedIn", icon: <LinkedinIcon size={"md"} />, type: "LinkedIn" },
  { text: "Instagram", icon: <InstaIcon size={"md"} />, type: "Instagram" },
   // 🆕 Add new category
  { text: "Others", icon: <ExtensionIcon sx={{ fontSize: 24 }} />, type: "Others" },
];

export function Sidebar({ selectedApp, onSelectApp }: SidebarProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: 288,
          background: isDark 
            ? 'rgba(15, 23, 42, 0.95)' 
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRight: isDark 
            ? '1px solid rgba(51, 65, 85, 0.8)' 
            : '1px solid rgba(226, 232, 240, 0.8)',
          boxShadow: isDark 
            ? '4px 0 24px rgba(0, 0, 0, 0.3)' 
            : '4px 0 24px rgba(102, 126, 234, 0.08)',
          px: 0,
          zIndex: 1200,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      }}
      sx={{
        width: 288,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 288, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 5, pb: 2 }}>
        <Box 
          sx={{ 
            fontSize: 70, 
            mb: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 4px rgba(102, 126, 234, 0.2))',
          }}
        >
          <Logo size="xl" />
        </Box>
        <Typography 
          variant="h5" 
          fontWeight={900} 
          sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: 1.5,
          }}
        >
          Brainly
        </Typography>
      </Box>
      <Divider sx={{ my: 2, mx: 3, borderColor: isDark ? 'rgba(51, 65, 85, 0.5)' : '#e3e8ef' }} />
      <List sx={{ pt: 2, pl: 2 }}>
        {appItems.map(item => (
          <SidebarItem
            key={item.text}
            text={item.text}
            icon={item.icon}
            active={selectedApp === item.type || (item.type === null && selectedApp === null)}
            onClick={() => onSelectApp(item.type)}
          />
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ my: 2, mx: 3, borderColor: isDark ? 'rgba(51, 65, 85, 0.5)' : '#e3e8ef' }} />
      <Box sx={{ textAlign: 'center', pb: 2, color: 'text.secondary', fontSize: 13 }}>
        © {new Date().getFullYear()} Brainly
      </Box>
    </Drawer>
  );
}