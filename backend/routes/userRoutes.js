import express from 'express';
import { authUser, registerUser } from '../controllers/userControllers.js';

const routes = express.Router();

routes.route("/").post(registerUser);
routes.route("/auth").post(authUser);

export default routes;