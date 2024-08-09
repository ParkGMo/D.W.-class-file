import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import productsSlice, {
  fetchProducts,
} from "../../store/products/productsSlice";
import styles from "./DetailPage.module.scss";
import { fetchProduct } from "../../store/products/productSlice";

function DetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.productSlice);
  console.log(product);

  //   const { products } = useSelector((state) => state.productsSlice);
  //   const productItem = products[0];
  //   const { category, description, image, price, title } = products[0];

  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: "id",
          operator: "==",
          value: productId,
        },
      ],
    };
    dispatch(
      fetchProduct({ collectionName: "products", queryOptions: queryOptions })
    );
  }, []);

  return (
    <div className="page">
      {isLoading ? (
        "loading..."
      ) : (
        <div className={styles.card_wrapper}>
          <div className={styles.card_img}>
            <img src={product && product.image} />
          </div>
          <div className={styles.card_description}>
            <h3>{product && product.category}</h3>
            <h1>{product && product.title}</h1>
            <h4>${product && product.price}</h4>
            <p>{product && product.description}</p>

            <div>
              <button>장바구니에 담기 제품</button>
              <Link>방바구니로 이동</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPage;
