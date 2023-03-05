import Post from "./Post.js";

class PostService {
    async create(post) {
        return Post.create(post);
    }

    async getAll() {
        return Post.find();
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Не указан id поста!');
        }
        return Post.findById(id);
    }

    async update(post) {
        if (!post._id) {
            throw new Error('не указан id поста для обновления!');
        }
        return Post.findByIdAndUpdate(post._id, post, {new: true});
    }

    async delete(id) {
        if (!id) {
            throw new Error('Не указан id поста для удаления!');
        }
        return Post.findByIdAndDelete(id);
    }
}

export default new PostService();