const express = require("express");
const app = express();
const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});


const blogs = [
  {

    id: 1,
    title: "Blog 1",
    content: "This is the content of Blog 1",
    author: "Amira Doe",
  },

  {
    id: 2,
    title: "Blog 2",
    content: "This is the content of Blog 2",
    author: "Lavina",
  },

  {
    id: 3,
    title: "Blog 3",
    content: "This is the content of Blog 3",
    author: "maira",
  },
  {
    id: 4,
    title: "Blog 4",
    content: "This is the content of Blog 4",
    author: "anu",
  },
  {
    id: 5,
    title: "Blog 5",
    content: "This is the content of Blog 5",
    author: "malvika",
  },
];

const arrOfObjs = [
  {
    id: 1,
    fname: "Amira",
    lname: "Doe",
    shortBio: "This is a short bio of John Doe",
    linkedInUrl: "https://www.linkedin.com/in/johndoe",
    githubUrl: "https://www.github.com/johndoe",
  },
  {
    id: 2,
    fname: "Lavina",
    lname: "sharma",
    shortBio: "This is a short bio of John Doe",
    linkedInUrl: "https://www.linkedin.com/in/johndoe",
    githubUrl: "https://www.github.com/johndoe",
  },
  {
    id: 3,
    fname: "maira",
    lname: "negi",
    shortBio: "This is a short bio of John Doe",
    linkedInUrl: "https://www.linkedin.com/in/johndoe",
    githubUrl: "https://www.github.com/johndoe",
  },
  {
    id: 4,
    fname: "anu",
    lname: "saxena",
    shortBio: "This is a short bio of John Doe",
    linkedInUrl: "https://www.linkedin.com/in/johndoe",
    githubUrl: "https://www.github.com/johndoe",
  },
  {
    id: 5,
    fname: "malvika",
    lname: "kashyap",
    shortBio: "This is a short bio of John Doe",
    linkedInUrl: "https://www.linkedin.com/in/johndoe",
    githubUrl: "https://www.github.com/johndoe",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs", {  blogs:arrOfObjs });
});


app.get("/newblog", (req, res) => {
  res.render("newblog.ejs");
});

app.get("/blogs", (req, res) => {
  res.render("blogs.ejs", { blogs });
});


app.get("/success",(req,res)=>{
  res.send("<h1>Blog Submitted Successfully!</h1><a href='/NewBlog/submit'>Submit another blog</a>");
});

// app.get("/fail",(req,res)=>{
//    res.send("<h1>failed to delete the blog</h1>")
// });

app.get("NewBlog/submit",(req,res)=>{
  res.render("newblog.ejs");
});

app.get("/blogs/submit", (req, res) => {
  const idFromPathVariable = req.params.id;
  if(!blogs.find((s) => s.id === parseInt(idFromPathVariable))) {
    res.status(404).send("<h1>Blogs does not exist.</h1>");
  }
  else{
    deleteBlogsById(parseInt(idFromPathVariable));
    res.redirect(NewBlog);
  }
});


app.post("/NewBlog",(req,res)=>{
  console.log(req.body);
  const newBlog = { 
    id: NewBlog.length + 1,
    BlogTitle: req.body.BlogTitle,
    ViewSummary: req.body.ViewSummary,
    Contact: req.body.Contact,
    Author: req.body.Author,
};
blogs.push();
res.redirect("/success");
});



function getBlogById(id) {
  return blogs.find((blog) => blog.id === id);
}

app.get("/blogs/id/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = getBlogById(blogId);
  res.render("single_blog", { blog });
});






function deleteBlogsById(id) {
  const index = blogs.findIndex((blog) => blog.id === id);
  if (index !== -1) {
    blogs.splice(index, 1);
  }
}

app.get("/blogs/delete/:id", (req, res) => {
  const idFromPathVariable = req.params.id;
  if(!blogs.find((s) => s.id === parseInt(idFromPathVariable))) {
    res.status(404).send("<h1>Blogs does not exist.</h1>");
  }
  else{
    deleteBlogsById(parseInt(idFromPathVariable));
    res.redirect(blogs);
  }
});





app.post("/blogs", (req, res) => {
  const newBlog = {
    id: blogs.length + 1,
    summary: req.body.summary,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  blogs.push(newBlog);
  res.redirect("/blogs");
});






app.use("/error", (req, res) => {
  res.render("error.ejs");
});







