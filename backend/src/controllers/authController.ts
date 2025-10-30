import type { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { userService } from '../services/userService.js';
import type { RegisterDto, LoginDto } from '../dtos/userDto.js';


export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const registerData: RegisterDto = req.body;
    const user = await userService.registerUser(registerData);

    res.status(201).json({
      message: 'Registration successful. Please wait for device verification.',
      user
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    const status = message === 'Email already registered' ? 400 : 500;
    res.status(status).json({ message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const loginData: LoginDto = req.body;
    const { token, user } = await userService.loginUser(loginData);

    res.json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    const status = message === 'Invalid credentials' ? 400 : 
                   message.includes('not yet verified') ? 403 : 500;
    res.status(status).json({ message });
  }
};

export const getVerificationStatus = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.params;
    if (!deviceId) {
      return res.status(400).json({ message: 'Device ID is required' });
    }
    const result = await userService.getVerificationStatus(deviceId);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    const status = message === 'Device not found' ? 404 : 500;
    res.status(status).json({ message });
  }
};