
export interface TaskData {
  phoneNumber: string;
  orderType: string;
  productPrice: number;
  taskNumber: number; // 1 to 5
  commissionRate: number; // 20, 30, 40, 50
}

export interface GeneratedTask extends TaskData {
  id: string;
  commission: string;
  profit: number;
}
