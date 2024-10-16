# Projeto de Geração de Tokens

Esse projeto foi desenvolvido em **TypeScript**, utilizando **Node.js**, **Express** e **Docker**. Ele foi um teste e uma revisão para mim, sendo a primeira vez que eu mexo com autenticação. Apesar de ser um pouco difícil, está completo. Este projeto foi feito para gerar tokens, com a intenção inicial de utilizá-lo juntamente com outro projeto de uma clínica médica que ainda está em desenvolvimento.

## **IMPORTANTE:**
Uma coisa que devo ressaltar é que nos métodos de criação e verificação, em vez de pegar as informações do header, eu coloquei para serem pegas do body. Isso foi feito por causa de que eu ainda não sei enviar requisições para outras APIs utilizando esse header.

<br />

## Funcionalidades

Nesta aplicação, temos apenas **dois endpoints** do tipo POST:
1. **Criação do Token**
2. **Verificação do Token**

Esses endpoints permitem colocar dados personalizados no payload do token, possibilitando armazenar informações para utilização nos cookies. A resposta da criação do token indica se foi bem-sucedida ou não, além de retornar o próprio **access token**, o **refresh token**, e a **expiração** do access token.

Na parte de verificação, a resposta é feita da seguinte maneira:
- Primeiro, mostrará se o token é válido ou não.
- Caso o access token tenha expirado, mas o refresh token ainda estiver ativo, um novo access token será criado e enviado na resposta, juntamente com o novo tempo de expiração.

## Executando a Aplicação

Para rodar a aplicação na sua máquina, utilize o **Docker** e siga os seguintes comandos:

1. Para criar a imagem, utilize o comando:

   ```bash
   docker build -t token_generator .

2. Para criar o contêiner, utilize o seguinte comando:
    ```bash
    docker run -d -p 3000:3000 token_generator

Após esses comandos, a aplicação deve iniciar, e você poderá testa-lá utilizando o **Postman**

## Contato

Você pode me encontrar no LinkedIn: [Italo Santos Mendes](www.linkedin.com/in/italo-santos-developer)