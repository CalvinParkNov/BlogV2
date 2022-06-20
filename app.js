//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
// const ck = require('@ckeditor/ckeditor5-build-classic');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect(
    'mongodb+srv://calvinpark:aHZAhLRJW71mT2fC@cluster1.zb1pc53.mongodb.net/Blog'
);

const blogSchema = {
    title: {
        type: String,
        require: [1, "Title is required!"]
    },
    body: {
        type: String,
        require: [1, "Body is required!"]
    }
}

const Blog = mongoose.model("Blog", blogSchema);

let posts = [];

app.get("/", function (req, res) {
    Blog.find({}, (error, foundBlog) => {
        res.render("home", {
          posts: foundBlog
        });
    })
});

app.get("/about", function (req, res) {
    res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function (req, res) {
    res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    const title = req.body.postTitle;
    const body = req.body.postBody;

    const blog = new Blog({title: title, body: body});
    blog.save();

    res.redirect("/");

});


app.get("/posts/:postId", function (req, res) {
    const requestedId = _.lowerCase(req.params.postId);
   

    Blog.findOne({
      id:requestedId
    }, (error, foundPost) => {
      res.render("post", {
        title: foundPost.title,
        content: foundPost.body
      });
    });

});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
