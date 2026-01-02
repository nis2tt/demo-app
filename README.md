# Markdown Blog

A simple Node.js blog application that serves Markdown posts from a folder.

## Features

- List all blog posts on the home page
- View individual posts rendered from Markdown
- Create new posts using a web form
- Clean, minimalist design
- No database required - posts stored as `.md` files

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

- **View Posts**: Click on any post title from the home page
- **Create New Post**: Click the "+ New Post" button and fill out the form
- **Markdown Syntax**: Use standard Markdown formatting in your posts

## Project Structure

```
markdown-blog/
├── app.js              # Main server file
├── package.json        # Dependencies
├── posts/              # Markdown post files
│   └── welcome-to-my-blog.md
└── README.md          # This file
```

## Technologies Used

- **Express**: Web framework
- **Marked**: Markdown parser
- **Body-Parser**: Parse form data
