export interface RegisterDto {
  name: string;
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

