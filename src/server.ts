import "dotenv/config";
import express, { Application, json } from "express";
import { GetUserController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-create-users";
import { CreateUserController } from "./controllers/create-users/create-users";

const main = async () => {
  const app: Application = express();
  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getuserscontroller = new GetUserController(mongoGetUsersRepository);

    const response = await getuserscontroller.handle();

    return res.status(response.statusCode).send(response.body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const mongoCreateUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await mongoCreateUserController.handle({
      body: req.body,
    });

    return res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
