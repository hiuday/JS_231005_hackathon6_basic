import express from "express";
import TodoService from "../services/todo.service";
import { Request, Response } from "express";
const todoController = express.Router();
const todoService = new TodoService();
todoController.get("/todo", async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort || undefined;
    const result = await todoService.getAllTodo(sort);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Có lỗi xảy ra" });
  }
});
todoController.post("/todo/create", async (req: Request, res: Response) => {
  try {
    const newTodo = {
      content: req.body.content,
    };
    await todoService.createTodo(newTodo);
    res.status(201).json({ msg: "thành công" });
  } catch (error) {
    res.status(500).json({ msg: "có lỗi" });
  }
});
todoController.delete("/todo/delete", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result: any = await todoService.deleteTodoById(id);
    if (!result) {
      res.status(404).json({ msg: "không tìm thấy" });
    } else {
      res.status(201).json({ msg: "xoá thành công" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra" });
  }
});
export default todoController;
