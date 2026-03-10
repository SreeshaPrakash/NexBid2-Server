



export interface Bid {
    id : string
    projectId : string
    freelancerid : string
    finalBudget : number
    DeliveryTime : number //number of days or hrs  //doubt number or string
    message : string 
    status : 'active' | 'withdrawn' | 'accepted' | 'rejected'  //doubt withdrawn option veno
    createdAt : Date
    updatedAt : Date
}



