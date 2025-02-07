//routes: endpoints da API, que direcionam as requisições para o controller.
//route -> middleware -> controller -> service -> repository -> model
import {Router} from "express";
import TaskController from "../controllers/TaskController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import storage from "../utils/storage";
import multer from "multer";
import AuthController from "../controllers/AuthController";
import AuthorizationMiddleware from "../middlewares/AuthorizationMiddleware";
import UserController from "../controllers/UserController";

const router = Router();  
const taskController = new TaskController();
const authController = new AuthController();
const userController = new UserController();

const upload = multer({ storage: storage });

/*****************AUTENTICAÇÃO E AUTORIZAÇÃO***************
 vai para o middleware e depois para o controller */
router.post("/auth", authController.execute);
router.post("/auth/refresh-token", authController.refreshToken);
router.get('/admin/project', AuthMiddleware, AuthorizationMiddleware('project', ['getAll']), () => {console.log("acabou a requisição");})
/**********************************************************/

router.get("/users", AuthMiddleware, userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

router.get('/task', taskController.get); //busca todas as tarefas
router.get('/task/:id_task', taskController.getById) //busca uma tarefa pelo id
router.post('/task', upload.single('file'), taskController.add); //adicionar uma task
router.put('/task/:id_task', taskController.update); //editar uma task
router.delete('/task/:id_task', taskController.delete); //excluir uma task 

export default router;