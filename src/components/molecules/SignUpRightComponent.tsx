/* eslint-disable prettier/prettier */
'use client'
import { OriginDto } from '@/dto/Signup.dto';
import BgTextureIcon from '../atoms/Svg/BgTextureIcon';
import Image from 'next/image';
import PlaneIcon from '../atoms/Svg/PlaneIcon';
import { useEffect, useState } from 'react';

interface Props {
  origin: OriginDto;
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function SignUpRightComponent({ origin }: Props) {
  const flagSrc = origin.data?.flag
    ? String(origin.data?.flag).replace('+html', '+xml')
    : '';
  const coatSrc = origin.data?.coat
    ? String(origin.data?.coat).replace('+html', '+xml')
    : '';
  const [imageSize, setImageSize] = useState({ width: 300, height: 300 });

  // Adjust the image size based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Set larger size for md screens and up
        setImageSize({ width: 300, height: 300 });
      } else {
        // Default size for small screens
        setImageSize({ width: 200, height: 200 });
      }
    };

    // Initial check
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <div className="absolute z-0">
        <BgTextureIcon />
      </div>
      <div className="">
        <div>
          {flagSrc ? (
            <Image
              src={coatSrc}
              alt="Picture of the author"
              width={350}
              height={350}
              quality={500}
              className="rounded-xl"
              style={{
                maxWidth: `${imageSize.width}px`,
                minWidth: `${imageSize.width}px`,
                maxHeight: `${imageSize.height}px`,
                minHeight: `${imageSize.height}px`,
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.9))', // Drop shadow
              }}
            />
          ) : (
            <PlaneIcon width={imageSize.width} height={imageSize.height} />
          )}
        </div>
      </div>
      <div className="lg:ml-[-30px] mt-28 flex items-center space-x-6">
        {coatSrc && (
          <Image
            src={flagSrc}
            alt="Picture of the author"
            width={110}
            height={110}
            quality={100}
            style={{
              maxWidth: '150px',
              minWidth: '150px',
              maxHeight: '100px',
              minHeight: '100px',

            }}
          />
        )}
        <p className="mt-4 font-serif text-lg lg:text-2xl font-extrabold text-white">
          {origin.data?.countryFullName}
        </p>
      </div>
    </>
  );
}
