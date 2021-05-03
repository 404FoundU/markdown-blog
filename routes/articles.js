import express from "express";
import Article from "../models/article.js";

const router = express.Router();
router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()});
})
router.get('/:slug', async(req, res) =>{
    const article = await Article.findOne({slug: req.params.slug});
    // res.send(req.params.id)
    if (article == null) {
        res.redirect('/');
    }
    res.render('articles/show', {article: article})

})
router.post('/', async(req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })

try {
    await article.save();
    res.redirect(`/articles/${article.slug}`)
}
catch (e){
    console.error(e);
    // res.status(500).send(e);
res.render('articles/new', { article: article})
    }})

export default router;