import {Permission} from '../models/Permission';
class PermissionRepository{
    private permissions: Permission[];
    constructor(){
        this.permissions = [
            {id: 1, user_group: 1, domain: 'project', 
                 permissions: ['getAll', 'getById', 'add', 'update', 'delete']},
            {id: 2, user_group: 2, domain: 'project', 
                permissions: ['getAll', 'getById', 'add', 'update']},
        ]
    }

    getAll(){
        return this.permissions;
    }

    getPermissions(user_group: number, domain: string){
        let result = {};
        this.permissions.map((item) => {
            if(item.user_group === user_group && item.domain === domain){
                result = item;
            }
        })
        return result;
    }
}

export default PermissionRepository;



