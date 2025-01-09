import { Task } from "../models/Task";
import TaskRepository from "../repositories/TaskRepository";

const tasksRepository = new TaskRepository();

class TaskService {
  constructor() {}

  get(status: string) {
    const result = tasksRepository.get();

    const tasks: Task[] = [];

    result.map((obj) => {
      if (obj.status === status) {
        tasks.push(obj);
      }
    });
    return tasks;
  }

  getById(id_task: string): Task | {} {
    const result = tasksRepository.get();

    let task = {};

    result.map((obj) => {
      if (obj.id === id_task) {
        task = obj;
      }
    });

    return task;
  }

  getIndexById(id_task: string): number {
    const result = tasksRepository.get();

    let position: number = 99999;

    result.map((obj, index) => {
      if (obj.id === id_task) {
        position = index;
      }
    });
    return position;
  }

  add(data: Task): Task {
    return tasksRepository.add(data);
  }

  update(data: Task, id_task: string) {
    const position = this.getIndexById(id_task);

    if (position !== 99999) {
      return tasksRepository.update(data, position);
    } else {
      return {};
    }
  }

  delete(id_task: string) {
    const position = this.getIndexById(id_task);
    if (position !== 99999) {
      return tasksRepository.delete(position);
    } else {
      return {};
    }
  }
}

export default TaskService;
