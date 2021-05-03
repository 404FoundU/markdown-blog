import express from "express";
import Article from "../models/article.js";

const router = express.Router();
router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()});
})
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    // res.send(req.params.id)
    if (article == null) {
        res.redirect('/');
    }
    res.render('articles/show', {article: article})
})
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/new', {article: article});
})
router.post('/', async (req, res, next) => {
        req.article = new Article();
    next();
    }, saveArticleAndRedirect('new')
)
router.delete('/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            res.status(200).send("Item not found");
        }
        res.redirect('/')
    } catch (e) {
        res.status(500).send(e);
    }
})
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
    }, saveArticleAndRedirect('edit'))

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        try {
            await article.save();
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            console.error(e);
            // res.status(500).send(e);
            res.render(`articles/${path}`, {article: article})
        }
    }
}

export default router;