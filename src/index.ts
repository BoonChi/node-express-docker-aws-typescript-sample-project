import express from 'express';
import cors from 'cors';
import {configs} from '@config/index';
import router from '@controller/router';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static('upload'));
router(app);

app.listen(configs.PORT,() => {
  console.log(`Server is running at ${configs.url}:${configs.PORT}`);
});

export default express;