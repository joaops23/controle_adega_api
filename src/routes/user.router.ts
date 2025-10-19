import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";

const Router = express.Router();

Router.post("/login", AuthController.login);
Router.post("/signup", UserController.signUp);

export { Router as UserRouter };