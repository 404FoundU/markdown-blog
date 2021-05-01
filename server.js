import express from 'express';
import cors from 'cors';
import router from "./router.js";

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.use("/v1/blog", router);
app.listen(5000);
