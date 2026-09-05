import { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ value, onChange, readOnly = false, size = 22 }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          disabled={readOnly}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => !readOnly && setHover(n)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={`transition-transform ${!readOnly ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
          aria-label={`${n} star`}
        >
          <Star
            size={size}
            className={(hover || value) >= n ? 'fill-secondary text-secondary' : 'fill-transparent text-primary-200'}
          />
        </button>
      ))}
    </div>
  );
}
