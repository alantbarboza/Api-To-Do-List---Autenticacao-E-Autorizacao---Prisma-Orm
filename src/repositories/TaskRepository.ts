//repositories: interagem com o banco de dados para salvar ou recuperar dados.
//repository -> model
import { ITask } from "../models/Task";

class TaskRepository {
    private tasks: ITask[];

    constructor(){
        this.tasks = [];
    }

    get(): ITask[]{
        return this.tasks;
    }

    add(data: ITask): ITask{
        this.tasks.push(data);
        return data;
    }

    update(data: ITask, position: number){
        this.tasks[position] = data;
        return data;
    }

    delete(position: number){
        delete this.tasks[position];
        return position;
    }
}

export default TaskRepository;