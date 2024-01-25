import Todolist from "../models/todo.model";

class Repository {
  async getAllTodo(sort: any) {
    if (sort) {
      return await Todolist.findAll({
        order: [["title", sort]],
      });
    }
  }

  async createTodo(formRequest: any) {
    await Todolist.create(formRequest);
  }

  async deleteById(id: number) {
    await Todolist.destroy({
      where: {
        id,
      },
    });
  }
}

export default Repository;
