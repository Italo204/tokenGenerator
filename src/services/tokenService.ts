import dotenv from 'dotenv'
import jwt, { JwtPayload } from 'jsonwebtoken'

dotenv.config();

export async function generateToken(id:number, role: string, name: string) {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    
    let data = {
        userId: id,
        role: role,
        name: name,
    };

    const options = {
        expiresIn: '1h',
    }

    const acessToken = jwt.sign(data, jwtSecretKey!, options);

    const refreshToken = jwt.sign(data, jwtSecretKey!, {expiresIn: '1d'});

    console.log(acessToken)

    return {
        acessToken,
        refreshToken,
        options,
    };
}

async function decodePayload(payload:JwtPayload) {
    return {
        userId: payload.userId,
        role: payload.role,
        name: payload.name,
    };
}
//Realizar a verificação da role com o payload. Do tempo de duração

export async function verifyToken(token: string, refreshToken: string){
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    
    try {
        const payloadToken = jwt.decode(token) as jwt.JwtPayload;
        const payloadRefresh = jwt.decode(refreshToken) as jwt.JwtPayload;

        const expirationToken = payloadToken.exp ?? -1;
        const expirationRefresh = payloadRefresh.exp ?? -1;

        const currentTime = Math.floor(Date.now() / 1000);

        if(expirationToken == -1 || currentTime > expirationToken) {
            if(expirationRefresh == -1 || currentTime > expirationRefresh){
                return {valid: false, message: 'Token expireds'}
            } else {
                const data = await decodePayload(payloadRefresh);
                const expiration = {
                    expiresIn: "1h"
                }
                const newToken = jwt.sign(data, jwtSecretKey!, expiration)
                return {valid: true, role: data.role, newToken: newToken, expiration: expiration}
            }
        } else {
            jwt.verify(token, jwtSecretKey!);
            return {valid: true, role: payloadToken.role};
        }
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            return {valid: false, message: 'Token expiredksak'}
        } else {
            return {valid: false, message: `Invalid token ${error}`}
        }
    }
}