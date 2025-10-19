import {Request, Response } from 'express';
import { Encrypt } from '../helpers/encrypt';
import UserModel from '../model/user.model';
import { StatusUser, User } from '../entity/User';
import { UserResponse } from '../dto/user.dto';
import * as cache from "memory-cache";

export class UserController {
    static async signUp(req: Request, res: Response) {
        const {name, email, password, role} = req.body;
        const encryptedPass = await Encrypt.encryptPass(password);
        const model = new UserModel();

        // Grava usuário
        const user: User = await  model.save({name, email, password: encryptedPass, role, status: StatusUser.Pending});

        // Carrega objeto de retorno
        const userDto: UserResponse = new UserResponse();
        userDto.email = user.email;
        userDto.name = user.name;
        userDto.role = user.role;

        const token = Encrypt.generateToken({id: user.id});

        return res
            .status(201)
            .json({ message: "User created successfully", token, userDto});

    }

    static async getUsers(req: Request, res: Response) {
        const data = cache.get("QueryGetUsers");
        
        if(data) {
            console.log("serving from cache: QueryGetUsers");
            return res.status(200).json({
                data,
            })
        }

        const model:UserModel = new UserModel();

        const users:UserResponse[] = await model.getUsers();

        return users;
    }

    static async updateUser(req: Request, res: Response) {
        const model:UserModel = new UserModel();
        const id = Number(req.params.id);
        const {name, email} = req.body;

        const response:UserResponse = await model.updateUser(id, {name, email});

        return res.status(200).json({message: "updated", response});
    }
}