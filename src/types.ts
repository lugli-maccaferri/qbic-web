export interface User{
    is_admin: number,
    user_id: string,
    edit_fs: string,
    edit_others: number,
    username: string
}
export interface Server{
    owner: string,
    name: string,
    id: string
}