import { PrismaClient } from '@prisma/client';
import { CreateUser, LoginUser } from '../types';
import HttpStatus from 'http-status';
import { comparePassword, hashPassword } from '../utils';
import { signJWT } from '../utils/jsonwebtoken';
import ApiError from '../utils/apiError';


const prisma = new PrismaClient();


export const closePrismaClient = async () => {
    await prisma.$disconnect();
};


export const createUser = async (payload: CreateUser) => {
    const { email, userName, password } = payload;
  
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);
  
    // If email doesn't exist, create a new user
    return prisma.user.create({
      data: {
        email,
        userName,
        password: hashedPassword,
      },
    });
};


export const loginUser = async (payload: LoginUser) => {
    try {
      const { email, password } = payload;
  
      // Check if the user with the given email exists
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
  
      if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');

      }
  
      // Check if the provided password matches the hashed password in the database
      const passwordMatch = await comparePassword(password, user.password);
  
      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }
  
      // User authenticated, generate and return a JWT token
      const token = await signJWT({ email: user.email, _id: user.id });
      
      return { user, token };
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Internal Server Error');
    } finally {
        await closePrismaClient();
      }
};


export const getUserById = async (userId: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      return user;
    } catch (error: any) {
      console.error('Error:', error.message);
      throw new Error('Internal Server Error');
    } finally {
      await prisma.$disconnect(); // Close the Prisma client
    }
  };
  