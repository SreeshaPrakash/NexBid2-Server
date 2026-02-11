
import { Model } from "mongoose";
import { IBaseRepository } from "../../domain/interfaces/repositoryInterface/IBaseRepository";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
    constructor(protected model : Model<any>) {}

    protected abstract toEntity(doc: any) : T;
    protected abstract toDocument(entity: T) : Partial<T>

    async create(entity: T) : Promise<T> {
        const doc = this.toDocument(entity)
        const createDoc = await this.model.create(doc)
        return this.toEntity(createDoc)
    }

    async findOne(filter: Partial<T>) : Promise<T | null> {
        const doc = await this.model.findOne(filter)
        return doc ? this.toEntity(doc) : null

    }

    async update(id:string, entity : Partial<T>) : Promise<T> {
        const doc = this.toDocument(entity as T)
        const updatedDoc = await this.model.findByIdAndUpdate( 
            id, doc, {new: true}
        )
        if(!updatedDoc) throw new Error('Document not found')
            return this.toEntity(updatedDoc)
    }

    async findById(id : string) : Promise<T | null> {
        const doc =await this.model.findById(id)
        if(!doc) return null
        return this.toEntity(doc)
    }

    
}