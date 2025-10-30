import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import type { RegisterDto, UserResponseDto } from '../dtos/userDto.js';

export class UserService {
  async registerUser(registerData: RegisterDto): Promise<UserResponseDto> {
    const { name, email, password } = registerData;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Generate unique deviceId
    const deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      deviceId,
      status: 'pendingVerification'
    });

    await user.save();

    // Return user response DTO
    return {
      id: String(user._id),
      name: user.name,
      email: user.email,
      status: user.status,
      balance: user.balance,
      deviceId: user.deviceId
    };
  }
}

export const userService = new UserService();