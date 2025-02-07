//controller: valida a requisição/verifica se as informações estão corretas 
// e chama o service para a lógica de negócios.
//controller -> service -> repository -> model
import { Request, Response } from "express";
import TaskService from '../services/TaskService';
import { DeleteSchema, AddSchema, GetSchema, GetByIdSchema, UpdateSchema, UpdateSchemaParams } from "../schemas/TaskSchema";
//uuid: um id único universal
//yarn add uuid
//yarn add @types/uuid -d
import { v4 as uuidv4 } from 'uuid';

const taskService = new TaskService();

class TaskController {
    constructor(){

    }

    async get(Req: Request, Res: Response){
        /* Validação manual // sem o yup

        const status = Req.query.status;
        if(status && (status === "in_progress" || status === "completed")){
            const result = taskService.get(status);
            Res.json(result);
            Res.status(200);
        }else{
            Res.json({error: "invalid status parameter"});
            Res.status(401);
        }
        */

        /*Validação com o yup (arquivo TaskSchema)*/
        try{
            const status = Req.query.status;
            await GetSchema.validate(Req.query);
            const result = taskService.get(status as string);
            Res.json(result);
            Res.status(200);
        }catch{
            Res.json({error: "invalid status parameter"});
            Res.status(401);
        }
    }

    async getById(Req: Request, Res: Response){
        /* Validação manual // sem o yup
        const { id_task } = Req.params;

        if(id_task){
            const result = taskService.getById(id_task);
            Res.json(result);
        }else{
            Res.json({error: "invalid id_task param"});
            Res.status(401);
        }
        */

        /*Validação com o yup (arquivo TaskSchema)*/
        try{
            const id = uuidv4();

            await GetByIdSchema.validate(Req.params);
            const result = taskService.getById(id);
            Res.json(result);
        }catch{
            Res.json({error: "invalid id_task param"});
            Res.status(401);
        }
    }

    async add(Req: Request, Res: Response) {  
        /* Validação manual // sem o yup
        const { id, descricao, data, status } = Req.body;
    
        if (id && descricao && data && status) {
            if (status === "in_progress" || status === "completed") {
                const result = taskService.add(Req.body);
                if ("error" in result) {
                    Res.status(400).json(result); // Retorna o erro se o ID já existir
                } else {
                    Res.status(201).json(result); // Adiciona a tarefa se for válida
                }
            } else {
                Res.status(400).json({ error: "Invalid status: must be 'completed' or 'in_progress'" });
            }
        } else {
            Res.status(400).json({ error: "Invalid parameters" });
        }
        */

        /*Validação com o yup (arquivo TaskSchema)*/
        try{
            if (!Req.file) {
                return Res.status(400).json({ error: 'Nenhum arquivo enviado' });
            }

            await AddSchema.validate(Req.body, {strict: true});
            const id = uuidv4();
            Req.body.id = id;

            const result = taskService.add(Req.body);
            Res.json(result); // Retorna o erro se o ID já existir
            Res.status(201); // Adiciona a tarefa se for válida
        }catch (error){
            Res.json({error});
            Res.status(400);
        }
    }
    

    async update(Req: Request, Res: Response){
        /* Validação manual // sem o yup
        const { id, descricao, data, status } = Req.body;
        const { id_task } = Req.params;

        if( id && descricao && data && status && id_task){
            if(status ==="in_progress" || status === "completed"){
                const result = taskService.update(Req.body, id_task);
                if(Object.keys(result).length > 0){
                    Res.json(result);
                }else{
                    Res.json({error: "Task not found"});
                    Res.status(404);
                }
            }else{
                Res.json({error: "invalid status: completed or in_progress"});
                Res.status(401);        
            }
        }else{
            Res.json({error: "invalid parameters"});
            Res.status(401);
        }
        */
       
        /*Validação com o yup (arquivo TaskSchema)*/
        try{
            const { id_task } = Req.params;
            await UpdateSchema.validate(Req.body);
            await UpdateSchemaParams.validate(id_task);
            const result = taskService.update(Req.body, id_task);

            if(Object.keys(result).length > 0){
                Res.json(result);
            }else{
                Res.json({error: "Task not found"});
                Res.status(404);
            }
        }catch(error){
            Res.json({error});
            Res.status(400)
        }
    }

    async delete(Req: Request, Res: Response){
         /* Validação manual // sem o yup
         const {id_task} = Req.params;

         if(id_task){
             const result = taskService.delete(id_task);
             Res.json(result);
         }else{
             Res.json({error: "id_task is required in params"});
             Res.json(401);
         }
         */

        /*Validação com o yup (arquivo TaskSchema)*/
        try{
            const {id_task} = Req.params;
            await DeleteSchema.validate(Req.params.id_task)

            if(id_task){
                const result = taskService.delete(id_task);
                Res.json(result);
            }else{
                Res.json({error: "id_task is required in params"});
                Res.json(401);
            }
        }catch(error){
            Res.json({error});
            Res.status(400)
        }
    }
}

export default TaskController;