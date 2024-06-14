const express = require('express')
var mongoose = require('mongoose');
const app = express()
const port = 8000
const cors = require('cors')
const multer = require('multer');
const Post = require('./models/Post');
const path = require('path');

mongoose.connect("mongodb://localhost:27017/assignment");

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage });

  // Creating new post

  app.post('/posts', upload.single('post'), async (req, res) => {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const newPost = new Post({
      title,
      description,
      imageUrl
    });
    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Getting created posts

  app.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete('/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const posts = await Post.findByIdAndDelete(id);
      res.status(200).json({message: 'Post deleted successfully'});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.use(require("./routes"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

process.on('SIGINT', async function () {
    await mongoose.disconnect();
    process.exit(0)
});