import express from 'express';
import cors from 'cors';
import router from "./routes/articles.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000
mongoose.connect(
    process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
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

app.get("/", (req, res) => {
    const articles = [{
        title: "How to",
        createdAt: new Date(),
        description: 'Test'
    }]
    res.render("articles/index", {articles});
});
app.use("/articles", router);


