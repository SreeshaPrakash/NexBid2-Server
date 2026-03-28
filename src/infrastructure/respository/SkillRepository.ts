import { injectable } from 'tsyringe';
import { ISkillRepository } from '../../domain/repositories/ISkillRepository';
import { SkillModel } from '../database/SkillModel';
import { Skill } from '../../domain/entities/Skill';

@injectable()
export class SkillRepository implements ISkillRepository {
    async search(query: string): Promise<Skill[]> {
        const skills = await SkillModel.find({
            name: { $regex: query, $options: 'i' }
        }).limit(50).lean().exec();

        const lowerQuery = query.toLowerCase();

        // Sort: items starting with the query come first. Alphabetical otherwise.
        skills.sort((a, b) => {
            const aStarts = a.name.toLowerCase().startsWith(lowerQuery);
            const bStarts = b.name.toLowerCase().startsWith(lowerQuery);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return a.name.localeCompare(b.name);
        });

        return skills.slice(0, 20).map(s => ({
            id: s._id.toString(),
            name: s.name
        }));
    }

    async insertMany(skills: { name: string }[]): Promise<void> {
        await SkillModel.insertMany(skills);
    }
}
