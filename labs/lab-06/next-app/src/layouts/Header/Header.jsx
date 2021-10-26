import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.container}>
      <Link href="/">
        <a className={styles.logo}>
          <div className={styles["logo__image"]}>
            <Image alt="Fruits and Veggies Logo" src="/images/logo.svg" width={40} height={40} />
          </div>
          <span className={styles["logo__title"]}>
            Fruits<span className={styles.ampersand}>&</span>Veggies
          </span>
        </a>
      </Link>
      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          <li className={styles["menu__item"]}>
            <Link href="/about">
              <a className={styles["menu__link"]}>About Us</a>
            </Link>
          </li>
          <li className={styles["menu__item"]}>
            <Link href="/shop">
              <a className={styles["menu__link"]}>Shop</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
