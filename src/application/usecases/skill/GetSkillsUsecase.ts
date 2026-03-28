import { inject, injectable } from 'tsyringe';
import { ISkillRepository } from '../../../domain/repositories/ISkillRepository';
import { Skill } from '../../../domain/entities/Skill';

@injectable()
export class GetSkillsUsecase {
    constructor(
        @inject("ISkillRepository") private skillRepository: ISkillRepository
    ) {}

    async execute(query: string): Promise<Skill[]> {
        if (!query) return [];
        return await this.skillRepository.search(query);
    }
}


