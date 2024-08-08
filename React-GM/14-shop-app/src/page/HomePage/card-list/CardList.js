import React, { useEffect } from "react";
import styles from "./CardList.module.scss";
import CardItem from "./Card-item/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { FieldPath, orderBy } from "firebase/firestore";
import { fetchProducts } from "../../../store/products/productsSlice";

// const products = [
//   {
//     id: 1,
//     title: "가방",
//     price: 109.95,
//     description:
//       "숲에서 하루종일 걷고 난리쳐도 좋은 가방. 15인치 넘는 노트북도 들어감",
//     category: "Men's Clothing",
//     image: "/bag1.jpg",
//     rating: {
//       rate: 3.9,
//       count: 120,
//     },
//   },
// ];

function CardList() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsSlice);
  const category = "";

  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: "category",
          operator: category ? "==" : ">=",
          value: category.toLowerCase(),
        },
      ],
      //   orderBys: [{ field: "id", direction: "desc" }],
      //   limits: "15",
    };
    //   fetchProducts()==>는 action 역할 (state상태 변화)
    dispatch(
      fetchProducts({ collectionName: "products", queryOptions: queryOptions })
    );
  }, [category]);
  return (
    <ul className={styles.card_list}>
      {products.map((product, idx) => {
        return <CardItem item={product} key={idx} />;
      })}
    </ul>
  );
}

export default CardList;
