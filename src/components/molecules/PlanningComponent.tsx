import { ApiResponse } from '@/dto/SignIn.dto';
import { authOptions } from '@/utils/AuthOptions';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default async function PlanningComponent() {
  return (
    <div>
      <h1></h1>
    </div>
  );
}
