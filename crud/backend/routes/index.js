import express from "express";
import { getUsers, getUserById, Register, Login, Logout, deleteUser, updateUser, NotifEmail} from "../controllers/Users.js";
import { getProducts, createProduct, deleteProduct} from "../controllers/Products.js";
import { getCustomers, getCustomerById, CreateData, deleteData } from "../controllers/Customers.js";
import { AuthRegister } from "../controllers/Users.js"
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', verifyToken ,getUserById);
router.post('/users',Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.delete('/users/:id', deleteUser);
router.patch('/users/edit/:id', updateUser);

router.get('/products', getProducts);
router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.post('/customers', CreateData);
router.delete('/customers/:id', deleteData);

router.put('/notif', NotifEmail);
// router.put('/:username/notif/SDHFDSUFUdifurtrut9r0eHDHFSID9ruri', RegisterNotif);
// router.post('/:username/notif/SDHFDSUFUdifurtrut9r0eHDHFSID9ruri', RegisterNotif);
router.put('/:username/verify/SDHFDSUFUdifurtrut9r0eHDHFSID9ruri', AuthRegister);
router.post('/auth', AuthRegister);

export default router;