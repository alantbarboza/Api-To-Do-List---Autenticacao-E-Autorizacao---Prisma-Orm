/*
helpers: serviços secundários.
*/
import jwt, { SignOptions  } from "jsonwebtoken";

const convertExpiresIn = (expiresIn: string): number => {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn, 10);
    
    switch (unit) {
        case 's': return value;          // Segundos
        case 'm': return value * 60;     // Minutos
        case 'h': return value * 3600;   // Horas
        case 'd': return value * 86400;  // Dias
        default: 
            console.log("Formato de expiresIn inválido!");
            return 3600;
    }
};

export const generateJWT = (payload: any, expiresIn: string): string => {
    /*const option: SignOptions = {
        expiresIn: '1h' 
    };*/

    const expiresInSeconds = convertExpiresIn(expiresIn);

    const option: SignOptions = {
        expiresIn: expiresInSeconds
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, option);
    return token;
}

export const decodeJWT = (token: string): any => {
    const payloadToken = jwt.decode(token);
    return payloadToken;
}

export const verifyJWT = (jwt_token: string): boolean  => {
    try{
        const verify = jwt.verify(jwt_token, process.env.JWT_SECRET as string);
        return true;
    }catch(err: any){
        return false;
    }
}
