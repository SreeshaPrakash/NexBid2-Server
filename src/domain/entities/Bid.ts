



export interface Bid {
    id : string
    projectId : string
    freelancerid : string
    finalBudget : string
    DeliveryTime : string  
    message : string 
    status : 'active' | 'withdrawn' | 'accepted' | 'rejected'  //withdraw - removed
    createdAt : Date
    updatedAt : Date
}



