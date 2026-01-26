export interface TPayment {
  id: string;
  user_id: string;
  event_id: string;
  isActive: false;
  created_at: string;
  amount: number;
  currency: string;
  paymentIntentId: null | string;
  status: string;
}
