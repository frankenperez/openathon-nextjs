import Link from "next/link";

export default function Header() {
  return (
    <header className="header__container">
      <Link href="/">
        <a className="header__logo">Fruits & Veggies</a>
      </Link>
      <nav>
        <ul className="menu">
          <li className="menu__item">
            <Link href="/about">
              <a className="menu__link">About Us</a>
            </Link>
          </li>
          <li className="menu__item">
            <Link href="/shop">
              <a className="menu__link">Shop</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
