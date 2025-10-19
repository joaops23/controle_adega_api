import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

export enum StatusUser {
    Active = "Active",
    Inactive = "Inactive",
    Pending = "Pending",
    Deleted = "Deleted",
};

export enum UserRole {
    admin = "Admin",
    user = "User",
    client = "Client",
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: String;

    @Column({enum: UserRole, default: 'user'})
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({enum: StatusUser, default: StatusUser.Pending})
    status: StatusUser;

}