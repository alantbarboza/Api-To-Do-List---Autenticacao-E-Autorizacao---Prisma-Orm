//banco de dados em produção/remoto.
import { PrismaClient } from "@prisma/client";
import { User } from "../../models/User";

// Cria uma instância do PrismaClient
const prisma = new PrismaClient();

class PrismaUserRepository{
    async create(data: User): Promise<User> {
        const newUser = await prisma.user.create({
            data
        });

        return newUser;
    }
    
    async update(id: string, data: User): Promise<User>{
        const updateUser = await prisma.user.update({
            data,
            where: {
                id_user: id
            }
        });
        console.log(updateUser);
        return updateUser;
    }

    async getAll(): Promise<User[]>{
        const users = await prisma.user.findMany({
            //include: { //além de exibir os dados do usuário, também mostra seus posts.
             //   posts: true
            //}
        });

        return users;
    }

    async getById(id: string): Promise<User | null>{
        const user = await prisma.user.findFirst({
            where: {
                id_user: id
            }
        });

        if(!user){
            return null;
        }

        return user;
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!user){
            return null;
        }

        return user;
    }

    async delete(id: string): Promise<string>{
        const deleteUser = await prisma.user.delete({
            where: {
                id_user: id
            }
        });
        return deleteUser.id_user;
    }
}

const prismaUserRepository = new PrismaUserRepository();
prismaUserRepository.getAll();
export default PrismaUserRepository;