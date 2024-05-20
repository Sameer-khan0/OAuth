'use client';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  console.log(session);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    signIn();
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full max-w-md">
        <div className="relative w-[300px] h-[300px] mb-4">
          <Image 
            src={session?.user?.image || '/default-avatar.png'}
            alt="User Image"
            className="rounded-full"
            width={300}
            height={300}
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Welcome, {session?.user?.name}!</h1>
        <p className="text-gray-600">{session?.user?.email}</p>
        <button 
          onClick={() => signOut('google')} 
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
