import {Request, Response} from "express";
import UserModel from "../model/user.model";
import { User } from "../entity/User";
import { Encrypt } from "../helpers/encrypt";
import { UserResponse } from "../dto/user.dto";

export class AuthController {

    static async login(req: Request, res: Response) {
        const model = new UserModel();

        try{
            const {email, password} = req.body;
            if(!email || !password) {
                return res.status(500)
                    .json({ message: "email and password required"});
            }

            const user: User|undefined = await model.findByEmail(email);
            let passwordCompare: Boolean = false;
            if(user) {
                passwordCompare = Encrypt.comparePassword(user.password, password);
            }

            if(!user || !passwordCompare) {
                return res.status(404).json({ message: "User not Found"});
            }

            const token = Encrypt.generateToken({id: user.id});

            const userDto: UserResponse = new UserResponse();
            userDto.email = user.email;
            userDto.name = user.name;
            userDto.role = user.role;

            return res.status(200).json({ message: "Login successful", user: userDto, token});
        } catch(error) {
            return res.status(500).json({ message: "Internal server error"});
        }
    }

    static async getProfile(req: Request, res: Response) {
        const model: UserModel = new UserModel();
        if(!req['currentUser']) {
            return res.status(401).json({message: "unauthorized"});
        }

        const user:UserResponse =  await model.findById(req['currentUser'].id);
        return res.status(200).json({...user});
    }
}