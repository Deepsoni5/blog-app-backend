const express = require("express");
const { connectDB } = require("./connection.js");
const cors = require("cors");
const BlogPost = require("./models/BlogPost.js");

const app = express();
const PORT = 5000 || process.env.PORT;

// connect to database
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// routes

// route to post a blog
app.post("/post-blog", async (req, res) => {
  let blog = new BlogPost({
    title: req.body.title,
    description: req.body.description,
  });

  await blog.save();

  res.json({
    message: "Blog post saved successfully",
    blog,
  });
});

// route to get all blog

app.get("/get-blogs", async (req, res) => {
  let blogs = await BlogPost.find();
  if (!blogs) {
    res.status(404).json({
      message: "Blogs not found",
    });
  }
  res.json({ blogs });
});

// delete a blog

app.delete("/delete-blog/:id", async (req, res) => {
  let blog = await BlogPost.findByIdAndDelete(req.params.id);
  if (!blog) {
    res.status(404).json({
      message: "No Blog Found to delete",
    });
  }
  res.status(200).json({
    message: "Blog deleted Successfully!",
  });
});

// update a blog

app.put("/update-blog/:id", async (req, res) => {
  let blog = await BlogPost.findByIdAndUpdate(req.params.id);

  if (!blog) {
    res.status(404).json({
      message: "No Blog Found to delete",
    });
  }

  if (!req.body.title && !req.body.description) {
    res.json({
      message: "Please enter a title or description",
    });
  } else if (!req.body.title) {
    blog.description = req.body.description;
  } else if (!req.body.description) {
    blog.title = title;
  } else {
    blog.title = req.body.title;
    blog.description = req.body.description;
  }

  await blog.save();
  res.status(200).json({
    message: "Blog updated successfully",
    blog,
  });
});

// listen
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
