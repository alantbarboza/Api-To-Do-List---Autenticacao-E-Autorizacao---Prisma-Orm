import { randomUUID } from "crypto";
import { User } from "../../models/User"
import PrismaUserRepository from "../prisma/PrismaUserRepository";

class inMemoryUserRepository implements PrismaUserRepository{ //inmemory: banco de dados em memória/ banco de dados interno.
    //normalmente, adicionam  _  na frente do nome da variável privada
    private _user: User[] = [];

    constructor(){  //usuário padrão    obs: o id é o ORM (prisma) que normalmente gera.
        this._user = [{id_user: '56848d92-537f-4541-8da4-005f10c9fa20', name: "userPadrao", email: "username@teste.com",  
                     phone: "43 99999-9999", password: "$2b$10$r7V7PR5NNKWxGHzbJaCareeNk8QwSrDQP5VHebwh0/1GpFNyip75y", user_group: 1}]
    }

    async getAll(): Promise<User[]>{
        return this._user;
    }

    async getById(id: string): Promise<User | null>{
        const user = this._user.find((_user) => _user.id_user === id);
        //const user = this.user.filter(user => user.id_user === id);
        
        if(!user){
            return null;
        }

        return user;
    }

    async getByEmail(email: string): Promise<User | null>{
        /*const user = this._user.filter(_user => _user.email === email);
        return user[0];*/

        const dataUser = this._user.find((item) => item.email === email);

        if(!dataUser){
            return null;
        }

        return dataUser;
    }

    async create(data: User): Promise<User>{
        data.id_user = randomUUID();
        this._user.push(data);
        return data;
    }

    async update(id: string, data: User): Promise<User>{
        const index = this._user.findIndex((_user) => _user.id_user === id);
        data.id_user = this._user[index].id_user;
        this._user[index] = data;
        return this._user[index];
    }

    async delete(id: string): Promise<string>{
        const index = this._user.findIndex((_user) => _user.id_user === id);
        delete this._user[index];
        return id;
    }
}

export default inMemoryUserRepository;