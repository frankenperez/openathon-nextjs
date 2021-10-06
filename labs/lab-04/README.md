# Lab 04 - Pre-Rendering and Data Fetching

- [Lab 04 - Pre-Rendering and Data Fetching](#lab-04---pre-rendering-and-data-fetching)
  - [Pre-Rendering](#pre-rendering)
  - [Data Fetching](#data-fetching)
    - [GetStaticProps](#getstaticprops)
    - [getStaticPaths](#getstaticpaths)
    - [getServerSideProps](#getserversideprops)
  - [Client side](#client-side)
  - [📖 Resources to learn more](#-resources-to-learn-more)

## Pre-Rendering

Next.js has two main forms of pre-rendering: **Static Site Generation** (SSG) and **Server-Side Rendering** (SSR), to which we should also add the **Incremental Static Regeneration** (ISR), a new evolution of the Jamstack available from Next.js 9.5.

Next.js lets us choose which pre-rendering mode to use for each page, creating a "hybrid" Next.js app by using different pre-rendering modes, even combine them with client-side rendering.

Out of the box, Next.js will attempt to statically generate any pages that it can by detecting how the page is fetching its data. SSG is recommended whenever possible because the page can be built once and served to the user, which makes it much faster than having a server render the page on every request.

## Data Fetching

Next.js provide three unique functions to fetch data for pre-rendering:

- `getStaticProps`: SSG.
- `getStaticPaths`: SSG.
- `getServerSideProps`: SSR.

### GetStaticProps

The function [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) runs on the server-side and fetches data at build time, returning a list of props that Next.js will use to pre-render the page.

Example:

```js
// The function gets called at build time on server-side.
export async function getStaticProps(context) {
  // Call an external API endpoint to get products.
  const res = await fetch("https://.../products");
  const posts = await res.json();
  // By returning { props: { products } }, the component Shop
  // will receive `products` as a prop at build time
  return {
    props: {
      products
    }
  };
}
```

The function can receive the `context` parameter, an object containing the route for the page (dynamic routing), the preview mode, the preview data, the active locale, etc.

When the page is pre-rendered, in addition to the HTML file, Next.js generates a JSON file holding the result of running `getStaticProps`. This JSON file will be used in client-side routing through [next/link](https://nextjs.org/docs/api-reference/next/link) or [next/router](https://nextjs.org/docs/api-reference/next/router).

Use this function when:

- The data required to render the page is available at build time.
- The data comes from a Content Management System CMS.
- The data is not user-specific.
- The data can be publicly cached.

### getStaticPaths

Defines a list of paths that have to be pre-rendered at build time for a page having [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes).

Example:

```js
// The function gets called at build time on server-side..
export async function getStaticPaths() {
  // Call an external API endpoint to get products
  const res = await fetch("https://.../products");
  const products = await res.json();
  // Get the paths to pre-render based on products
  const paths = products.map((product) => ({
    params: { product_slug: product.product_slug }
  }));
  // { fallback: false } means other routes
  // should result in a 404 page.
  return { paths, fallback: false };
}
```

The object returned by `getStaticPaths` must contain:

- A `paths` key to determine which paths will be pre-rendered. The value for each params must match the parameters used in the page name, e.g.: if the page is `src/pages/shop/[category_slug]/[product_slug]`, then params should contain `category_slug` and `product_slug`.
- A boolean `fallback` key which value can be:
  - `false`: any paths not returned by getStaticPaths will result in a 404 page.
  - `true`: any paths not generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page and will statically generate the requested path HTML and JSON in the background. When that’s done, the browser receives the JSON for the generated path and renders the page. At the same time, Next.js adds this path to the list of pre-rendered pages. Subsequent requests to the same path will serve the generated page. This is useful if an application has a very large number of static pages that depend on data and builds would take long time. Instead, a small subset of pages are going to be statically generated and using `fallback: true` for the rest of them.
  - `"blocking"`: any paths not generated at build time will not result in a 404 page. Instead, Next.js will SSR on the first request and return the generated HTML. When that’s done, the browser receives the HTML for the generated path and Next.js adds the path to the list of pre-rendered pages.

Apply this function together with `getStaticProps` when statically pre-rendered pages use dynamic routes.

### getServerSideProps

Next.js will pre-render this page on each request using the data returned by getServerSideProps.

## Client side

Inside your layout, you can fetch data on the client-side using useEffect or a library like SWR. Because this file is not a Page, you cannot use getStaticProps or getServerSideProps currently.

## 📖 Resources to learn more

---

[<< **Prev**](../lab-03) | [**Next** >>](../lab-05)
