import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';

const DB_URL = 'mongodb+srv://user:user@sample-chat-app.gbmwuu1.mongodb.net/?retryWrites=true&w=majority';

const PORT = 5000;

const app = express();

app.use(express.json());
app.use('/api', router);
app.use(fileUpload({}));

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log('Server started on port ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();