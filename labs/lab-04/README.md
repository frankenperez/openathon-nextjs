# Lab 04 - Pre-Rendering and Data Fetching

- [Lab 04 - Pre-Rendering and Data Fetching](#lab-04---pre-rendering-and-data-fetching)
  - [Pre-Rendering](#pre-rendering)
  - [Data Fetching](#data-fetching)
    - [GetStaticProps](#getstaticprops)
    - [GetStaticPaths](#getstaticpaths)
    - [GetServerSideProps](#getserversideprops)
  - [Data Fetching on the Client-side](#data-fetching-on-the-client-side)
  - [JSON Server](#json-server)
  - [Environment Variables](#environment-variables)
  - [Axios](#axios)
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

The function [[getStaticProps](https://github.com/typicode/json-server)](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) runs on the server-side and fetches data at build time, returning a list of props that Next.js will use to pre-render the page.

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

### GetStaticPaths

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

- A `paths` key to determining which paths will be pre-rendered. The value for each params must match the parameters used in the page name, e.g.: if the page is `src/pages/shop/[category_slug]/[product_slug]`, then params should contain `category_slug` and `product_slug`.
- A boolean `fallback` key which value can be:
  - `false`: any paths not returned by getStaticPaths will result in a 404 page.
  - `true`: any paths not generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page and will statically generate the requested path HTML and JSON in the background. When that’s done, the browser receives the JSON for the generated path and renders the page. At the same time, Next.js adds this path to the list of pre-rendered pages. Subsequent requests to the same path will serve the generated page. This is useful if an application has a very large number of static pages that depend on data and builds would take a long time. Instead, a small subset of pages is going to be statically generated, using `fallback: true` for the rest of them.
  - `"blocking"`: any paths not generated at build time will not result in a 404 page. Instead, Next.js will SSR on the first request and return the generated HTML. When that’s done, the browser receives the HTML for the generated path and Next.js adds the path to the list of pre-rendered pages.

Apply this function together with `getStaticProps` when statically pre-rendered pages use dynamic routes.

### GetServerSideProps

The function [**getServerSideProps**](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering) only runs on server-side and returns data to pre-render the page on each request.

Example:

```js
// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
```

The function can receive the `context` parameter, an object containing the route for the page (dynamic routing), the HTTP IncomingMessage, the HTTP response, the query string, the preview mode, the preview data, the active locale, etc.

Use this function to pre-render a page whose data must be fetched at request time.

## Data Fetching on the Client-side

In case pre-render data is not required and data needs to be updated frequently, client-side fetching is recommended.

Parts of the page can be pre-rendered using Static Generation, using loading states for missing data. Then, you can fetch data on the client-side using useEffect or a library like [**SWR**](https://swr.vercel.app/).

Use this approach for private or user-specific pages, where SEO is not relevant and the page doesn’t need to be pre-rendered.

## JSON Server

[**JSON Server**](https://github.com/typicode/json-server) is a Node module used to create a fake REST API in a few minutes with zero coding, just using some JSON files to provide mocked data to a project.

> ✏ **Task**
>
> Copy the [`server`](./server) folder from `labs/lab-04/server` into the parent root of your `next-app` directory. In lab-01 we created it as `fruits-and-veggies`
>
> Copy the [`package.json`](./package.json) file into the `fruits-and-veggies` parent directory:
>
> ```text
> fruits-and-veggies
> ├── next-app
> ├── server
> └── package.json
> ```
>
> The `package.json` file contains a list of dependencies and scripts to install and run the JSON Server and Next.js at the same time.
>
> Move to the parent directory and run: `npm install or yarn install`.
>
> Once done, run `npm run server:install`.
>
> **Note**: If you are using yarn, please update the `package.json` scripts to run them with yarn and run `yarn server:install`.
>
> Finally, run `npm run start` or `yarn start`.
>
> You’ll see that JSON Server is running on http://localhost:3001/, and your Next.js development server is on http://localhost:3000/.

## Environment Variables

Next.js has built-in support for environment variables. An **environment variables** is a predetermined value in a system used to configure a value that describe the environment.

The `.env` file lets us customize the individual environment variables easily with the syntax `ENV_VARIABLE=VALUE`.

Next.js has built-in support for loading environment variables from `.env.local` into `process.env.` for the Node.js environment, allowing us to use them in data fetching methods and API routes.

By default environment variables are only available in the Node.js environment. In order to expose a variable to the browser, prefix the variable with `NEXT_PUBLIC_`.

> ✏ **Task**
>
> Create a new `next-app/.env.local` file and define the following variables:
>
> ```bash
> API_URL=http://localhost:3001/
> ```

## Axios

[**Axios**](https://axios-http.com/) is a JavaScript library used to make HTTP requests from Node.js or XMLHttpRequests from the browser, with some advantages over the Fetch API:

- It performs automatic JSON data transformation and supports upload progress.
- It has ways to abort a request or to set a response timeout.
- It will reject the request promise if a response with status code in the 4xx or 5xx range is returned.
- It automatically sends cookies back to the server when making a request and has built-in XSRF protection.
- It can be used in both: browser and Node.js server and facilitates sharing JavaScript code between them.

> ✏ **Task**
>
> Install Axios in `next-app` by running `npm install axios` or `yarn add axios`

## 📖 Resources to learn more

- [**Data Fetching examples with Next.js**](https://nextjs.org/docs/basic-features/data-fetching)

---

[<< **Prev**](../lab-03) | [**Next** >>](../lab-05)
