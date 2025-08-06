import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { ContentModal } from '../components/ContentModal'
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

type Content = {
  _id: string;
  title: string;
  link: string;
  type: "Twitter" | "Youtube" | "Google Doc" | "Instagram" | "LinkedIn" | "Spotify";
};

export function Dashboard() {
 const [modalOpen, setModalOpen ] = useState(false)
 const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
 const [deleteId, setDeleteId] = useState<string | null>(null);
 const { contents, refresh } = UseContent() as { contents: Content[]; refresh: () => void };
 const [selectedApp, setSelectedApp] = useState<string | null>(null);

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

  return <Box sx={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #e3f2fd 0%, #f5faff 100%)', position: 'relative', backgroundAttachment: 'fixed', overflow: 'hidden' }}>
    {/* Decorative SVG background */}
    <Box sx={{ position: 'absolute', top: -120, right: -120, zIndex: 0, opacity: 0.18 }}>
      <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="200" r="200" fill="#1976d2" />
      </svg>
    </Box>
    <Sidebar selectedApp={selectedApp} onSelectApp={setSelectedApp} />
    <Box
      sx={{
        px: 4,
        pt: 0,
        pb: 4,
        ml: '288px',
        minHeight: '100vh',
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 6,
        boxShadow: '0 8px 32px rgba(25, 118, 210, 0.10)',
        maxWidth: 'calc(100vw - 288px)',
        transition: 'background 0.3s',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <ContentModal open={modalOpen} onClose={() => { setModalOpen(false) }} />
      <Paper
        elevation={3}
        sx={{
          mt: 0,
          p: 3,
          borderRadius: 4,
          background: 'rgba(245,250,255,0.95)',
          minHeight: 300,
          boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent bar */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 8, background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)', zIndex: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, position: 'relative', zIndex: 3 }}>
          <Box>
            <Typography variant="h3" fontWeight={900} sx={{ color: '#1976d2', letterSpacing: 1, mb: 0.5 }}>
              Your Second Brain
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500, fontSize: 18 }}>
              Collect, organize, and never forget your most important content.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button onClick={() => { setModalOpen(true) }} startIcon={<PlusIcon size="md" />} size="sm" variant='primary' text='Add Content' />
            <Button onClick={async () => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
              }, {
                headers: {
                  Authorization: localStorage.getItem("token")
                }
              })
              const shareUrl = `${BACKEND_URL}/api/v1/brain/${response.data.hash}`
              alert(shareUrl);
            }} startIcon={<ShareIcon size="md" />} size="sm" variant='secondary' text='Share Brain' />
          </Box>
        </Box>
        <Divider sx={{ mb: 2, zIndex: 2 }} />
          {(selectedApp ? contents.filter(c => c.type === selectedApp) : contents).length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
              <InsertEmoticonIcon sx={{ fontSize: 64, color: 'primary.light', mb: 2 }} />
              <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
                Welcome to Your Second Brain!
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                It looks a little empty in here. Start building your second brain by adding your first piece of content!
              </Typography>
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                text="Add Content"
                size="md"
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


