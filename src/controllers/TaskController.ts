import { json, Request, Response } from "express";
import TaskService from "../services/TaskService";
import {
  GetSchema,
  GetByIdSchema,
  AddSchema,
  UpdateSchema,
  UpdateSchemaParams,
  DeleteSchema,
} from "../schemas/TaskSchema";

import { v4 as uuidv4 } from "uuid";

import multer from "multer";

const taskservice = new TaskService();

class TaskController {
  constructor() {}

  async get(Req: Request, Res: Response) {
    try {
      const status = Req.query.status;
      await GetSchema.validate(Req.query);

      const result = taskservice.get(status as string);
      Res.json(result);
      Res.status(200);
    } catch (error) {
      Res.json({ error: error });
      Res.status(401);
    }
  }

  async getById(Req: Request, Res: Response) {
    const { id_task } = Req.params;
    try {
      await GetByIdSchema.validate(Req.params);
      const result = taskservice.getById(id_task);

      Res.json(result);
    } catch (error) {
      Res.json({ error: error });
      Res.status(401);
    }
  }

  async add(Req: Request, Res: Response) {
    try {
      await AddSchema.validate(Req.body);

      const id = uuidv4();
      Req.body.id = id;

      const result = taskservice.add(Req.body);
      Res.json(result);
      Res.status(201);
    } catch (error) {
      Res.json({ error: error });
      Res.status(401);
    }
  }

  async update(Req: Request, Res: Response) {
    try {
      const { id_task } = Req.params;

      await UpdateSchema.validate(Req.body);
      await UpdateSchemaParams.validate(id_task);

      const result = taskservice.update(Req.body, Req.body.id_task);

      if (Object.keys(result).length > 0) {
        Res.json(result);
      } else {
        Res.json({ error: "Task not faund" });
        Res.status(404);
      }
    } catch (error) {
      Res.json({ error: error });
      Res.status(400);
    }
  }

  async delete(Req: Request, Res: Response) {
    try {
      const { id_task } = Req.params;
      await DeleteSchema.validate(id_task);
      const result = taskservice.delete(id_task);
      Res.json(result);
    } catch (error) {
      Res.json({ error });
    }
  }
}

export default TaskController;
