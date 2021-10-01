import Link from "next/link";

export default function Header() {
  return (
    <div className="app-header">
      <Link href="/">Fruits & Vegetables</Link>
      <nav>
        <ul className="navbar">
          <li className="nav-item">
            <span className="nav-link">
              <Link href="/about">About Us</Link>
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              <Link href="/shop">Shop</Link>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
