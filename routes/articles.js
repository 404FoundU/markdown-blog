import express from "express";
import Article from "../models/article.js";

const router = express.Router();
router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()});
})
router.get('/:id', (req, res) =>{

})
router.post('/', async(req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })

try {
    const article = await article.save();
    res.redirect(`/articles/${article.id}`)
}
catch (e){
res.render('articles/new', { article: article})
    }})

export default router;