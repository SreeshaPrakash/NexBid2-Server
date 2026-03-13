
export interface IBaseRepository<T> {
    create(entity : T) : Promise<T>
    findOne(filter ?: Partial<T>) : Promise<T | null>
    update(id: string, entity:Partial<T>) : Promise<T>
    findById(id : string) : Promise<T | null>
    findAll(
                   filter: any,
                   skip: number,
                   limit: number,
                   sort: any
              ): Promise<T[]>
    
         count(filter: any): Promise<number>

}