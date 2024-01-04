import { PrismaClient } from '@prisma/client';
import HttpStatus from 'http-status';
import ApiError from '../utils/apiError';
import { CreateItem } from '../types';

const prisma = new PrismaClient();

export const closePrismaClient = async () => {
  await prisma.$disconnect();
};


export const createItem = async (payload: CreateItem) => {
  try {
    const { userId, title } = payload;
    // Check if the user with the given userId exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        items: true, // Include the user's items in the query result
      },
    });

    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }

    // Create a new item associated with the user
    const newItem = await prisma.item.create({
      data: {
        title,
        userId,
      },
    });

    // Update the user's items array with the new item
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        items: {
            // Use the correct type for the items array
            connect: [...user.items.map((item) => ({ id: item.id })), { id: newItem.id }],
          },
      },
    });

    return newItem;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Internal Server Error');
  } finally {
    await closePrismaClient();
  }
};


export const getItemsByUserId = async (userId: string) => {
  try {
    // Check if the user with the given userId exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }

    // Get all items associated with the user
    return prisma.item.findMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Internal Server Error');
  } finally {
    await closePrismaClient();
  }
};

export const getItemByUserId = async (userId: string, itemId: string) => {
    try {
      // Check if the user with the given userId exists
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
  
      if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
      }
  
      // Get all items associated with the user
      return prisma.item.findFirst({
        where: {
            id: itemId,
        },
      });
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Internal Server Error');
    } finally {
      await closePrismaClient();
    }
  };

export const updateItem = async (itemId: string, payload: CreateItem) => {
  try {
    // Update the item with the given itemId
    return prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        ...payload,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Internal Server Error');
  } finally {
    await closePrismaClient();
  }
};

export const deleteItem = async (itemId: string) => {
  try {
    // Delete the item with the given itemId
    return prisma.item.delete({
      where: {
        id: itemId,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Internal Server Error');
  } finally {
    await closePrismaClient();
  }
};
