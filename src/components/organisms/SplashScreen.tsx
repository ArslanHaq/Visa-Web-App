import { useEffect } from 'react';
import anime from 'animejs'; // Import the 'anime' library

export default function SplashScreen({ finishLoading }: any) {
  useEffect(() => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });
    loader.add({
      targets: '#logo',
      delay: 0,
      scale: 3,
      duration: 2000,
      easing: 'easeInOutExpo',
    });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <img
        id="logo"
        src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
        alt="Logo"
        className="h-20 w-20"
      />
    </div>
  );
}
