import express from 'express';
import cors from 'cors';
import router from "./routes/articles.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Article from './models/article.js';
import methodOverride from 'method-override';


dotenv.config();
const app = express();
const port = process.env.PORT || 8000
mongoose.connect(
    process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        })
    })
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));

app.get("/",async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render("articles/index", {articles: articles});
});
app.use("/articles", router);


