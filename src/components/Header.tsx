import Link from "next/link";
import { Home, Info, Music } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-base-100 shadow-md">
      <div className="navbar max-w-6xl mx-auto px-4 py-3">
        {/* 왼쪽: 로고 & 타이틀 */}
        <div className="flex-1">
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
        </div>

        {/* 오른쪽: 네비게이션 메뉴 */}
        <div className="flex-none">
          {/* 모바일용 드롭다운 */}
          <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-xl w-44"
            >
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary hover:text-primary-content transition-colors duration-200"
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary hover:text-primary-content transition-colors duration-200"
                >
                  <Info className="w-4 h-4" />
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* 데스크탑용 메뉴 */}
          <nav className="hidden md:flex gap-2">
            <Link href="/" className="btn btn-ghost btn-sm text-base">
              Home
            </Link>
            <Link href="/about" className="btn btn-ghost btn-sm text-base">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
