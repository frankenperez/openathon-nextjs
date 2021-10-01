import Header from "app.layouts/Header";

export default function Error404() {
  return (
    <>
      <Header />
      <main>
        <h1>Error 404</h1>
        <h2>Page not Found</h2>
      </main>
      <footer>
        Powered by <a href="https://nextjs.org">Next.js</a>
      </footer>
    </>
  );
}
