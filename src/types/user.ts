export interface TUser {
  name: string;
  email: string;
  emailVerified: boolean;
  image: null | string;
  createdAt: string;
  updatedAt: string;
  role: string;
  attendingEventId: null | string;
  stripeCustomerId: null | string;
  id: string;
}
