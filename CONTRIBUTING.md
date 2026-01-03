# Contributing to Markdown Blog

Thank you for your interest in contributing to this project! This guide will help you get started with adding new blog posts and contributing to the codebase.

## Table of Contents

- [Getting Started](#getting-started)
- [Adding New Blog Posts](#adding-new-blog-posts)
- [Post Format Guidelines](#post-format-guidelines)
- [Submitting Your Contribution](#submitting-your-contribution)
- [Code Contributions](#code-contributions)

## Getting Started

1. **Fork the repository** to your own GitHub account
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR-USERNAME/demo-app.git
   cd demo-app
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`

## Adding New Blog Posts

Blog posts are stored as Markdown files in the `posts/` directory. Follow these steps to add a new post:

### Step 1: Create a New Markdown File

Create a new `.md` file in the `posts/` directory. Use a descriptive filename with hyphens:

```bash
posts/my-awesome-post.md
```

**Filename Guidelines:**
- Use lowercase letters
- Separate words with hyphens (`-`)
- Use descriptive names
- Examples: `getting-started-with-nodejs.md`, `tips-for-markdown.md`

### Step 2: Write Your Post

Structure your post using Markdown syntax. Start with a title (h1) on the first line:

```markdown
# Your Post Title

Your introduction paragraph goes here...

## Section Heading

Content for this section...

### Subsection

More detailed content...
```

### Step 3: Test Your Post Locally

1. Start the server: `npm start`
2. Navigate to `http://localhost:3000`
3. Your new post should appear in the list
4. Click on it to verify the formatting looks correct

## Post Format Guidelines

### Markdown Syntax

You can use all standard Markdown features:

**Text Formatting:**
- `**bold text**` for **bold text**
- `*italic text*` for *italic text*
- `` `inline code` `` for `inline code`

**Lists:**
```markdown
- Item 1
- Item 2
  - Nested item
```

**Code Blocks:**
````markdown
```javascript
function hello() {
  console.log("Hello, world!");
}
```
````

**Links:**
```markdown
[Link text](https://example.com)
```

**Images:**
```markdown
![Alt text](image-url.jpg)
```

### Best Practices

- **Start with a clear title** (h1 heading on the first line)
- **Use proper heading hierarchy** (h2, h3, etc.)
- **Keep paragraphs concise** and readable
- **Add code examples** when relevant
- **Include links** to external resources when helpful
- **Proofread** your content before submitting

## Submitting Your Contribution

### For New Blog Posts

1. **Create a new branch** for your post:
   ```bash
   git checkout -b add-post-topic-name
   ```

2. **Add your new post file**:
   ```bash
   git add posts/your-post-name.md
   ```

3. **Commit your changes**:
   ```bash
   git commit -m "Add new post: Your Post Title"
   ```

4. **Push to your fork**:
   ```bash
   git push origin add-post-topic-name
   ```

5. **Open a Pull Request** on GitHub:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Provide a clear description of your post
   - Submit the PR

### Pull Request Guidelines

- **Title**: Use a clear, descriptive title (e.g., "Add post: Getting Started with Node.js")
- **Description**: Briefly describe what your post covers
- **One post per PR**: Keep pull requests focused on a single blog post
- **Check for conflicts**: Make sure your branch is up to date with the main branch

## Code Contributions

If you'd like to contribute code improvements (not just blog posts):

1. **Create an issue** first to discuss your proposed changes
2. **Follow the same branching workflow** as for blog posts
3. **Write clear commit messages** describing what changed and why
4. **Test your changes** thoroughly before submitting
5. **Update documentation** if your changes affect how the app works

### Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns in the project
- Add comments for complex logic
- Keep functions small and focused

## Questions?

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Reach out to the maintainers

Thank you for contributing! 🎉
