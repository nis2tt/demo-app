const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { marked } = require('marked');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const POSTS_DIR = path.join(__dirname, 'posts');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ensure posts directory exists
async function ensurePostsDir() {
    try {
        await fs.access(POSTS_DIR);
    } catch {
        await fs.mkdir(POSTS_DIR, { recursive: true });
    }
}

// Get all markdown posts
async function getPosts() {
    const files = await fs.readdir(POSTS_DIR);
    const posts = [];

    for (const file of files) {
        if (file.endsWith('.md')) {
            const filePath = path.join(POSTS_DIR, file);
            const content = await fs.readFile(filePath, 'utf-8');
            const stats = await fs.stat(filePath);

            // Extract title from first line or use filename
            const lines = content.split('\n');
            const title = lines[0].replace(/^#\s*/, '') || file.replace('.md', '');

            posts.push({
                filename: file,
                title,
                date: stats.mtime,
                content
            });
        }
    }

    // Sort by date (newest first)
    posts.sort((a, b) => b.date - a.date);
    return posts;
}

// Home page - list all posts
app.get('/', async (req, res) => {
    try {
        const posts = await getPosts();

        const postsHtml = posts.map(post => `
      <div class="post-item">
        <h2><a href="/post/${encodeURIComponent(post.filename)}">${post.title}</a></h2>
        <p class="date">${post.date.toLocaleDateString()}</p>
      </div>
    `).join('');

        res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Markdown Blog</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 50px auto; 
            padding: 20px;
            line-height: 1.6;
          }
          h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
          .post-item { 
            border-bottom: 1px solid #ddd; 
            padding: 15px 0; 
          }
          .post-item h2 { margin: 0; }
          .post-item a { color: #0066cc; text-decoration: none; }
          .post-item a:hover { text-decoration: underline; }
          .date { color: #666; font-size: 0.9em; margin: 5px 0; }
          .button { 
            display: inline-block;
            background: #0066cc; 
            color: white; 
            padding: 10px 20px; 
            text-decoration: none; 
            border-radius: 5px;
            margin: 20px 0;
          }
          .button:hover { background: #0052a3; }
        </style>
      </head>
      <body>
        <h1>My Markdown Blog</h1>
        <a href="/new" class="button">+ New Post</a>
        ${postsHtml || '<p>No posts yet. Create your first post!</p>'}
      </body>
      </html>
    `);
    } catch (error) {
        res.status(500).send('Error loading posts: ' + error.message);
    }
});

// View individual post
app.get('/post/:filename', async (req, res) => {
    try {
        const filePath = path.join(POSTS_DIR, req.params.filename);
        const content = await fs.readFile(filePath, 'utf-8');
        const html = marked(content);

        res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Post</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 50px auto; 
            padding: 20px;
            line-height: 1.6;
          }
          h1, h2, h3 { color: #333; }
          code { 
            background: #f4f4f4; 
            padding: 2px 6px; 
            border-radius: 3px; 
          }
          pre { 
            background: #f4f4f4; 
            padding: 15px; 
            border-radius: 5px; 
            overflow-x: auto; 
          }
          a.back { 
            display: inline-block;
            color: #0066cc; 
            text-decoration: none; 
            margin-bottom: 20px;
          }
          a.back:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <a href="/" class="back">← Back to all posts</a>
        <div class="content">
          ${html}
        </div>
      </body>
      </html>
    `);
    } catch (error) {
        res.status(404).send('Post not found');
    }
});

// New post form
app.get('/new', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>New Post</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          max-width: 800px; 
          margin: 50px auto; 
          padding: 20px;
        }
        h1 { color: #333; }
        label { display: block; margin-top: 15px; font-weight: bold; }
        input, textarea { 
          width: 100%; 
          padding: 10px; 
          margin-top: 5px; 
          border: 1px solid #ddd;
          border-radius: 5px;
          font-family: monospace;
        }
        textarea { min-height: 300px; font-size: 14px; }
        button { 
          background: #0066cc; 
          color: white; 
          padding: 12px 30px; 
          border: none; 
          border-radius: 5px; 
          margin-top: 20px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover { background: #0052a3; }
        a.back { 
          color: #0066cc; 
          text-decoration: none; 
        }
        a.back:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <a href="/" class="back">← Back</a>
      <h1>Create New Post</h1>
      <form action="/create" method="POST">
        <label for="filename">Filename (without .md):</label>
        <input type="text" id="filename" name="filename" required placeholder="my-first-post">
        
        <label for="content">Content (Markdown):</label>
        <textarea id="content" name="content" required placeholder="# Post Title

Your content here..."></textarea>
        
        <button type="submit">Create Post</button>
      </form>
    </body>
    </html>
  `);
});

// Create new post
app.post('/create', async (req, res) => {
    try {
        const { filename, content } = req.body;

        if (!filename || !content) {
            return res.status(400).send('Filename and content are required');
        }

        // Sanitize filename
        const sanitizedFilename = filename.replace(/[^a-z0-9-_]/gi, '-') + '.md';
        const filePath = path.join(POSTS_DIR, sanitizedFilename);

        await fs.writeFile(filePath, content, 'utf-8');
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error creating post: ' + error.message);
    }
});

// Start server
ensurePostsDir().then(() => {
    app.listen(PORT, () => {
        console.log(`Blog server running at http://localhost:${PORT}`);
    });
});
