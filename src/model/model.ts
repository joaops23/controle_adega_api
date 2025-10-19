import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";

export default class Model {
    public getRepository(T: any): Repository<any> {
        return AppDataSource.getRepository(T);
    }
}