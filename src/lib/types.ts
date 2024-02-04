type conversation = {
    id: string;
    created: Date;
    name: string;
    model: string;
}


export type userDetails = {
    conversations: Array<conversation>;
    tier: string;
    paidUntil: Date;
    credits: number;
}

export type assistant = {
    id: string;
    name: string;
}