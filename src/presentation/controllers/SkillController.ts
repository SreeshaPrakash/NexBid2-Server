import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { GetSkillsUsecase } from '../../application/usecases/skill/GetSkillsUsecase';

@injectable()
export class SkillController {
    constructor(
        @inject("IGetSkillsUsecase") private getSkillsUsecase: GetSkillsUsecase
    ) {}

    async getSkills(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query.q as string || '';
            const skills = await this.getSkillsUsecase.execute(query);
            res.status(200).json({ success: true, data: skills });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
