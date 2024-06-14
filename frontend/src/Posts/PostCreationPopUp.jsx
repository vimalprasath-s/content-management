import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

const PostCreationPopup = ({ onClose, onAddPoster }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [isPosterUploaded, setIsPosterUploaded] = useState(false);

  const handleSave = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (poster) formData.append('post', poster);

    axios.post('http://localhost:8000/posts', formData)
      .then(response => {
        onAddPoster(response.data);
        onClose();
      })
      .catch(error => console.error(error));
  };

  const handlePosterChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPoster(file);
      setPosterPreview(URL.createObjectURL(file));
      setIsPosterUploaded(true);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>Add New Image</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          {!isPosterUploaded && (
            <Button
                variant="contained"
                component="label"
            >
                Upload Poster
            <input
                type="file"
                hidden
                onChange={handlePosterChange}
            />
            </Button>
          )}

          {posterPreview && (
            <Box mt={2}>
              <Typography variant="subtitle1">Uploaded Image:</Typography>
              <img src={posterPreview} alt="Uploaded poster" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostCreationPopup;
