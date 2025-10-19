import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET = ''} = process.env;

export class Encrypt {
    static async encryptPass(password: string): Promise<String> {
        return bcrypt.hashSync(password, 12);
    }

    static comparePassword(hashPassword: String, password: string): Boolean {
        return bcrypt.compareSync(password, String(hashPassword));
    }

    static generateToken(payload: any) {
        return jwt.sign(payload, JWT_SECRET, {expiresIn: "1d"});
    }
}