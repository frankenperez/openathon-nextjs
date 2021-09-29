# Lab 00 - Key concepts

- [Lab 00 - Key concepts](#lab-00---key-concepts)
  - [Client-side rendering (CSR) and single-page applications (SPA)](#client-side-rendering-csr-and-single-page-applications-spa)
    - [Benefits of CSR](#benefits-of-csr)
    - [Risks of CSR](#risks-of-csr)
  - [Server-side rendering (SSR)](#server-side-rendering-ssr)
    - [Benefits of SSR](#benefits-of-ssr)
    - [Risks of SSR](#risks-of-ssr)
  - [Static site generation (SSG)](#static-site-generation-ssg)
    - [Benefits of SSG](#benefits-of-ssg)
    - [Risks of SSG](#risks-of-ssg)
  - [When to use CSR, SSR or SSG](#when-to-use-csr-ssr-or-ssg)
  - [📋 Additional concepts](#-additional-concepts)
  - [📖 Resources to learn more](#-resources-to-learn-more)

## Client-side rendering (CSR) and single-page applications (SPA)

**Client-side rendering** (**CSR**) is an application's ability to entirely render content in the browser with JavaScript.

![Client-side generation process](../../resources/images/csr.png)

When the user requests a website, instead of getting all the content from the HTML document itself, a bare-bones HTML document is received. The browser also downloads all JavaScript files and executes the scripts to make API requests and fetch the dynamic content. After the server responds, the final content is rendered using DOM processing in the client's browser and the page is fully visible and interactive.

With client-side rendering, the initial page load is naturally a bit slow. However, after that, every subsequent page load is faster. The web application interacts with the user by dynamically rewriting the current web page with new data from the webserver, instead of the default method of a web browser loading entire new pages. This model supports **single-page applications** (**SPAs**).

### Benefits of CSR

- **Cheap to host**. CSR applications do not require a web server. They can be hosted on any content delivery network (CDN) or static file host.
- **Fast refresh**. CSR apps render the content on a single page without reloading or re-render the full page. This saves a lot of both computation power and RAM, so it gets quicker results than server-side rendering (SSR).
- **Lazy loading support**. Client-side rendering supports lazy loading sections of the application to save bandwidth & speed initial load.
- **Easy to deploy**. Automated deployments can be configured.
- **Reusability**. UI components can be reused across multiple pages or routes without having to request the server each time. This enhances usability and on-page performance.

### Risks of CSR

- **Slow FCP**. A client-side rendered application needs to make additional round-trips to the API server to render the content, causing a slow [first contentful paint](#additional-concepts).
- **Poor SEO**. Due to the nature of this model, content is not available in the first load and search engine crawlers will face troubles while indexing the page.
- **Caching**. Browsers cannot cache the HTML structure of the page because the first HTML page is blank.
- **Poor user experience in slow devices**. Load times can be high on slower laptops and mobile devices and can lead to users getting frustrated and leaving the web application before it renders.

## Server-side rendering (SSR)

Server-side rendering (SSR) is an application's ability to convert HTML files on the server into a fully rendered HTML page for the client.

![Server-side rendering process - Instead of functions that manipulate the DOM in the web browser as in SPAs, the rendering process is delegated to an earlier stage on the server.](../../resources/images/ssr.png)

The browser sends a request to the server, which compiles and prepares the HTML content after traversing through server-side scripts, sending a fully rendered HTML page to the browser. Once the HTML has been delivered, the user can access the content on the page without having to wait for all the JavaScript to be downloaded and executes.

### Benefits of SSR

- **SEO Friendly**. SSR offers an SEO (**Search Engine Optimization**) friendly way of building websites and applications when compared to traditional SPAs. Search engines can easily index and crawl content because it can be rendered before the page is loaded.
- **Fast FCP**. A server-side rendered application enables pages to be rendered and visible faster, improving metrics such as [first contentful paint](#additional-concepts) and the user experience, particularly for users with a slow internet connection or outdated devices.
- **Social Sharing**. With SSR you can programmatically customize the Open Graph meta titles for each page, which is also relevant to SEO and makes your URLs look much better in social media.
- **Indexation**. SSR web pages will potentially be indexed correctly because web browsers prioritize web pages with faster load times.

### Risks of SSR

- **Expensive to host**. Rendering server-side can be costly and resource-intensive, requiring more power and memory on the server to handle requests, API calls, render HTML files...
- **Slow TTFB**. TTFB is the [time to the first byte](#additional-concepts). While rendering static HTML server-side is efficient, rendering bigger and more complex applications server-side can increase load times due to the bottleneck.
- **Higher latency**. SSR sites tend to get a high latency if you get lots of traffic at the same time, which delays/slows down the browsing experience for everyone.
- **Caching**. Due to frequent server requests and full-page reloads can result in overall slower page rendering, configuring the cache is more complex but usually required to provide a better user experience on SSR sites.
- **Compatibility with other libraries**. Server-side rendering may not be compatible with third-party JavaScript code.

## Static site generation (SSG)

Static site generation describes the process of compiling and rendering HTML files during build time from templates or components, rather than during runtime as SSR.

![Static site generation process](../../resources/images/ssg.png)

When the user requests a webpage, a pre-made static HTML page is sent to the browser. The build process is handled before the pages are requested by the client. The browser also downloads all the required static assets like JavaScript and CSS files. Each content update will require a new deployment to re-generate the static HTML pages.

Sites built on this type of architecture often make use of pre-rendered static pages served over CDNs, can get data from multiple sources, and replace traditional servers and their databases with microservice APIs.

### Benefits of SSG

- **Cheap to host**. Since an SSG website is just made up of a bunch of different HTML files, you can host your site on any static file hosting service
- **SEO Friendly**. The static site generation model offers an SEO friendly way of building websites and applications. Search engine crawlers can easily index and access the content of the static pages.
- **Fast FCP**. Since all the pages and content have been generated at build time, the client will start to see content almost immediately.
- **Security**. A statically generated site is solely composed of static files, the risk of being vulnerable to cyber attacks is minimal.

### Risks of SSG

- **Hard to scale**. As SSG website grows, builds with large amounts of data slow down and the rebuild time to generate the static pages would increase.
- **Content can become stale**. Any change on the content requires a rebuild of the site. If the content of the site changes too quickly, it may become out of date.
- **Compatibility with other libraries**. Many UI libraries are not compatible with the SSG model and can cause issues during build time or in the user interface.

## When to use CSR, SSR or SSG

Depending on the web application and its functional and non-functional requirements, we can define few scenarios to use different rending modes.

In **CSR** content is rendered in the browser using the client-side JavaScript library increasing the time to be visible for the user, however, the rendering process for new requests tends to be faster. It is recommended for SPAs and dynamic platforms with complex interfaces where content and SEO is less relevant, prioritizing the user interaction. Examples: software-as-a-Service (SaaS) solution, customer support portal, back-office dashboard, closed community social network, etc.

Static site generation and server-side rendering are two forms of **pre-rendering** (generates HTML for each page in advance) well suited for those applications that demand special attention to SEO and performance.

The **SSR** approach is good for building complex web applications where content and SEO is relevant, require user interaction, rely on a database and the content could change very often. Examples: e-commerce sites, news and blogs and other dynamic content sites.

Finally, The **SSG** mode is a great choice for simple applications in which the content is also relevant but typically doesn’t change based on the user’s actions. It is not suitable for interactive web applications that require to be rebuilt every time new input is provided. Examples: corporate site, personal webpage, landing and other static pages.

## 📋 Additional concepts

- **FCP**: First Contentful Paint. It is a user-centric metric for measuring perceived page load speed and refers to the time it takes for the browser to render the first bit of content in the DOM since the content was requested, providing the first feedback to the user that the page is actually loading.

- **TTFB**: Time To First Byte. It is a metric for determining the responsiveness of a web server and measures the amount of time between the browser requesting a page from the server and the download of the first content on the page.

## 📖 Resources to learn more

- [Rendering strategies on the Web](https://developers.google.com/web/updates/2019/02/rendering-on-the-web).

- [The Benefits of Server Side Rendering Over Client Side Rendering](https://medium.com/walmartglobaltech/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8).
