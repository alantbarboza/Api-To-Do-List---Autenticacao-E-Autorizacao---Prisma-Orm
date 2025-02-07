
import {Request, Response, NextFunction} from "express";
import PermissionRepository from "../repositories/PermissionRepository";
import AuthRepository from "../repositories/in-memory/InMemoryUserRepository"


const permissionRepository = new PermissionRepository();
const authRepository = new AuthRepository();

/*middleware: uma função a parte do sistema. Não precisa seguir regra de model, repository, service e etc*/
const AuthorizationMiddleware = (domain: string, permissions: string[]) => {
    return async (Req: Request, Res: Response, Next: NextFunction) => {
        const id_user = Req.body.id_user;
        const dataUser: any = await authRepository.getById(id_user);
        
        const dataPermission: any = permissionRepository.getPermissions(dataUser.user_group, domain);

        //verifica se o método ('getAll', 'getById', 'add', 'update', 'delete') está dentro das permissões do grupo
        //que o user está.
        let contain = true;
        permissions.map((item) => {
            if(!dataPermission.permissions.includes(item)){
                contain = false;
            }
        })

        if(contain){
            Next();
        }else{
            Res.json({error: "Unauthorized!"}).status(401);
        }
    }
}

export default AuthorizationMiddleware;