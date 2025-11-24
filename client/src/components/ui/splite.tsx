'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  eager?: boolean // Load immediately for above-fold content
}

export function SplineScene({ scene, className, eager = false }: SplineSceneProps) {
  const [elementRef, isVisible] = useIntersectionObserver({
    threshold: 0,
    rootMargin: '500px', // Start loading 500px before entering viewport
    freezeOnceVisible: true
  });

  const [shouldLoad, setShouldLoad] = useState(eager);

  useEffect(() => {
    if (isVisible || eager) {
      setShouldLoad(true);
    }
  }, [isVisible, eager]);

  return (
    <div ref={elementRef} className={className}>
      {shouldLoad ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-black/20">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <Spline
            scene={scene}
            className="w-full h-full"
          />
        </Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-black/20">
          <div className="text-cyan-400 text-sm font-mono">Loading 3D Scene...</div>
        </div>
      )}
    </div>
  )
}
