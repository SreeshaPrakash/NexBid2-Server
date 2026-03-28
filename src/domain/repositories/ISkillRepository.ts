import { Skill } from '../entities/Skill';

export interface ISkillRepository {
    search(query: string): Promise<Skill[]>;
    insertMany(skills: { name: string }[]): Promise<void>;
}
