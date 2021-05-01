import express from 'express';
import cors from 'cors';
import articles from "./routes/articles.js";

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use("/articles", articles);
app.get("/", (req, res) =>{
    const articles = [{
        title: "How to",
        createdAt: Date.now(),
        description: 'Test'
    }]


    res.render("index", {articles});
})

app.listen(5000);
