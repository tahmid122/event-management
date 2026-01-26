export interface TEvent {
  id?: string;
  name: string;
  date_time: string;
  location: string;
  people_capacity: number;
  joining_fee: number;
  managerId?: string;
  category?: null | string;
  description?: null;
  image?: null;
  status?: string;
  hostId?: string;
}
