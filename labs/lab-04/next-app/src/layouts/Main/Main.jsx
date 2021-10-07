import Head from "next/head";
import { Header, Footer } from "app.layouts";
import styles from "./Main.module.scss";

export default function Main({ children }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
      </Head>
      <Header />
      <main className={styles.container}>{children}</main>
      <Footer />
    </>
  );
}
