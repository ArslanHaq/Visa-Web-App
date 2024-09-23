'use client';
import { useSession } from 'next-auth/react';

export default function LayoutComponent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session } = useSession();

  return (
    <div>

    </div>
  );
}
