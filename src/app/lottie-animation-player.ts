import lottie from 'lottie-web';
import { AnimationItem } from 'lottie-web';

// Define the LottiePlayer interface
export interface LottiePlayer {
  loadAnimation: (params: {
    container: HTMLElement;
    renderer?: string;
    loop?: boolean;
    autoplay?: boolean;
    animationData?: any;
    path?: string;
    rendererSettings?: any;
  }) => AnimationItem;
  destroy: (name?: string) => void;
  setLocationHref: (href: string) => void;
  setQuality: (quality: string | number) => void;
  setSpeed: (speed: number) => void;
  play: (name?: string) => void;
  pause: (name?: string) => void;
  stop: (name?: string) => void;
  registerAnimation: (element: HTMLElement, animationData?: any) => void;
  searchAnimations: (animationData?: any, standalone?: boolean, renderer?: string) => void;
}

// Export the player factory
export function playerFactory(): LottiePlayer {
  return lottie as unknown as LottiePlayer;
}
