import express from "express";

const articles = express.Router();
articles.route("/").get((req, res) => {
    // res.send("Hello world");
    res.send("articles");
});
export default articles;