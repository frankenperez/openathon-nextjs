import Header from "app.layouts/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <h1>About us</h1>
        <h2>This is a starter Next.js E-commerce store</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec
          vehicula sem. Ut ultricies lorem a auctor porttitor.
        </p>
      </main>
      <footer>
        Powered by <a href="https://nextjs.org">Next.js</a>
      </footer>
    </>
  );
}
