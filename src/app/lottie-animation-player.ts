import lottie from 'lottie-web';
import { AnimationItem } from 'lottie-web';
import { LottiePlayer } from 'ngx-lottie/lib/symbols';

// Export the player factory
export function playerFactory(): LottiePlayer {
  return lottie as unknown as LottiePlayer;
}
