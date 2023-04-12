import "dotenv/config";
import express from "express";
import { GetUserController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";

const app = express();

const port = process.env.PORT || 8000;

app.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();

  const getuserscontroller = new GetUserController(mongoGetUsersRepository);

  const response = await getuserscontroller.handle();

  res.send(response.body).status(response.statusCode);
});

app.listen(port, () => console.log(`listening on port ${port}!`));
