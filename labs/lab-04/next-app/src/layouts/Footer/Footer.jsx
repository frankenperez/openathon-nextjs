import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
      E-Commerce sample site powered by <a href="https://nextjs.org">Next.js</a>
    </footer>
  );
}
