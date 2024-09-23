import Link from 'next/link';
import React from 'react';

interface NavbarItemProps {
  href: string;
  //   icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  href,
  //   icon,
  label,
  active,
  onClick,
}) => {
  return (
    <Link
      href={href}
      className="flex flex-col justify-center"
      onClick={onClick}
    >
      {/* {icon} */}
      <span
        className={`cursor-pointer text-xs text-logoColorBlue hover:text-logoColorGreen lg:text-base ${active ? 'underline decoration-logoColorGreen decoration-2 underline-offset-8' : ''}`}
      >
        {label}
      </span>
    </Link>
  );
};

export default NavbarItem;
