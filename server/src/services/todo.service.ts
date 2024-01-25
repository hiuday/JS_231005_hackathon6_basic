import Repository from "../repositories/todo.reponsitory";

class TodoService {
  private todoRepository: Repository;

  constructor() {
    this.todoRepository = new Repository();
  }
  async getAllTodo(sort: any): Promise<any> {
    return await this.todoRepository.getAllTodo(sort);
  }
  async createTodo(formRequest: any) {
    await this.todoRepository.createTodo(formRequest);
  }

  async deleteTodoById(id: number) {
    const data = await this.todoRepository.deleteById(id);
    return data;
  }
}
export default TodoService;
