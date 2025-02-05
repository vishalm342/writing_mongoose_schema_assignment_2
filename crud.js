const mongoose = require('mongoose');
const Blog = require('./schema'); // Import the schema

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// CREATE a new blog post
async function createBlogPost() {
  const blog = new Blog({
    title: 'My First Blog',
    content: 'This is the first blog content. It should have a minimum of 50 characters...',
    author: 'Vishal',
    tags: ['tech', 'mongodb'],
  });

  try {
    const result = await blog.save();
    console.log('Blog created:', result);
  } catch (error) {
    console.error('Error creating blog:', error.message);
  }
}

// READ all blog posts
async function getAllBlogPosts() {
  try {
    const blogs = await Blog.find();
    console.log('All Blogs:', blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
  }
}

// UPDATE a blog post by title
async function updateBlogPost(title) {
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { title },
      { content: 'Updated content for the blog post...' },
      { new: true }
    );
    console.log('Blog updated:', updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error.message);
  }
}

// DELETE a blog post by title
async function deleteBlogPost(title) {
  try {
    const deletedBlog = await Blog.findOneAndDelete({ title });
    console.log('Blog deleted:', deletedBlog);
  } catch (error) {
    console.error('Error deleting blog:', error.message);
  }
}

// Execute CRUD functions here
async function runCRUD() {
  await createBlogPost();
  await getAllBlogPosts();
  await updateBlogPost('My First Blog');
  await deleteBlogPost('My First Blog');
  mongoose.disconnect();
}

runCRUD();
