import { useState } from 'react';
import { ImageOff } from 'lucide-react';

/**
 * Renders an <img> with a graceful branded placeholder when `src` is empty,
 * still loading, or fails to load — instead of the browser's broken-image icon.
 */
export default function ImageWithFallback({ src, alt = '', className = '', iconSize = 28 }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`bg-gradient-to-br from-primary-100 to-accent flex items-center justify-center ${className}`}>
        <ImageOff size={iconSize} className="text-primary/30" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
