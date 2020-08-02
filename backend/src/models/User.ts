import mongoose, { Schema, Document } from 'mongoose';

// const { Schema } = mongoose;

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    uid: string;
    salt: string;
    createdAt: string;
}

const UserSchema: Schema = new Schema(
    {
        uid: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model<IUser>('User', UserSchema);

export { User };
