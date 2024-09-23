'use client';
import Link from 'next/link';
import Image from 'next/image';
import NavbarItem from '../atoms/NavbarItemComponent';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Colors, NavbarTitles, Pages } from '@/constants/constants';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getCountryOrigin } from '@/server/Signup';
import classNames from 'classnames';
import CrossSvg from '../atoms/Svg/Cross';
import { useAccessTokenMonitor } from '@/hooks/useAccessTokenMonitor';

interface Props {
  accessToken: any;
  responseStatus: any;
}
export default function NavbarComponent({ accessToken, responseStatus }: Props) {
  const { data: session, update } = useSession();
  const monitoredToken = useAccessTokenMonitor({ accessTokenCookie: accessToken, accessToken: session?.user.accessToken, update, session, responseStatus });
  const [coatSrc, setCoatSrc] = useState('')
  const [countryName, setCountryName] = useState('')
  const router = useRouter();
  const pathname = usePathname();
  const [pages, setPages] = useState<NavbarTitles>(NavbarTitles.INBOX);
  function changePage(value: NavbarTitles) {
    setPages(value);
  }
  useEffect(() => {
    if (pathname.includes('planning')) {
      setPages(NavbarTitles.PLANNING);
    } else if (pathname.includes('statistics')) {
      setPages(NavbarTitles.STATISTICS);
    } else if (pathname.includes('setting')) {
      setPages(NavbarTitles.SETTINGS);
    } else if (pathname.includes('contact')) {
      setPages(NavbarTitles.CONTACT);
    } else if (pathname.includes('signup')) {
      setPages(NavbarTitles.SIGNUPNOW);
    } else if (pathname.includes('signin')) {
      setPages(NavbarTitles.SIGNIN);
    } else if (pathname.includes('verification')) {
      setPages(NavbarTitles.VERIFICATION);
    } else if (pathname.includes('sentemail')) {
      setPages(NavbarTitles.SENTEMAIL);
    }
    else if (pathname.includes('admin')) {
      setPages(NavbarTitles.SENTEMAIL);
    }
    else {
      setPages(NavbarTitles.INBOX);
    }
  }, [pathname]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hiddenPaths = [
    Pages.TWOFACTORAUTH,
    Pages.LANDING,
    Pages.SIGNUP,
    Pages.SIGNIN,
  ];
  const shouldHideNavbar = hiddenPaths.some((path) => pathname.includes(path));

  const handleSignOut = async () => {
    setIsMobileMenuOpen(false)

    await signOut({ redirect: false }); // Prevent default redirect
    router.push(Pages.SIGNIN); // Redirect to the desired URL
  };

  const getCountryData = async () => {
    const response = await getCountryOrigin();
    if (response) {
      setCoatSrc(
        response.data?.coat
          ? String(response.data?.coat).replace('+html', '+xml')
          : ''
      )
      setCountryName(response.data?.countryFullName as string)
    }
  }

  useEffect(() => {
    getCountryData();
  }, [session]);
  return (
    <>

      <>
        {shouldHideNavbar ? (
          <></>
        ) : (
          <>
            <div className="flex items-center justify-between bg-transparent px-3 py-2 lg:justify-around lg:px-0">
              <div className={classNames("flex items-center justify-start ",
                {
                  'lg:-ml-36': !session?.user
                },
                {
                  'lg:-ml-16': session?.user
                }
              )}>
                <Image
                  src={coatSrc}
                  alt="Picture of the author"
                  width={90}
                  height={90}
                  quality={100}
                  style={{
                    maxWidth: '80px',
                    minWidth: '90px',
                    maxHeight: '90px',
                    minHeight: '90px',
                  }}
                />
                <div className='text-center'>
                  <p className="mx-2 font-serif text-xl font-bold text-logoColorBlue">
                    Online Visa System
                  </p>
                  <p className="mx-2 font-sans text-sm font-bold text-logoColorGreen italic">
                    {countryName}
                  </p>

                </div>
              </div>
              <div className="hidden items-center gap-x-20 lg:flex -ml-16">
                <NavbarItem
                  href={session?.user ? Pages.APPLICATIONDATA : Pages.SIGNIN}
                  label={NavbarTitles.INBOX}
                  active={pages === NavbarTitles.INBOX}
                  onClick={() => {
                    if (session?.user)
                      changePage(NavbarTitles.INBOX)
                  }
                  }
                  disabled={session?.user ? false : true}
                />
                <NavbarItem
                  href={session?.user ? Pages.STATISTICS : Pages.SIGNIN}
                  label={NavbarTitles.STATISTICS}
                  active={pages === NavbarTitles.STATISTICS}
                  onClick={() => {
                    if (session?.user)
                      changePage(NavbarTitles.STATISTICS)
                  }}
                  disabled={session?.user ? false : true}
                />{' '}
                <NavbarItem
                  href={session?.user ? Pages.SETTINGS : Pages.SIGNIN}
                  label={NavbarTitles.SETTINGS}
                  active={pages === NavbarTitles.SETTINGS}
                  onClick={() => { if (session?.user) changePage(NavbarTitles.SETTINGS) }}
                  disabled={session?.user ? false : true}

                />
                <NavbarItem
                  href={session?.user ? Pages.CONTACT : Pages.SIGNIN}
                  label={NavbarTitles.CONTACT}
                  active={pages === NavbarTitles.CONTACT}
                  onClick={() => { if (session?.user) changePage(NavbarTitles.CONTACT) }}
                  disabled={session?.user ? false : true}

                />
              </div>
              {session?.user ? (
                <>
                  <div
                    className="hidden cursor-pointer rounded-xl bg-logoColorGreen px-10 py-3 text-white hover:bg-logoColorGreen lg:block"
                    onClick={handleSignOut}
                  >
                    <button className="flex items-center text-sm">
                      <p>Logout</p>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href={Pages.SIGNUP}
                  className="hidden flex-col items-center justify-center lg:flex"
                  onClick={() => changePage(NavbarTitles.SIGNUPNOW)}
                >
                </Link>
              )}
              <div className="flex items-center lg:hidden">
                <button
                  className="text-logoColorBlue focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {isMobileMenuOpen && (
              <div className="absolute z-10 w-full bg-slate-100 py-4 text-base lg:hidden">
                <div className='font-bold absolute right-4 text-xl cursor-pointer' onClick={() => setIsMobileMenuOpen(false)}>
                  <CrossSvg color={Colors.PRIMARYBLUE} size={18} />
                </div>
                <div className="flex justify-center py-3 mt-5">
                  <NavbarItem
                    href={session?.user ? Pages.APPLICATIONDATA : Pages.SIGNIN}
                    label={NavbarTitles.INBOX}
                    active={pages === NavbarTitles.INBOX}
                    onClick={() => {
                      if (session?.user)
                        changePage(NavbarTitles.INBOX)

                      setIsMobileMenuOpen(false)
                    }
                    }
                  />
                </div>
                <div className="flex justify-center py-3">
                  <NavbarItem
                    href={session?.user ? Pages.STATISTICS : Pages.SIGNIN}
                    label={NavbarTitles.STATISTICS}
                    active={pages === NavbarTitles.STATISTICS}
                    onClick={() => {
                      if (session?.user)
                        changePage(NavbarTitles.STATISTICS)

                      setIsMobileMenuOpen(false)
                    }}
                  />{' '}
                </div>
                <div className="flex justify-center py-3">
                  <NavbarItem
                    href={session?.user ? Pages.SETTINGS : Pages.SIGNIN}
                    label={NavbarTitles.SETTINGS}
                    active={pages === NavbarTitles.SETTINGS}
                    onClick={() => {
                      if (session?.user) changePage(NavbarTitles.SETTINGS)

                      setIsMobileMenuOpen(false)
                    }}
                  />
                </div>
                <div className="flex justify-center py-3">
                  <NavbarItem
                    href={session?.user ? Pages.CONTACT : Pages.SIGNIN}
                    label={NavbarTitles.CONTACT}
                    active={pages === NavbarTitles.CONTACT}
                    onClick={() => {
                      if (session?.user) changePage(NavbarTitles.CONTACT)

                      setIsMobileMenuOpen(false)
                    }}
                  />
                </div>
                <div className="flex justify-center py-2">
                  {session ? (
                    <>
                      <button
                        className="flex cursor-pointer items-center rounded-md bg-logoColorBlue py-3 text-xs text-white hover:bg-logoColorGreen"
                        onClick={handleSignOut}
                      >
                        <span className={`mx-7 cursor-pointer`}>Logout</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      href={Pages.SIGNUP}
                      onClick={() => changePage(NavbarTitles.SIGNUPNOW)}
                    >
                      <div className="hidden cursor-pointer rounded-xl bg-logoColorBlue py-3 text-white hover:bg-logoColorGreen">
                        <button className="flex items-center text-xs">
                          <span className={`mx-7 cursor-pointer`}>
                            {NavbarTitles.SIGNUPNOW}
                          </span>
                        </button>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </>

    </>
  );
}
