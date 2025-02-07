//middleware -> controller -> service -> repository -> model

/*
MIDDLEWARES: função/serviço que é executada no meio do caminho entre duas funções.
-pode ser aplicada em várias partes da aplicação.
-Ele é usado para adicionar funcionalidades ou verificar algo antes que a solicitação chegue ao destino final.

exemplo: routes -> middlewares -> controller

Uso comum:
-Autenticação e autorização.
-Manipulação de logs.
-Modificação de cabeçalhos HTTP.
-Parsing de dados (ex.: JSON, formulários).
-Controle de erros.
*/
import { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";

export const AuthMiddleware = async (Req: Request, Res: Response, Next: NextFunction) => {
    try{
        const authService = new AuthService();
        const {authorization, refresh_token} = Req.headers;
    
        if(authorization && refresh_token){
            const dataUser = await authService.refreshToken({token: authorization, refresh_token: refresh_token as string});
            //Atualiza os cabeçalhos com os novos tokens
            Req.headers.authorization = dataUser.token;
            Req.headers.refresh_token = dataUser.refresh_token;
            Req.body.id_user = dataUser.id_user;
            

            Res.set("authorization", dataUser.token);
            Res.set("refresh_token", dataUser.refresh_token);

            Next();
            return;
        }
    
        throw new Error("Authorization e RefreshToken são obrigatórios!");
    }catch(err: any){
        Res.status(400).json({error: err.message});
    }
}
