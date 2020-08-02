import * as argon2 from 'argon2';
import crypto from 'crypto';
import { v1 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';

import ErrorWithStatus from '../utils/errorWithStatus';

import config from '../config';
import { UserProps, UserAuthenticationProps, UserPropsWithAccessToken } from '../common/types';

import { User } from '../models/User';

export class AuthService {
    public async getUserInfo({
        uid,
    }: {
        uid: string;
    }): Promise<{
        success: boolean;
        user?: UserProps;
    }> {
        const userInfo = await User.findOne({ uid });
        if (!userInfo) {
            throw new ErrorWithStatus(401, 'Cannot get user info.');
        } else {
            return userInfo.toObject();
        }
    }
    public async register({
        fullName,
        email,
        password,
    }: {
        fullName: string;
        email: string;
        password: string;
    }): Promise<UserProps> {
        const doesUserExist = await User.findOne({ email }).exec();
        if (doesUserExist && doesUserExist.email === email) throw new ErrorWithStatus(409, 'Email already taken!');
        const salt = this.generateSalt();
        const passwordHashed = await argon2.hash(salt + password);
        const NewUser = new User();
        NewUser.fullName = fullName.trim();
        NewUser.email = email.trim();
        NewUser.password = passwordHashed;
        NewUser.uid = uuid();
        NewUser.salt = salt;
        const user = await NewUser.save();
        return user;
    }
    public async login(user: UserAuthenticationProps): Promise<UserPropsWithAccessToken> {
        const { email, password } = user;
        const userByEmail = await User.findOne({ email }).exec();
        if (!(userByEmail && userByEmail.email)) throw new ErrorWithStatus(401, `Username/Password incorrect`);
        const isAuthenticated = await argon2.verify(userByEmail.password, userByEmail.salt + password);
        if (!isAuthenticated) throw new ErrorWithStatus(401, `Please validate your password!`);
        const token = jwt.sign({ user: userByEmail }, config.ACCESS_TOKEN_SECRET);
        return {
            ...userByEmail.toObject(),
            token,
        };
    }
    generateSalt(): string {
        return crypto.randomBytes(16).toString('hex');
    }
}
