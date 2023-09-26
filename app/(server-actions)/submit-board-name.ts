'use server';

import { db } from '@/db';
import { boards } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function submitBoardName(prevState: any, formData: FormData) {
  const { userId } = auth();
  const addBoardSchema = z.object({
    boardName: z.string(),
    userId: z.string(),
  });

  const parsedData = addBoardSchema.parse({
    boardName: formData.get('boardName'),
    userId,
  });

  try {
    console.log('parsed data', parsedData);
    await db.insert(boards).values({
      boardName: parsedData.boardName,
      userId: parsedData.userId,
    });

    revalidatePath('/');
    return { message: `Added board: ${parsedData.boardName} for user: ${parsedData.userId}` };
  } catch (e) {
    return { message: 'Failed to created board' };
  }
}
