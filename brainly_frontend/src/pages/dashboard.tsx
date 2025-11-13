import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { ContentModal } from '../components/ContentModal'
import { ShareModal } from '../components/ShareModal'
import { ThemeToggle } from '../components/ThemeToggle'
import { Sidebar } from '../components/Sidebar'
import { BACKEND_URL } from '../config'
import { UseContent } from '../hooks/UseContent'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { BrainIcon } from '../icons/BrainIcon'; // create or import a brain-like icon if you have one


type Content = {
  _id: string;
  title: string;
  link: string;
  type: "Twitter" | "Youtube" | "Google Doc" | "Instagram" | "LinkedIn" | "Spotify";
};

export function Dashboard() {
 const [modalOpen, setModalOpen ] = useState(false)
 const [shareModalOpen, setShareModalOpen] = useState(false);
 const [shareUrl, setShareUrl] = useState<string>('');
 const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const { contents, refresh } = UseContent() as { contents: Content[]; refresh: () => void };
 const [selectedApp, setSelectedApp] = useState<string | null>(null);
 // inside the component
const navigate = useNavigate();

 async function handleDelete(_id: string) {
   await axios.delete(`${BACKEND_URL}/api/v1/content`, {
     data: { contentId: _id },
     headers: { Authorization: localStorage.getItem("token") }
   });
   refresh();
 }

 function handleDeleteRequest(_id: string) {
   setDeleteId(_id);
   setDeleteDialogOpen(true);
 }

 function handleDeleteConfirm() {
   if (deleteId) {
     handleDelete(deleteId);
   }
   setDeleteDialogOpen(false);
   setDeleteId(null);
 }

 function handleDeleteCancel() {
   setDeleteDialogOpen(false);
   setDeleteId(null);
 }

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return <Box sx={{ 
    minHeight: '100vh', 
    width: '100vw', 
    background: isDark
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
      : 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 50%, #f0f4f8 100%)',
    position: 'relative', 
    backgroundAttachment: 'fixed', 
    overflow: 'hidden' 
  }}>
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
    <Sidebar selectedApp={selectedApp} onSelectApp={setSelectedApp} />
    <Box
      sx={{
        px: 4,
        pt: 0,
        pb: 4,
        ml: '288px',
        minHeight: '100vh',
        background: isDark 
          ? 'rgba(15, 23, 42, 0.85)' 
          : 'rgba(255,255,255,0.85)',
        borderRadius: 6,
        boxShadow: isDark 
          ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
          : '0 8px 32px rgba(25, 118, 210, 0.10)',
        maxWidth: 'calc(100vw - 288px)',
        transition: 'background 0.3s',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <ContentModal open={modalOpen} onClose={() => { setModalOpen(false) }} />
      <ShareModal open={shareModalOpen} onClose={() => { setShareModalOpen(false) }} shareUrl={shareUrl} />
      <Paper
        elevation={3}
        sx={{
          mt: 0,
          p: 3,
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
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: 6, 
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          zIndex: 2,
          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
        }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, position: 'relative', zIndex: 3 }}>
          <Box>
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
              Your Second Brain
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
              Collect, organize, and never forget your most important content.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button onClick={() => { setModalOpen(true) }} startIcon={<PlusIcon size="md" />} size="sm" variant='primary' text='Add Content' />
            <Button
  onClick={() => navigate('/ai')}
  startIcon={<BrainIcon size={20} />}
  size="sm"
  variant="primary"
  text="AI Summarize"
/>

            <Button onClick={async () => {
              try {
                const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                  share: true
                }, {
                  headers: {
                    Authorization: localStorage.getItem("token")
                  }
                })
                // Generate frontend URL for sharing
                const frontendUrl = `${window.location.origin}/share/${response.data.hash}`;
                setShareUrl(frontendUrl);
                setShareModalOpen(true);
              } catch (error) {
                console.error("Failed to generate share link:", error);
              }
            }} startIcon={<ShareIcon size="md" />} size="sm" variant='secondary' text='Share Brain' />
            <ThemeToggle />
          </Box>
        </Box>
        <Divider sx={{ mb: 2, zIndex: 2 }} />
          {(selectedApp ? contents.filter(c => c.type === selectedApp) : contents).length === 0 ? (
            <Box sx={{ 
              textAlign: 'center', 
              py: 10, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minHeight: 400,
              position: 'relative',
            }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <InsertEmoticonIcon sx={{ fontSize: 64, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
              </Box>
              <Typography 
                variant="h4" 
                fontWeight={800} 
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 1.5,
                }}
              >
                Welcome to Your Second Brain!
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={4} sx={{ maxWidth: 500, opacity: 0.8, fontSize: '1.1rem' }}>
                It looks a little empty in here. Start building your second brain by adding your first piece of content!
              </Typography>
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                text="Add Your First Content"
                size="lg"
                startIcon={<PlusIcon size="md" />}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                mt: 2,
              }}
            >
              {(selectedApp ? contents.filter(c => c.type === selectedApp) : contents).map(({ _id, type, link, title }: Content) => (
                <Card key={_id} _id={_id} type={type} link={link} title={title} onDelete={handleDeleteRequest} />
              ))}
            </Box>
          )}
        </Paper>
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Delete Content</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this content? This action cannot be undone.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} variant="secondary" text="Cancel" size="md" />
            <Button onClick={handleDeleteConfirm} variant="primary" text="Delete" size="md" />
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  
}


