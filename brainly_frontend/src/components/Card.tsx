import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitteIcon";
import { SpotifyIcon } from "../icons/SpotifyIcon";
import { useEffect, useRef } from "react";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { InstaIcon } from "../icons/InstaIcon";
import { GdocIcon } from "../icons/GdocIcon";
import CardMui from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

function getYoutubeEmbedUrl(link: string): string {
  if (link.includes("youtu.be")) {
    const videoId = link.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (link.includes("watch?v=")) {
    const videoId = new URL(link).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return link; // fallback
}

function getGoogleDocEmbedUrl(link: string): string {
    // Extract DOC_ID between /d/ and the next slash or end of string
    const match = link.match(/\/document\/d\/([^/]+)/);
    if (match) {
        const docId = match[1];
        return `https://docs.google.com/document/d/${docId}/preview`;
    }
    return link; // fallback
}



function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    // Load Instagram embed script if not already loaded
    if (!(window as any).instgrm) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        (window as any).instgrm.Embeds.process();
      };
    } else {
      (window as any).instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{ maxWidth: "540px", margin: "auto" }}
    ></blockquote>
  );
}

function getSpotifyEmbedUrl(link: string): string {
  // Convert open.spotify.com/xxx/ID to open.spotify.com/embed/xxx/ID
  const regex = /https:\/\/open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/;
  const match = link.match(regex);
  if (match) {
    // match[1] = type, match[2] = ID
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
  }
  // Fallback: return input (might break embed)
  return link;
}



function TwitterEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLQuoteElement>(null);
  useEffect(() => {
    // Load Twitter script if not present
    if (!(window as any).twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        if ((window as any).twttr?.widgets) {
          (window as any).twttr.widgets.load();
        }
      };
    } else if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [url]);

  return (
    <blockquote className="twitter-tweet" data-theme="light" ref={ref}>
      <a href={url}>{url}</a>
    </blockquote>
  );
}




interface CardProps {
  _id: string;
  title: String;
  link: string;
  type: "Twitter" | "Youtube" | "Google Doc" | "Instagram" | "LinkedIn" | "Spotify";
  onDelete: (_id: string) => void;
}

export function Card(props: CardProps) {
  // Icon for the card type
  const typeIcon = {
    Youtube: <YoutubeIcon size="md" />,
    Twitter: <TwitterIcon size="md" />,
    Spotify: <SpotifyIcon size="md" />,
    LinkedIn: <LinkedinIcon size="md" />,
    Instagram: <InstaIcon size="md" />,
    "Google Doc": <GdocIcon size="md" />,
  }[props.type];

  return (
    <Box sx={{ p: 2 }}>
      <CardMui
        elevation={6}
        sx={{
          borderRadius: 5,
          width: 340,
          height: 400,
          minWidth: 340,
          maxWidth: 340,
          minHeight: 400,
          maxHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: 'linear-gradient(135deg, #f5faff 0%, #e3f2fd 100%)',
          boxShadow: '0 8px 32px rgba(25, 118, 210, 0.18)',
          transition: 'box-shadow 0.25s, transform 0.25s',
          '&:hover': {
            boxShadow: '0 16px 48px rgba(25, 118, 210, 0.28)',
            transform: 'translateY(-4px) scale(1.025)',
            borderColor: 'primary.main',
          },
          border: '2px solid #e3e8ef',
          overflow: 'hidden',
        }}
      >
        {/* Gradient accent bar at the top */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 8,
          background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
          zIndex: 2,
        }} />
        <CardHeader
          avatar={
            <Box
              sx={{
                borderRadius: '50%',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f3f6fa',
                boxShadow: 1,
              }}
            >
              {typeIcon && typeof typeIcon === 'object' &&
                // Clone the icon with a larger size if possible
                (typeIcon.type ?
                  <typeIcon.type {...typeIcon.props} size="lg" /> :
                  typeIcon
                )
              }
            </Box>
          }
          title={<Box sx={{ fontWeight: 700, fontSize: '1.18rem', color: '#1a237e', letterSpacing: 0.2 }}>{props.title}</Box>}
          action={
            <Box display="flex" alignItems="center">
              <Tooltip title="Share" arrow>
                <IconButton
                  component="a"
                  href={props.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ color: '#1976d2', mr: 1, bgcolor: '#e3f2fd', '&:hover': { bgcolor: '#bbdefb' } }}
                >
                  <ShareIcon size="md" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" arrow>
                <IconButton
                  onClick={() => props.onDelete(props._id)}
                  size="small"
                  sx={{ color: '#e53935', bgcolor: '#ffebee', '&:hover': { bgcolor: '#ffcdd2' } }}
                >
                  <DeleteIcon size="md" />
                </IconButton>
              </Tooltip>
            </Box>
          }
          sx={{ pb: 0, pt: 3, px: 2, zIndex: 3, background: 'transparent' }}
        />
        <Divider sx={{ my: 1, mx: 2, borderColor: '#e3e8ef', zIndex: 2 }} />
        <CardContent sx={{ pt: 1, pb: 2, flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
          {/* Embeds and previews */}
          {props.type === "Youtube" && (
            <iframe
              style={{ borderRadius: 8, width: '100%', height: 220, maxHeight: 220 }}
              src={getYoutubeEmbedUrl(props.link)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
          {props.type === "Google Doc" && (
            <iframe
              style={{ borderRadius: 8, width: '100%', height: 220, maxHeight: 220 }}
              src={getGoogleDocEmbedUrl(props.link)}
              title="Google Doc"
              frameBorder="0"
              allowFullScreen
            />
          )}
          {props.type === "Instagram" && (
            <Box sx={{ width: '100%', height: 220, maxHeight: 220, overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <InstagramEmbed url={props.link} />
            </Box>
          )}
          {props.type === "LinkedIn" && (
            <a href={props.link} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
              <Box
                sx={{
                  border: '1px solid #e3e8ef',
                  borderRadius: 2,
                  p: 2,
                  background: '#e3f2fd',
                  '&:hover': { boxShadow: 2, background: '#bbdefb' },
                  transition: 'background 0.2s, box-shadow 0.2s',
                  width: '100%',
                  height: 220,
                  maxHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ color: '#1976d2', fontWeight: 500, fontSize: 14, mb: 0.5 }}>
                  LinkedIn Post Preview
                </Box>
                <Box sx={{ color: '#222', fontWeight: 600, fontSize: 16, mb: 0.5, textDecoration: 'underline' }}>
                  {props.title}
                </Box>
                <Box sx={{ color: '#666', fontSize: 12 }}>Click to view on LinkedIn</Box>
              </Box>
            </a>
          )}
          {props.type === "Spotify" && (
            <iframe
              style={{ borderRadius: 8, width: '100%', height: 80, maxHeight: 80 }}
              src={getSpotifyEmbedUrl(props.link)}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              title="Spotify player"
            />
          )}
          {props.type === "Twitter" && (
            <Box sx={{ width: '100%', height: 220, maxHeight: 220, overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <TwitterEmbed url={props.link} />
            </Box>
          )}
        </CardContent>
        {/* Optionally, add CardActions for future buttons */}
      </CardMui>
    </Box>
  );
}