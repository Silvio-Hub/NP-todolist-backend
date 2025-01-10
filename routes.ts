import { NextFunction, Router, Response, Request } from "express";
import TaskController from "./src/controllers/TaskController";
import storage from "./src/utils/storage";
import multer from "multer";

const taskController = new TaskController();

const upload = multer({ storage: storage });

const router = Router();

const authMiddleware = (Req: Request, Res: Response, next: NextFunction) => {
  //Executar as verificações necessarias

  if (Req.headers.authorization) {
    //Validar o token para identificar a existencia do usuário
    next();
  } else {
    // return new Error("Usuário não autenticado");
    Res.json({ error: "Usuário não autenticado" });
    Res.status(401);
  }

  next();
};

router.get("/task", taskController.get);
router.get("/task/:id_task", taskController.getById);
router.post("/task", upload.single("file"), taskController.add);
router.put("/task/:id_task", taskController.update);
router.delete("/task/:id_task", taskController.delete);

export default router;
