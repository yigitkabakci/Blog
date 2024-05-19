import express from 'express';
import mongoose from 'mongoose';
import Post from '../db/posts.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.json(allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Sunucu hatası: İşlem gerçekleştirilemedi' });
    }
});

router.post('/', async (req, res) => {
    try {
        const post = req.body;
        const createdPost = await Post.create(post);
        res.status(201).json(createdPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Sunucu hatası: İşlem gerçekleştirilemedi' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, creator } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send('Post bulunamadı');

        const updatedPost = { title, content, creator, _id: id };
        const updated = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
        
        if (!updated)
            return res.status(404).send('Post bulunamadı');

        res.json(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Sunucu hatası: İşlem gerçekleştirilemedi' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        
        if (!deletedPost)
            return res.status(404).send('Post bulunamadı');

        res.json({ message: 'Post silindi' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Sunucu hatası: İşlem gerçekleştirilemedi' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post)
            return res.status(404).send('Post bulunamadı');

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Sunucu hatası: İşlem gerçekleştirilemedi' });
    }
});

export default router;
