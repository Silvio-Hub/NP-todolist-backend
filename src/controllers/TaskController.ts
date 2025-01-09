import { json, Request, Response } from "express";
import TaskService from "../services/TaskService";

const taskservice = new TaskService();

class TaskController {
  constructor() {}

  get(Req: Request, Res: Response) {
    const { status } = Req.query;

    if (status && (status === "completed" || status === "in_progress")) {
      const result = taskservice.get(status);
      Res.json(result);
    } else {
      Res.json({ error: "Invalid status parameter" });
      Res.status(401);
    }
  }

  getById(Req: Request, Res: Response) {
    const { id_task } = Req.params;

    if (id_task) {
      const result = taskservice.getById(id_task);

      Res.json(result);
    } else {
      Res.json({ error: "Invalid id_task param" });
      Res.status(401);
    }
  }

  add(Req: Request, Res: Response) {
    const { id, description, data, status } = Req.body;

    if (id && description && data && status) {
      if (status === "in_progress" || status === "completed") {
        const result = taskservice.add(Req.body);
        Res.json(result);
        Res.status(201);
      } else {
        Res.json({ error: "Invalid status: completed or in_progress" });
        Res.status(401);
      }
    } else {
      Res.json({ error: "Invalid parameters" });
      Res.status(401);
    }
  }

  update(Req: Request, Res: Response) {
    const { id, description, data, status } = Req.body;
    const { id_task } = Req.params;

    if (id && description && data && status && id_task) {
      if (status === "in_progress" || status === "completed") {
        const result = taskservice.update(Req.body, id_task);

        if (Object.keys(result).length > 0) {
          Res.json(result);
        } else {
          Res.json({ error: "Task not faund" });
          Res.status(404);
        }
      } else {
        Res.json({ error: "Inavlid status parameter" });
        Res.status(401);
      }
    } else {
      Res.json({ error: "Invalid Parameters" });
    }
  }

  delete(Req: Request, Res: Response) {
    const { id_task } = Req.params;
    if (id_task) {
      const result = taskservice.delete(id_task);

      Res.json(result);
    } else {
      Res.json({ error: "id_task is required in params" });
      Res.status(401);
    }
  }
}

export default TaskController;
