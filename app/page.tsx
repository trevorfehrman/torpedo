import { db } from '@/db';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  console.log(db);
  return (
    <main>
      <UserButton afterSignOutUrl='/' />
    </main>
  );
}
