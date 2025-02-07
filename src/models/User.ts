export interface User {
    id_user: string;
    name: string;
    email: string;
    phone?: string | null;
    password: string;
    user_group: number;
}
