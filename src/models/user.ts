export interface User{
    _id: number
    data: UserData
}

export interface UserData{
    _id: string
    profile_url: string
    username: string
    firstname: string
    lastname: string
    full_name: string
    course_name: string 
}