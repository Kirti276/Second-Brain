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
import DashboardIcon from '@mui/icons-material/Dashboard';

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
];

export function Sidebar({ selectedApp, onSelectApp }: SidebarProps) {
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: 288,
          background: 'linear-gradient(135deg, #e3f2fd 0%, #f5faff 100%)',
          borderRight: '2px solid #e3e8ef',
          boxShadow: '0 8px 32px rgba(25, 118, 210, 0.10)',
          px: 0,
          zIndex: 1200,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        },
      }}
      sx={{
        width: 288,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 288, boxSizing: 'border-box' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 5, pb: 2 }}>
        <Box sx={{ color: 'primary.main', fontSize: 80, mb: 1 }}>
          <Logo size="xl" />
        </Box>
        <Typography variant="h5" fontWeight={800} color="primary" sx={{ letterSpacing: 1 }}>
          Brainly
        </Typography>
      </Box>
      <Divider sx={{ my: 2, mx: 3, borderColor: '#e3e8ef' }} />
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
      <Divider sx={{ my: 2, mx: 3, borderColor: '#e3e8ef' }} />
      <Box sx={{ textAlign: 'center', pb: 2, color: 'text.secondary', fontSize: 13 }}>
        © {new Date().getFullYear()} Brainly
      </Box>
    </Drawer>
  );
}