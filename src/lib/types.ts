type conversation = {
    id: string;
    created: Date;
    name: string;
}


export type userDetails = {
    conversations: Array<conversation>;
    tier: string;
    paidUntil: Date;
    credits: number;
}