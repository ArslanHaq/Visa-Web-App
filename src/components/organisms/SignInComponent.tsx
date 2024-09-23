import PlaneIcon from '../atoms/Svg/PlaneIcon';
import Image from 'next/image';
import BgTextureIcon from '../atoms/Svg/BgTextureIcon';
import SignInLeftContainerComponent from '../molecules/SignInLeftContainerComponent';

export default function SignInComponent() {
  const imageSrc = '/logo.png';
  return (
    <div className="flex w-full items-center">
      <div className="w-1/2">
        <SignInLeftContainerComponent />
      </div>
      <div className="relative flex h-svh w-1/2 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-logoColorGreen to-logoColorBlue">
        <div className="absolute z-0">
          <BgTextureIcon />
        </div>
        <div className="-rotate-12 transform">
          <PlaneIcon width={300} height={400} />
        </div>
        <div className="flex items-center space-x-3">
          <Image
            src={imageSrc}
            alt="Picture of the author"
            width={50}
            height={50}
            quality={100}
          />

          <p className="text-5xl font-extrabold text-white">VISA</p>
        </div>
      </div>
    </div>
  );
}
