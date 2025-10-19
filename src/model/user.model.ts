import { User } from '../entity/User';
import { UserResponse } from '../dto/user.dto';
import Model from './model';

export default class UserModel extends Model {
    async save({name, email, password, role, status}): Promise<User> {
        const user = new User();

        user.name = name;
        user.email = email;
        user.password = password;
        user.role = role;
        user.status = status;

        const userRepository = this.getRepository(User);
        await userRepository.save(user);

        return user;
    }

    async findByEmail(email: string): Promise<User|undefined> {
        const userRepository = this.getRepository(User);
        const user = await userRepository.findOne({ where: {email} });
        return user;
    }

    async findById(id: number): Promise<UserResponse> {
        const userRepository = this.getRepository(User);
        const user = await userRepository.findOne({where: {id}});

        return user;
    }

    async getUsers(): Promise<UserResponse[]> {
        const userRepository = this.getRepository(User);
        const users:User[] = await userRepository.find();

        const response:any[] = users.map(user => {{user.name ,user.email ,user.role}});
        return response;
    }

    async updateUser(id: number, params:any): Promise<UserResponse> {
        const userRepository = this.getRepository(User);

        const user = await userRepository.findOne({where: {id}});

        if(!user) {
            throw new Error("User not found");
        }

        if(params.email && params.email.length > 0) {
            user.email = params.email;
        }

        if(params.name && params.name.length > 0) {
            user.name = params.name;
        }

        user.save();

        return user;

    }

    async remove(id: number): Promise<Boolean> {
        const userRepository = this.getRepository(User);

        const user = await userRepository.findOne({where: {id}});

        if(!user) {
            throw new Error("User not found");
        }

        return;
    }

}