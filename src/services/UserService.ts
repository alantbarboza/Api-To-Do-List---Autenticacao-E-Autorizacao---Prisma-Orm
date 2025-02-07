import InMemoryUserRepository from "../repositories/in-memory/InMemoryUserRepository";
import PrismaUserRepository from "../repositories/prisma/PrismaUserRepository";
import { User } from "../models/User";

class UserService {
    constructor( private _userRepository: InMemoryUserRepository | PrismaUserRepository){}

    async getAll(): Promise<{data: User[]}> {
        const userData = await this._userRepository.getAll();
        return { data: userData }
    }

    async getById(id: string): Promise<{data: User}> {
        const userData = await this._userRepository.getById(id);

        if(!userData){
            throw new Error("Este usuário não existe!");
        }

        return { data: userData };
    }

    async create(data: User): Promise<{data: User}> {
        const userData = await this._userRepository.getByEmail(data.email);

        if(userData){
            throw new Error("Já existe um usuário com este e-mail!");
        }

        const addUserData = await this._userRepository.create(data);

        return { data: addUserData };
    }

    async update(id: string, data: User): Promise<User> {
        const userData = await this._userRepository.getById(id);

        if(!userData){
            throw new Error("Usuário não encontrado");
        }

        const updatedUser = await this._userRepository.update(id, data);
        return updatedUser;
    }

    async delete(id: string): Promise<{id: string}> {
        const userData = await this._userRepository.getById(id);

        if(!userData){
            throw new Error("Usuário não encontrado!");
        }

        const userDeletedId = await this._userRepository.delete(id);
        return {id: userDeletedId};
    }
}

export default UserService;