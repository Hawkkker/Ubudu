import { IParticipation } from './IParticipation';

export interface IUser {
    _id: string;
    username: string;
    participation: IParticipation[];
    token: string;
}