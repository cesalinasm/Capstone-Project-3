import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let blogs_array = [
    {
        id: 1,
        title: "The problem is not the driver",
        content:
          "I think the major problem of the service is the road conditions. There are too many holes and currently there are many detour which tremendously increases the amount of traffic. As a result, some drivers prefer not to take trips where roads are in poor conditions.",
        author: "Roxana Cruz",
        //date: "2024-08-01T10:00:00Z",
    },
    {
        id: 2,
        title: "Cars showing up with different plate numbers",
        content:
          "This is not supposed to happen. Drivers say that their registered car is in the shop and so they are using another one to keep working. Although it may be a reasonable excuse, it still feels insecured.",
        author: "Waleska Ponce",
        //date: "2024-08-05T14:30:00Z",
    },
    {
        id: 3,
        title: "Too expensive!",
        content:
          "Some of the trips, which are usually very short, the drivers's offers are very expensive. I could get a cheaper offer if I take a regular taxi, but I guess indrivers charge you a lot because they provide a more personal experience.",
        author: "Maria Elena Montiel",
        //date: "2024-08-10T09:15:00Z",
    },
    {
        id: 4,
        title: "Good, but can be better",
        content: 
          "Overall, the service is ok, a little expensive sometimes. I think a major improvement could be that app offer some deals or discounts, especially in holidays.",
        author: "Carlos Salinas",
        //date: "2024-08-10T09:15:00Z",
    }
];
var lastId = blogs_array.length;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

// GET all blogs
app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", {blogs: blogs_array})
});

// POST a blog
app.post("/blogs", (req, res) => {
    const newId = lastId += 1;
    blogs_array.push({id: newId,
                    author: req.body["author"],
                    title: req.body["title"],
                    content: req.body["text"]});
    res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
    const foundBlog = blogs_array.find((b) => b.id === parseInt(req.params.id));
    res.render("editblog.ejs", {blog: foundBlog});
});

// EDIT a blog
app.post("/edit/:id", async (req, res) => {
    const editBlog = {
        id: parseInt(req.params.id),
        author: req.body["author"],
        title: req.body["title"],
        content: req.body["content"]
    };
    const blogIndex = blogs_array.findIndex((b) => b.id === parseInt(req.params.id));
    blogs_array[blogIndex] = editBlog;
    res.redirect("/blogs");
});

// DELETE a blog
app.get("/delete/:id", async (req, res) => {
    const blogIndex = blogs_array.findIndex((b) => b.id === parseInt(req.params.id));
    blogs_array.splice(blogIndex, 1)
    res.redirect("/blogs");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});