import { BaseRepository } from './BaseRepository';
import { User } from '../../domain/entities/User';
import { userModel } from '../database/UserModel';
import { IUserRepository } from './../../domain/interfaces/repositoryInterface/user/IUserRepository';


export class UserRepository  extends BaseRepository<User>  implements IUserRepository  {

    constructor(){
        super(userModel)
    }
    protected toEntity(doc : any) : User {
        return {
            // id : doc._id.toString(),
              id : doc._id.toString(),
            name : doc.name,
            email : doc.email,
            password : doc.password,
            phone : doc.phone,
            roles : doc.roles,
            isEmailVerified : doc.isEmailVerified,
            isBlocked : doc.isBlocked,
            googleId : doc.googleId
        }
    }

    protected toDocument(entity : User) : Partial<User> {
        return {
            email : entity.email,
            name : entity.name,
            roles: entity.roles,
            isEmailVerified : entity.isEmailVerified,
            password : entity.password,
            phone : entity.phone,
            googleId : entity.googleId
        }
    }

    async save(user : User) : Promise<User>{
        return this.create(user)
    }

    async findByEmail(email : string) : Promise<User | null> {
        return this.findOne({email})
    }

    async update(id: string, user: Partial<User>): Promise<User> {
        return super.update(id, user)
    }

    async findById(id: string) : Promise<User | null>{
        return super.findById(id)
    }

}


