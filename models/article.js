import mongoose from "mongoose";
import marked from "marked";
import slugify from "slugify";

const articleSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        markdown: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    slug: {
            type:String,
        required: true,
        unique:true
    }

    }
)

articleSchema.pre('validate', () =>{
    if (this.title) {
        this.slug= slugify(this.title, {
            strict: true,
            lower: true
        })
    }
})
const Blog=  mongoose.model('Blog', articleSchema);
export default Blog;