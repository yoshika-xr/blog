import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const blogs = [];
let init_id=0;
var targetId;

console.log(blogs);



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        title: "Your Story Matters: Start Blogging Today💙!!",
        blogs: blogs
    });
});
app.get("/features", (req, res) => {
    res.render("feature.ejs", {
        title: "The features of this blog☺️🤍!"
    });
});
app.get("/createblog", (req, res) => {
    res.render("create.ejs", {
        title: "create your own blog⌨💌"
    });
})
app.post("/createblog", (req, res) => {
    const blog = req.body
    const newBlog={
        id:++init_id,
        title:blog.title,
        subtitle:blog.subtitle,
        author:blog.author,
        date:blog.date,
        content:blog.content
    }
    blogs.push(newBlog)
    res.redirect("/");
})
app.get("/readBlog", (req, res) => {
    const blogId = req.query.id;
    const blog = blogs.find(b => b.id == blogId);

    if (!blog) {
        return res.status(404).send("Blog not found");
    }

    res.render("read.ejs", {
        title:"A Space for Stories – Read & Reflect 📖✨",
        blog: blog
    });
});
app.get("/updateBlog",(req,res)=>{
    targetId=req.query.id
    const blog = blogs.find(b => b.id == targetId);
    console.log(blog)
    res.render("update.ejs",{
        title:"Update Your Blog – Make It Even Better🔄!",
        blog:blog
    }); 
})
app.post("/updateBlog",(req,res)=>{
    var updatedBlogauthor=req.body.author
    var updatedBlogdate=req.body.date
    var updatedBlogtitle=req.body.title
    var updatedBlogsubtitle=req.body.subTitle
    var updatedBlogcontent=req.body.content
    const blog = blogs.find(b => b.id == targetId);
    blog.author=updatedBlogauthor
    blog.date=updatedBlogdate
    blog.title=updatedBlogtitle
    blog.subtitle=updatedBlogsubtitle
    blog.content=updatedBlogcontent
    res.redirect("/")
})
app.get("/deleteBlog",(req,res)=>{
    var deleteId=req.query.id
    const blogIndex = blogs.findIndex(b => b.id == deleteId);
    blogs.splice(blogIndex, 1);
    res.redirect("/")
})
app.get("/contact", (req, res) => {
    res.render("contact.ejs", {
        title:"📩 Get in Touch – Let's Connect!"
    });
});
app.post("/contact",(req,res)=>{
    const data=req.body
    console.log(data.name)
    console.log(data.email)
    console.log(data.text)
})
app.listen(port, () => {
    console.log(`server is start${port}`);
});