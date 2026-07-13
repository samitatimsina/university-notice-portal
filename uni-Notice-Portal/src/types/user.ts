export interface UserProfile{
    user_id:number;
    name:string;
    email:string;
    role:string;
    faculty:string;
    profile_image?: string | null;
    academic_level:string;
    created_at:string;
}