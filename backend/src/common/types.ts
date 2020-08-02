import { Request } from 'express';

export interface UserProps {
    fullName: string;
    email: string;
    password: string;
    salt?: string;
    createdAt: string;
    uid: string;
}
export type NewUserProps = Omit<UserProps, 'uid' | 'salt' | 'createdAt'>;
export type UserAuthenticationProps = Pick<UserProps, 'email' | 'password'>;
export interface AuthenticatedRequest extends Request {
    user: UserProps;
}
export interface UserPropsWithAccessToken extends UserProps {
    token: string;
}
