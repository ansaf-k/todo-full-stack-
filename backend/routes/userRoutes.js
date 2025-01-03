import express from 'express';
import { authUser, logout, registerUser } from '../controllers/userControllers.js';

const routes = express.Router();

routes.route("/").post(registerUser);
routes.route("/auth").post(authUser);
routes.route("/logout").post(logout);

export default routes;