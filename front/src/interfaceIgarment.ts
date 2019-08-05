export interface IGarment {
    _id: string;
    reference: string;
    description?: string;
    season: string;
    sizes: [{ name:string }],
    colors: [{ name:string }];
    users: [{ username:string }];
    images?: [string];
}