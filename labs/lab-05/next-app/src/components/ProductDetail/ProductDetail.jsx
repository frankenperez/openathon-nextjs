// Components
import Image from "next/image";

// Styles
import styles from "./ProductDetail.module.scss";

export default function ProductDetail({ product }) {
  return (
    <article className={styles.container}>
      <Image src={product.image} alt={product.name} layout="responsive" width={320} height={240} />
      <section className={styles.section}>
        <h1 className={styles.title}>{product.name}</h1>
        <div className={styles.details}>
          <p className={styles.info}>
            <span className={styles.category}>{product.category}</span>
            <span className={styles.manufacturer}>{product.manufacturer}</span>
            <span className={styles.reference}>{product.ref}</span>
          </p>
          <p className={styles.price}>{product.price}</p>
        </div>
        <p className={styles.description}>{product.description}</p>
      </section>
    </article>
  );
}
