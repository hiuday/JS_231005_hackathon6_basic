import { Express } from "express";
import todoController from "../controllers/todoController";

const Router = (app: Express) => {
  app.use("api/v1/todo", todoController);
};
export default Router;
