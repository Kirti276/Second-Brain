import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '@mui/material/styles';

type Content = {
  _id: string;
  title: string;
  link: string;
  type: "Twitter" | "Youtube" | "Google Doc" | "Instagram" | "LinkedIn" | "Spotify";
};

export function SharedBrain() {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [contents, setContents] = useState<Content[]>([]);
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    async function fetchSharedBrain() {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
        setContents(response.data.content || []);
        setUsername(response.data.username || '');
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load shared brain');
        setContents([]);
      } finally {
        setLoading(false);
      }
    }

    if (shareLink) {
      fetchSharedBrain();
    }
  }, [shareLink]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #f5faff 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #f5faff 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 600, width: '100%' }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: isDark
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 50%, #f0f4f8 100%)',
        position: 'relative',
        backgroundAttachment: 'fixed',
        overflow: 'hidden',
        p: 4,
      }}
    >
      {/* Theme toggle in top right */}
      <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
        <ThemeToggle />
      </Box>
      {/* Enhanced decorative background elements */}
      <Box sx={{ 
        position: 'absolute', 
        top: -150, 
        right: -150, 
        zIndex: 0, 
        opacity: isDark ? 0.2 : 0.15,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #667eea 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: -100, 
        left: -100, 
        zIndex: 0, 
        opacity: isDark ? 0.15 : 0.12,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #764ba2 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      <Box
        sx={{
          maxWidth: '1400px',
          mx: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
          mt: 2,
          p: 4,
          borderRadius: 4,
          background: isDark 
            ? 'rgba(30, 41, 59, 0.95)' 
            : 'rgba(245,250,255,0.95)',
          minHeight: 300,
          boxShadow: isDark 
            ? '0 4px 24px rgba(0, 0, 0, 0.4)' 
            : '0 4px 24px rgba(25, 118, 210, 0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
          {/* Enhanced accent bar with gradient */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: 6,
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              zIndex: 2,
              boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
            }}
          />
          <Box sx={{ mb: 4, position: 'relative', zIndex: 3 }}>
            <Typography 
              variant="h3" 
              fontWeight={900} 
              sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: 1, 
                mb: 0.5,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              {username}'s Second Brain
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              sx={{ 
                fontWeight: 500, 
                fontSize: 18,
                opacity: 0.8,
                mt: 0.5,
              }}
            >
              Shared content collection
            </Typography>
          </Box>

          {contents.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 400,
              }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <Typography variant="h3" sx={{ opacity: 0.5 }}>📭</Typography>
              </Box>
              <Typography 
                variant="h5" 
                fontWeight={700}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 1,
                }}
              >
                No Content Yet
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ opacity: 0.7, maxWidth: 400 }}>
                This brain hasn't been populated with content yet. Check back later!
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                justifyContent: 'flex-start',
                alignItems: 'stretch',
              }}
            >
              {contents.map(({ _id, type, link, title }: Content) => (
                <Card
                  key={_id}
                  _id={_id}
                  type={type}
                  link={link}
                  title={title}
                  onDelete={() => {}}
                  showDelete={false}
                />
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

