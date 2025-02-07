//Validações com o yup
//o squema é o model(definem a estrutura dos dados a serem guardados) do prisma.

import {object, string} from 'yup';

//status: é um dado do tipo STRING, obrigatório.
//isvalid é o nome do teste // mensagem que irá retornar
//verifica se status é in_progress ou completed
export const GetSchema = object().shape({
    status: string()
               .required() 
               .test('isValid', (status) => {
        if(status === 'in_progress' || status === "completed"){
            return true;
        }else{
            return false;
        }
    })
});

export const GetByIdSchema = object().shape({
    //uuid: um id único universal
    id_task: string().required().uuid()
});

export const AddSchema = object().shape({
    //caso não informe a descrição, irá aparecer error: 'descrição é obrigatório'
    descricao: string().required('descrição é obrigatório'),
    data: string().required(),
    status: string().required().test('addIsValid', (status) => {
        if(status === 'completed' || status === 'in_progress'){
            return true;
        }else{
            return false;
        }
    })
});

export const UpdateSchema = object().shape({
    id: string().required(),
    descricao: string().required(),
    data: string().required(),
    status: string().required().test('addIsValid', (status) => {
        if(status === 'completed' || status === 'in_progress'){
            return true;
        }else{
            return false;
        }
    })
});

export const UpdateSchemaParams = string().required();

export const DeleteSchema = string().required().uuid(); 
