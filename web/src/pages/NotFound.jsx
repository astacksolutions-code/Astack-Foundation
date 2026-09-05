import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <span className="font-mono text-secondary text-sm tracking-widest">404</span>
      <h1 className="text-3xl font-bold text-primary mt-3">Page not found</h1>
      <p className="text-primary/60 mt-2 max-w-sm">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary mt-6">Back to Home</Link>
    </div>
  );
}
