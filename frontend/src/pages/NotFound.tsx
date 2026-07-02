import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-[60vh] animate-fade-in">
      <div className="bento-box text-center py-16 px-12">
        <h1 className="text-[6rem] font-bold brand-font">404</h1>
        <h2 className="text-2xl font-bold mb-4 brand-font">Signal Lost.</h2>
        <p className="text-secondary mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-primary text-bg font-semibold brand-font"
        >
          Return to INIT →
        </Link>
      </div>
    </div>
  );
}
