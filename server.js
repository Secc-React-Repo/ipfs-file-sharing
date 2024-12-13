const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static('uploads'));  // Serve static files from 'uploads' directory

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Files will be saved in 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Save file with a unique name
  },
});

const upload = multer({ storage: storage });

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  // Generate file URL and send it back to the client
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.send({ fileUrl });
});

// File retrieval route
app.get('/retrieve', (req, res) => {
  const files = [];
  const uploadPath = './uploads';

  // Read the files in the uploads directory
  fs.readdirSync(uploadPath).forEach(file => {
    files.push(file);
  });

  // Send the list of file names as a response
  res.send({ files });
});

// Route to serve a specific file (for opening it in the browser)
app.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
