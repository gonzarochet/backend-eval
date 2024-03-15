import { User } from "../entities/user.entity";

export interface RegisterResponse{
    user: User;
    token: string;
}