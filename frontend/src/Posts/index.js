import { Box, Container, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import PostCreationPopup from './PostCreationPopUp';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';


/**
 * The below components shows the working example of axios for API calls.
 * Also Material UI is integrated for design.
 */
const TestingAPI = () => {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/posts')
      .then(response => {
        setPosts(response.data)
        setFilteredPosts(response.data)
  })
      .catch(error => console.error(error));
  }, []);

  const handleAddPoster = (newPoster) => {
    setPosts([...posts, newPoster]);
  };

  const handleSearch = (e) => {
    const searchKey = e.target.value;
    setSearchQuery(searchKey);
    const filteredPost = posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredPosts(filteredPost);
  }

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <IconButton color="primary" onClick={() => setShowPopup(true)}>
          <AddIcon />
        </IconButton>
        <Typography variant="h4">Content Gallery</Typography>
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
          <InputBase onChange={handleSearch} sx={{ ml: 1, flex: 1 }} placeholder="SEARCH" />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Grid container spacing={2}>
        {filteredPosts.map(poster => (
          <Grid item xs={12} sm={6} md={4} key={poster._id}>
            <Paper sx={{ p: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <img src={`http://localhost:8000${poster.imageUrl}`} alt={poster.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <Box flexGrow={1} p={1}>
                <Typography variant="h6">{poster.title}</Typography>
                  <Typography sx={{ mt: 'auto', color: 'gray' }}>
                  {new Date(poster.createdAt).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {showPopup && <PostCreationPopup onClose={() => setShowPopup(false)} onAddPoster={handleAddPoster} />}
    </Container>
  );
};

// function TestingAPI() {

//     const [testData, setTestData] = React.useState(undefined);

//     return (
//         <Card style={{ width: "320px", margin: "20px", padding: "20px" }}>
//             <CardHeader title="Test Component"></CardHeader>
//             <CardContent>
//                 <Typography variant='body1'>Result: {testData ?? "(Click button below)"}</Typography>
//             </CardContent>
//             <CardActions>
//                 <Button
//                     variant="contained"
//                     onClick={async () => {
//                         const response = await axios.get(`http://localhost:8000`);
//                         setTestData(response.data);
//                     }}>
//                     Click to Test
//                 </Button>
//             </CardActions>

//             <CardActionArea>
//                 <Typography variant='caption'>You can make all the changes here -{'>'} <u><em>src/Posts/index.js</em></u> </Typography>
//             </CardActionArea>

//         </Card>


//     )
// }

export default function Posts() {
    // You can delete testingAPI component and start your assignment.    
    return <TestingAPI />
}
