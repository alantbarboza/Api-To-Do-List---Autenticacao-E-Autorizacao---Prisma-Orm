import { Request, Response } from "express";
import UserService from "../services/UserService";
import InMemoryUserRepository from "../repositories/in-memory/InMemoryUserRepository"
import PrismaUserRepository from "../repositories/prisma/PrismaUserRepository";

//injetando uma classe de InMemoryUserRepository no UserService
const userService = new UserService(new InMemoryUserRepository());

//injetando uma classe de PrismaUserRepository no UserService
//const userService = new UserService(new PrismaUserRepository());

class UserController{
    async getAll(Req: Request, Res: Response){
        try{
            const userData = await userService.getAll();
            Res.json(userData);
        }catch(err: any){
            Res.status(400).json({error: err.message});
        }
    }

    async getById(Req: Request, Res: Response){
        try{
            if(!Req.params.id){
                throw new Error("O ID é obrigatório");
            }

            const userData = await userService.getById(Req.params.id);
            Res.json(userData);
        }catch(err: any){
            Res.status(400).json({error: err.message});
        }
    }

    async create(Req: Request, Res: Response){
        try{
            const data = Req.body;

            if(!data.name || !data.email || !data.password){
                throw new Error("Por favor, envie todos os dados obrigatórios!");
            }

            const userCreatedData = await userService.create(data);
            Res.json(userCreatedData);
        }catch(err: any){
            Res.status(400).json({error: err.message});
        }
    }

    async update(Req: Request, Res: Response){
        try{
            const data = Req.body;
            const { id } = Req.params;

            if(!data.name || !data.email || !data.password){
                throw new Error("Por favor, envie todos os dados obrigatórios!");
            }

            if(!id){
                throw new Error("bad request");
            }

            const updatedUser = await userService.update(id, data);
            Res.json(updatedUser);

        }catch(err: any){
            Res.status(400).json({error: err.message});
        }
    }

    async delete(Req: Request, Res: Response){
        try{
            const { id } = Req.params;

            if(!id){
                throw new Error("bad request id");
            }

            const userDeleted = await userService.delete(id);
            Res.json(userDeleted)
        }catch(err: any){
            Res.status(400).json({error: err.message});
        }
    }
}

export default UserController;