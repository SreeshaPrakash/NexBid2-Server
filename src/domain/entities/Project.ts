export type ProjectStatus  = 'open' | 'bidding_closed' | 'in_progress' | 'completed'

export interface Projects {
        id : string
        clientId : string
        title : string
        description : string
        budget : number
        deadline : Date
        attachments ?: string[]
        status : string
        isPublic : boolean  //for privating after bid closes   //doubt
        createdAt : Date
        updatedAt : Date


}