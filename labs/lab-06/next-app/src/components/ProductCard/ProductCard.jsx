// Components
import Link from "next/link";
import Image from "next/image";

// Next API
import { useRouter } from "next/router";

// Styles
import styles from "./ProductCard.module.scss";

export default function ProductCard({ product }) {
  const router = useRouter();
  const navigateToProduct = (event) => {
    event.preventDefault();
    router.push(`/shop/${product.slug}`);
  };

  return (
    <article className={styles.container} onClick={navigateToProduct}>
      <figure className={styles.figure}>
        <Image
          className={styles.image}
          src={product.image}
          alt={product.name}
          layout="responsive"
          width={320}
          height={240}
        />
      </figure>
      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link href={`/shop/${product.slug}`}>
            <a className={styles.link}>{product.name}</a>
          </Link>
        </h3>
        <p className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <span className={styles.price}>{product.price}</span>
          <span className={styles.manufacturer}>{product.manufacturer}</span>
        </p>
      </div>
    </article>
  );
}
