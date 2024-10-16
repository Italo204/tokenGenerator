import express from "express"
import {generateToken, verifyToken} from "../../services/tokenService"

const router = express.Router(); 

router.post('/generateToken', async (req, res) => {
    const id = req.body.id;
    const role = req.body.role;
    const name = req.body.name;
    const tokenData = await generateToken(id, role, name);
    console.log(tokenData);
    res.status(200).json({
        "sucess": true,
        "BearerToken": tokenData.acessToken,
        "expiration": tokenData.options.expiresIn,
        "RefreshToken": tokenData.refreshToken,
    })
});

router.post('/verifyToken', async (req, res) => {
    const token = req.body.Authorization;
    const refreshToken = req.body.Refresh;
    if(!token || token === ""){
        res.status(400).send("Token is required");
        return;
    }

    try {
        let verified = await verifyToken(token, refreshToken);
        if(!verified?.valid){
            res.status(401).send(verified.message);
            return;
        } else {
            let response: {valid: Boolean, role: any, token?: string, expiration?: string;} = {valid: verified.valid,role: verified.role};

            if(verified.newToken) {
                response.token = verified.newToken;
                response.expiration = verified.expiration.expiresIn;
            }

            res.status(200).send(response)
        }
    } catch (error) {
        res.status(500).send(`An error occured ${error}`);
        return;
    }
});

export default router;