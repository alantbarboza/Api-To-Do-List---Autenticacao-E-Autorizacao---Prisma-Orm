
import { AuthInterface, RefreshTokenInterface } from "../schemas/AuthSchema";
import InMemoryUserRepository from "../repositories/in-memory/InMemoryUserRepository";
import bcrypt from "bcrypt";
import { decodeJWT, generateJWT, verifyJWT  } from "./helpers/AuthHelper";

class AuthService{
    async execute(dadosValidados: AuthInterface){ //recebe os dados que estão chegando
        const inMemoryUserRepository = new InMemoryUserRepository;
        const dataUser = await inMemoryUserRepository.getByEmail(dadosValidados.email);
        
        if(!dataUser){
            throw new Error("E-mail e/ou senha inválidos!")
        }
        
        //console.log("password bcrypt: ", await bcrypt.hash("12345678", 10));
        const ifPasswordCorret = await bcrypt.compare(dadosValidados.password, dataUser.password)
        
        if(!ifPasswordCorret){
            throw new Error("E-mail e/ou senha inválidos!");
        }

        dataUser.password = "Não informado por questão de segurança";

        const token = generateJWT(dataUser, process.env.JWT_TOKEN_EXPIRES_IN as string);
        const refresh_token = generateJWT(dataUser, process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string);

        return {token, refresh_token};
    }

    async refreshToken(dadosValidados: RefreshTokenInterface){
        const verifyToken = verifyJWT(dadosValidados.token);
        const verifyRefreshToken = verifyJWT(dadosValidados.refresh_token);

        if(!verifyToken && !verifyRefreshToken){
            throw new Error("Token e Refresh Token inválidos!");
        }

        const {id_user, name, email, phone, password} = decodeJWT(dadosValidados.refresh_token);
        const payloadJWT = {id_user, name, email, phone, password};

        const token = generateJWT(payloadJWT, process.env.JWT_TOKEN_EXPIRES_IN as string);
        const refresh_token = generateJWT(payloadJWT, process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string);
        
        return {id_user, token, refresh_token}
    }
}

export default AuthService;
