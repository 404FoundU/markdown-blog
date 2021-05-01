import express from "express";

const router = express.Router();
router.route("/").get((req, res) => {
    // res.send("Hello world");
    res.send("articles");
});
router.get('/new', (req, res) =>{
    res.render('articles/new');
})
export default router;