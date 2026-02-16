

import { CreateFreelancerProfileDTO } from '../../../../application/dto/freelancer.dto';
import { Freelancer } from './../../../entities/Freelancer';

export interface ICreateFreelancerProfileUsecase {
    execute (userId: string, data: CreateFreelancerProfileDTO) : Promise<Freelancer>
}



