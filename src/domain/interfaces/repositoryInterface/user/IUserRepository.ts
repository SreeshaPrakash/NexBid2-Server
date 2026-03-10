

import { User } from "../../../entities/User";

export interface IUserRepository {
     save(user: User) : Promise<User>
     findByEmail(email : string) : Promise<User | null>
     update(id : string, user : Partial<User>) : Promise<User>
     findById(id: string ) : Promise<User | null>

     findAll(
               filter: any,
               skip: number,
               limit: number,
               sort: any
          ): Promise<User[]>

     count(filter: any): Promise<number>
     
     // getUserStats(statsFilter: any): Promise<{
     //                               total: number;
     //                               active: number;
     //                               blocked: number;
     //                               clients: number;
     //                               freelancers: number;
     //                          }>
}
