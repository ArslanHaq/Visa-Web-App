'use client';
import Link from 'next/link';
import Image from 'next/image';
import NavbarItem from '../atoms/NavbarItemComponent';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NavbarTitles, Pages } from '@/constants/constants';

export default function NavbarComponent() {
  const logo = '/logo.png';
  const pathname = usePathname();
  const [pages, setPages] = useState<NavbarTitles>(NavbarTitles.HOME);
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
    } else {
      setPages(NavbarTitles.HOME);
    }
  }, [pathname]);
  return (
    <div className="flex items-center justify-around bg-slate-100 py-5">
      <div className="flex items-center justify-start">
        <Image
          src={logo}
          alt="Picture of the author"
          width={50}
          height={50}
          quality={100}
        />
        <p className="mx-2 font-serif text-base font-bold text-logoColorBlue">
          Visa App
        </p>
      </div>
      <div className="flex items-center gap-x-20">
        <NavbarItem
          href={Pages.HOME}
          label={NavbarTitles.HOME}
          active={pages === NavbarTitles.HOME}
          onClick={() => changePage(NavbarTitles.HOME)}
        />
        <NavbarItem
          href={Pages.PLANNING}
          label={NavbarTitles.PLANNING}
          active={pages === NavbarTitles.PLANNING}
          onClick={() => changePage(NavbarTitles.PLANNING)}
        />{' '}
        <NavbarItem
          href={Pages.STATISTICS}
          label={NavbarTitles.STATISTICS}
          active={pages === NavbarTitles.STATISTICS}
          onClick={() => changePage(NavbarTitles.STATISTICS)}
        />{' '}
        <NavbarItem
          href={Pages.SETTINGS}
          label={NavbarTitles.SETTINGS}
          active={pages === NavbarTitles.SETTINGS}
          onClick={() => changePage(NavbarTitles.SETTINGS)}
        />
        <NavbarItem
          href={Pages.CONTACT}
          label={NavbarTitles.CONTACT}
          active={pages === NavbarTitles.CONTACT}
          onClick={() => changePage(NavbarTitles.CONTACT)}
        />
      </div>

      <Link
        href={Pages.SIGNUP}
        className="flex flex-col items-center justify-center"
        onClick={() => changePage(NavbarTitles.SIGNUPNOW)}
      >
        <div className="cursor-pointer rounded-xl bg-logoColorBlue py-3 text-white hover:bg-logoColorGreen">
          <button className="flex items-center text-sm">
            <span className={`mx-7 cursor-pointer`}>
              {NavbarTitles.SIGNUPNOW}
            </span>
          </button>
        </div>
      </Link>
    </div>
  );
}
