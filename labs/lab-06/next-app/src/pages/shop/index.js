// Layout
import { Main } from "app.layouts";

// Components
import { ProductCard } from "app.components";

// Services
import { api } from "app.services";

export default function Shop({ products }) {
  return (
    <Main>
      <h1>Shop</h1>
      <h2>Fresh fruits, vegetables and organic products</h2>
      <p>Organic and seasonal fruits and vegetables direct from farmers.</p>
      <section className="product__grid">
        {products.map((product, index) => {
          return <ProductCard key={`product-${product.id}`} product={product} />;
        })}
      </section>
    </Main>
  );
}

export async function getStaticProps(context) {
  const response = await api.get("/products", {});
  return {
    props: {
      products: response.data || []
    }
  };
}
