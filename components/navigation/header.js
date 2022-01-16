import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Header = () => {
  const [small, setSmall] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        setSmall(window.pageYOffset > 200);
      });
    }
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light fixed-top py-3 ${
        small ? 'navbar-shrink' : ''
      }`}
      id="mainNav"
    >
      <div className="container px-4 px-lg-5">
        <Link href="/">
          <a className="navbar-brand">The Smelly Cats</a>
        </Link>
        <button className="navbar-toggler navbar-toggler-right">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto my-2 my-lg-0">
            <li className="nav-item">
              <Link href="/shows">
                <a className="nav-link">Shows</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact">
                <a className="nav-link">Contact</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/users/sign_in">
                <a className="nav-link">Sign In</a>
              </Link>
            </li>

            <>
              <li className="nav-item">
                <Link href="/users/dashboard">
                  <a className="nav-link">Dashboard</a>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => alert('Sign Out')}>
                  Sign Out
                </a>
              </li>
            </>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
