// Layout
import { Main } from "app.layouts";

// Components
import { ProductDetail } from "app.components";

// Services
import { api } from "app.services";

export default function Product({ product }) {
  return (
    <Main>
      <ProductDetail product={product} />
    </Main>
  );
}

export async function getStaticProps(context) {
  const product_slug = context.params.product_slug;
  const response = await api.get(`/products?slug=${product_slug}`, {});
  return {
    props: {
      product: response.data[0]
    }
  };
}

export async function getStaticPaths() {
  const paths = [];
  const response = await api.get(`/products/`, {});
  response.data.forEach((product) => {
    var pathItem = { params: { product_id: product.id, product_slug: product.slug } };
    paths.push(pathItem);
  });
  return {
    paths,
    fallback: false
  };
}
