import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
      <h1 className="text-xl font-bold tracking-wide text-blue-400">
        SpaceHindi 🚀
      </h1>

      <div className="flex gap-6 text-sm">
        <Link to="/" className="hover:text-blue-400">होम</Link>
        <Link to="/facts" className="hover:text-blue-400">फैक्ट्स</Link>
        <Link to="/about" className="hover:text-blue-400">हमारे बारे में</Link>
      </div>
    </nav>
  );
}
