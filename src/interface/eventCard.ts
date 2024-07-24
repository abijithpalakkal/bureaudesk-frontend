 export interface IEvents {
    _id?: string;
    eventName?: string;
    eventCategory?: string;
    priority?: string;
    eventDate?: string;
    eventEndDate?: string;
    eventEndTime?: string;
    eventTime?: string;
    eventDescription?: string;
    companyid?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface IEventProp {
    events?: IEvents[]
    refresh?: any
    val?: Boolean
}