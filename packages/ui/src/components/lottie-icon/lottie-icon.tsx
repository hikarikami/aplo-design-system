import * as React from 'react'
import Lottie from 'lottie-react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { cn } from '../../lib/utils'

export interface LottieIconProps {
  /** Lottie animation data object (JSON-based) */
  animationData?: object
  /** URL to a .lottie binary file */
  src?: string
  /** Playback speed multiplier (1 = normal, 0.5 = half speed) */
  speed?: number
  /** Rendered size in px (both width and height) */
  size?: number
  className?: string
  loop?: boolean
  autoplay?: boolean
}

const LottieIcon = React.forwardRef<HTMLDivElement, LottieIconProps>(
  ({ animationData, src, speed = 1, size = 80, className, loop = true, autoplay = true }, ref) => {
    return (
      <div ref={ref} className={cn('shrink-0', className)} style={{ width: size, height: size }}>
        {src ? (
          <DotLottieReact
            src={src}
            loop={loop}
            autoplay={autoplay}
            speed={speed}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Lottie
            animationData={animationData}
            loop={loop}
            autoplay={autoplay}
            style={{ width: '100%', height: '100%' }}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
          />
        )}
      </div>
    )
  },
)

LottieIcon.displayName = 'LottieIcon'

export { LottieIcon }
