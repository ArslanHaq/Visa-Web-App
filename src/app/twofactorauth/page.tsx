import TwoFactorAuthComponent from '@/components/organisms/TwoFactorAuthComponent';
import { cookies } from 'next/headers'

export default function TwoFactorAuthPage() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
  const responseStatus = cookieStore.get('status')
  return (
    <div>
      <TwoFactorAuthComponent accessToken={accessToken} responseStatus={responseStatus} />
    </div>
  );
}
