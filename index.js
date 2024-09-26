const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { render } = require("ejs");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, "public")));

let posts=[
    {
        id:uuidv4(),
        username:"susovanPaul",
        img:"https://i.ytimg.com/vi/p693u53Q10U/maxresdefault.jpg",
        content:"Messi has won a record eight Ballon d'Or awards, a record six European Golden Shoes, and was named the world's best player for a record eight times by FIFA.",
        comments:["Well Done!","Improve Yourself.","God bless you."]
    },
    {
        id:uuidv4(),
        username:"pupaiPaul",
        img:"https://www.pymnts.com/wp-content/uploads/2023/12/Google-Gemini.jpg",
        content:"I got selected for pracement. It is my first job.",
        comments:["Well Done!","Improve Yourself.","God bless you."]
    },
    {
        id:uuidv4(),
        username:"MimiPaul",
        img:"https://i.ytimg.com/vi/Uq63-ZkL2E8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAbOB7c0gAXuNHCTTLR_4vCTwePGQ",
        content:" I am so happy becouse in 6 months, I complite 500+ LeetCode questions of DSA.",
        comments:["Well Done!","Improve Yourself.","God bless you."]
    },
    {
        id:uuidv4(),
        username:"MadhumitaPaul",
        img:"https://miro.medium.com/v2/resize:fit:1400/1*UonMBpBDpvSCSCCcGU9Tug.png",
        content:"Now I complite my first internship in 4 months. I learn more things about team work,web dev,comunication etc.",
        comments:["Well Done!","Improve Yourself.","God bless you."]
    }
];

app.get("/posts",(req,res)=>{ // all posts
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{  // post form
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{   // new post
    // console.log(req.body);
    let{username,img,content}=req.body;
    let id=uuidv4();
    let comments=[];
    posts.push({id,username,img,content,comments});
    // res.send("post request working!");
    res.redirect("/posts");
});

app.get("/posts/search",(req,res)=>{    // searching post...
    let{username}=req.query;
    // console.log(username);
    let post=posts.find((p)=> username===p.username);
    if (!post) {
        res.render("error.ejs");
    }
    else{
        res.redirect(`/posts/${post.id}`);
        // res.send("searching your query.");
    }
});

app.get("/posts/:id",(req,res)=>{  //Show in detail
    // console.log(req.params);
    let {id}=req.params;
    let post = posts.find((p)=> id===p.id);
    // console.log(post.comments);
    if (!post) {
        res.render("error.ejs");
    };
    res.render("show.ejs",{post});
});

app.post("/posts/:id", (req, res) => {  // post comment
    let { id } = req.params;
    let newComment = req.body.comment;
    // console.log("New comment: ", newComment);
    let post = posts.find((p)=> id===p.id);
    post.comments.push(newComment);
    res.redirect(`/posts/${id}`);
});

app.get("/posts/:id/edit",(req,res)=>{   // edit form
    let {id}= req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newImg=req.body.img;
    let newContent = req.body.content;  // Destructure content from req.body
    // console.log(newContent);
    let post = posts.find((p) => p.id === id); // to find this post
    if (!post) {
        res.render("error.ejs");
    }
    post.img=newImg;
    post.content=newContent;
    // console.log(post);
    // res.send("patch request wrking....");
    res.redirect("/posts");
});

app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    posts=posts.filter((p)=> id !== p.id);   // to delete this post.
    // res.send(`Post with ID ${id} deleted`);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log(`-> Listening to port : ${port} .`);
});




