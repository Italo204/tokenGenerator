import express from 'express';
import loginRouter from "./routes/authentication/token.router";

const app = express();
app.use(express.json());

app.use('/token', loginRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
    console.log(process.version);
})

