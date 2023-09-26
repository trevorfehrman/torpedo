import { UserButton, auth } from '@clerk/nextjs';

import { BoardNameForm } from './(components)/board-name-form';
import { db } from '@/db';

export default async function Home() {
  const { userId } = auth();
  const boards = await db.query.boards.findMany({
    where: (boards, { eq }) => eq(boards.userId, userId!),
  });

  return (
    <main>
      <pre>{userId}</pre>
      <BoardNameForm />
      {boards.map(board => (
        <div key={board.id}>{board.boardName}</div>
      ))}
      <UserButton afterSignOutUrl='/' />
    </main>
  );
}
