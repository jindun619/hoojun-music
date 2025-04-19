import Link from "next/link";
import { Music } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-base-100 shadow-md">
      <div className="navbar max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 로고 & 타이틀 */}
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Music className="w-6 h-6" />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight">
              music.hoojun.kim
            </span>
            <span className="text-sm text-base-content/60 -mt-1">
              내가 좋아하는 노래들
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex gap-2">
          <Link href="/" className="btn btn-ghost btn-sm text-base">
            Home
          </Link>
          <Link href="/about" className="btn btn-ghost btn-sm text-base">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
