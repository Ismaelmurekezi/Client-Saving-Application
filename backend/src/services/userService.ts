import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import type { RegisterDto, LoginDto, UserResponseDto } from '../dtos/userDto.js';

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

  async loginUser(loginData: LoginDto): Promise<{ token: string; user: UserResponseDto }> {
    const { email, password, deviceId } = loginData;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (deviceId && user.deviceId !== deviceId) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    if (user.status !== 'verified') {
      throw new Error('Device not yet verified. Please wait for admin approval.');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });

    const userResponse: UserResponseDto = {
      id: String(user._id),
      name: user.name,
      email: user.email,
      status: user.status,
      balance: user.balance,
      deviceId: user.deviceId,
    };

    return { token, user: userResponse };
  }

  async getVerificationStatus(deviceId: string): Promise<{ verified: boolean; message: string; status: string }> {
    const user = await User.findOne({ deviceId });
    if (!user) {
      throw new Error('Device not found');
    }

    const verified = user.status === 'verified';
    const message = verified
      ? 'Your device has been verified. You can now log in.'
      : 'Device verification is still pending. Please wait for admin approval.';

    return { verified, message, status: user.status };
  }
}

export const userService = new UserService();