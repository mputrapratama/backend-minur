import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
// import Users from "./models/UserModel.js";
// import Products from "./models/ProductModel.js";
// import Customers from "./models/CustomerModel.js";
// import Auth from "./models/AuthModel.js";
dotenv.config();
const app = express();
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ){
        cb(null, true);
    }else {
        cb(null, false);
    }
}

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

try {
    await db.authenticate();
    console.log('Database Connected...');
    // await Users.sync();
    // await Products.sync();
    // await Customers.sync();
    // await Auth.sync();
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(multer({storage: fileStorage, fileFilter: filefilter}).single('image'));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(router);


app.listen(5000, ()=> console.log('Server running at port 5000'));