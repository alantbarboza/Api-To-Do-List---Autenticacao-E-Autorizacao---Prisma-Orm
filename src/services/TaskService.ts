//service: processa regras de negócios e executa ações (ex: calcular, enviar e-mail).
//service -> repository -> model
import TaskRepository from "../repositories/TaskRepository"
import { ITask } from "../models/Task";

const taskRepository = new TaskRepository();

class TaskService {
    constructor(){

    }

    get(status: string): ITask[]{
        const result = taskRepository.get();
        const tasks: ITask[] = [];

        result.map((obj) => {
            if(obj.status === status){
                tasks.push(obj);
            }
        })
        return tasks;
    }

    getById(id_task: string): ITask | {} {
        const result = taskRepository.get();
        let task = {};
        result.map((obj) => {
            if(obj.id === id_task){
                task = obj;
            }
        });
        return task;
    }

    getIndexById(id_task: string): number {
        const result = taskRepository.get();
        let position: number  = 99999;

        result.map((obj, index) => {
            if(obj.id === id_task){
                position = index;
            }
        })

        return position;
    }

    add(data: ITask): ITask | { error: string } {
        const existingTask = taskRepository.get().some(task => task.id === data.id);
        if (existingTask) {
            return { error: "Task with this ID already exists" }; 
        }
        return taskRepository.add(data); 
    }    

    update(data: ITask, id_task: string){
        if (data.id !== id_task) {
            return { error: "Cannot update the task ID" }; 
        }

        const position = this.getIndexById(id_task);
        if(position !== 99999){
            return  taskRepository.update(data, position);
        }else{
            return {};
        }
    }

    delete(id_task: string){
        const position = this.getIndexById(id_task);
        if(position !== 99999){
            return  taskRepository.delete(position);
        }else{
            return {};
        }
    }
}

export default TaskService;