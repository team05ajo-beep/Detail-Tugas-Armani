
export interface TaskData {
  phoneNumber: string;
  orderType: string;
  productPrice: number;
}

export interface GeneratedTask extends TaskData {
  id: string;
  timestamp: string;
  profit: number;
  commission: string;
  validUntil: string;
}
