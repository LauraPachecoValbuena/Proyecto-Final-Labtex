export interface IGarment {
  _id: string;
  reference: string;
  description?: string;
  season: string;
  sizes: string[];
  colors: string[];
  users: string[];
  images?: string[];
}
