import express from "express";
import {
    getUsers, 
    getUsersByid,
    createUsers,
    updateUsers,
    deleteUsers
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/user', getUsers);
router.get('/user/:id', getUsersByid);
router.post('/user', createUsers);
router.patch('/user/:id', updateUsers);
router.delete('/user/:id', deleteUsers);

export default router;