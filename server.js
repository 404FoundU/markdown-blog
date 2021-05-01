import express from 'express';
import cors from 'cors';
import router from "./routes/articles.js";

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use("/articles", router);
app.get("/", (req, res) =>{
    const articles = [{
        title: "How to",
        createdAt: new Date(),
        description: 'Test'
    }]


    res.render("articles/index", {articles});
})

app.listen(5000);
