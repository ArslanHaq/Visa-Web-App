import InboxComponent from '@/components/organisms/InboxComponent';
import { redirect } from 'next/navigation';

import { authOptions } from '@/utils/AuthOptions';
import { getServerSession } from 'next-auth/next';

import { cookies } from 'next/headers'

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (
    session?.user.roles.includes('TwoFactor') ||
    session?.user.accessToken === null
  ) {
    redirect('/landing');
  }
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const responseStatus = cookieStore.get('status')

  return (
    <div className="h-full">
      <InboxComponent accessToken={accessToken} responseStatus={responseStatus} />
    </div>
  );
}
