
import {Request, Response} from "express";
import { AuthInterface, executeAuthSchema, refreshTokenSchema, RefreshTokenInterface  } from "../schemas/AuthSchema";
import AuthService from "../services/AuthService";

class AuthController {
    async execute(Req: Request, Res: Response){
        try{
            const authService = new AuthService();
            //recebe apenas os valores dos campos que estão no AuthSchema
            //{stripUnknown: true} irá desconsiderar campos que não estejam no AuthSchema
            const dadosValidados: AuthInterface = await executeAuthSchema.validate(Req.body, {stripUnknown: true}); 
            
            const resultadoAutenticacao = await authService.execute(dadosValidados);
            Res.json(resultadoAutenticacao);
        }catch(err: any){
            Res.status(400).json({error: err.message});
        }
    }

    async refreshToken(Req: Request, Res: Response){
        try{
            const authService = new AuthService();
            const dadosValidados: RefreshTokenInterface = await refreshTokenSchema.validate(Req.body, 
                {stripUnknown: true});
            const resultadoRefreshToken = await authService.refreshToken(dadosValidados);
            Res.json(resultadoRefreshToken);
        }catch(err: any){
            Res.status(400).json({error: err.message})
        }
    }

    /*async get(Req: Request, Res: Response){
        Res.json({success: true});
    }*/
}

export default AuthController;
