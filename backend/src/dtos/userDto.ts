export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  deviceId?: string;
}

export interface LoginDto {
  email: string;
  password: string;
  deviceId?: string;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  status: string;
  balance: number;
  deviceId?: string;
}

export interface TransactionDto {
  amount: number;
}

export interface TransactionResponseDto {
  id: string;
  type: string;
  amount: number;
  balanceAfter: number;
  createdAt: Date;
}
