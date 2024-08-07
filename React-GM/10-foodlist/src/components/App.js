import React, { useEffect, useState } from "react";
import "./App.css";
// import styles from "./App.module.css";
import backgroundImg from "../assets/background.png";
import logoImg from "../assets/logo.png";
import logoTextImg from "../assets/logo-text.png";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import searchImg from "../assets/ic-search.png";
import {
  addDatas,
  deleteDatas,
  getDatas,
  getDatasOrderByLimit,
  getSearchDatas,
  updateDatas,
} from "../api/firebase";
import { useSetLocale } from "../contexts/LocalContext";
import { useTranslate } from "../hooks/useTranslate";
import LocalSelect from "./LocalSelect";
import useAsync from "../hooks/useAsync";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  resetItemCount,
  setItemCount,
  setOrder,
  updateItem,
} from "../store/foodSlice";

const LIMIT = 5;

function AppSortButton({ children, selected, onClick }) {
  return (
    <button
      className={`AppSortButton ${selected ? "selected" : ""}`}
      onClick={onClick}
      disabled={selected}
    >
      {children}
    </button>
  );
}

function App(props) {
  const dispatch = useDispatch();
  const { items, order, itemCount } = useSelector((state) => state.food);
  // const trans = useSelector((state) => state.local.dict);
  // const lang = useSelector((state) => state.local.language);
  const { dict, language } = useSelector((state) => state.local);
  // console.log(dict[language]);

  // const [items, setItems] = useState([]);
  // const [order, setOrder] = useState("createdAt");
  // const [itemCount, setItemCount] = useState(5);
  const [search, setSearch] = useState("");

  // const sortOrder = useSelector((state) => state.sort.sortOrder);
  // const sortCount = useSelector((state) => state.sort.sortCount);

  // const [isLoading, setIsLoading] = useState(false);
  // const [locale, setLocale] = useState("ko");
  const [isLoading, loadingError, getDatasAsync] =
    useAsync(getDatasOrderByLimit);

  const t = useTranslate();

  const queryOptions = {
    conditions: [],
    orderBys: [
      {
        field: order,
        direction: "desc",
      },
    ],
    lastQuery: undefined,
    limits: itemCount,
  };

  const handleLoad = async (options) => {
    dispatch(fetchItems({ collectionName: "food", queryOptions: options }));
    // setIsLoading(true);
    // const resultData = await getDatasOrderByLimit("food", {
    //   fieldName: order,
    //   limits: itemCount,
    // });
    // setIsLoading(false);
    const resultData = await getDatasAsync("food", {
      // fieldName: sortOrder,
      // limits: sortCount,
      fieldName: order,
      limits: itemCount,
    });

    //? setItems(resultData);
    // dispatch(setItemCount(5));
  };
  const [dataLength, setDataLength] = useState(0);
  const listData = async () => {
    const listDataLength = (await getDatas("food")).length;
    setDataLength(listDataLength);
  };

  const handleNewestClick = () => {
    // handleLoad();
    dispatch(setOrder("createdAt"));
    dispatch(resetItemCount(5));
    //? setOrder("createdAt");
    //? setItemCount(5);
    // dispatch(sortOrder("createdAt"));
  };
  const handleCalorieClick = () => {
    // handleLoad();
    dispatch(setOrder("calorie"));
    dispatch(resetItemCount(5));
    //? setOrder("calorie");
    //? setItemCount(5);
    // dispatch(sortOrder("calorie"));
  };
  const handleDelete = async (docId, imgUrl) => {
    // items 에서 docId 를 받아온다.
    // db에서 데이터 삭제(스토리지에 있는 사진파일 삭제, database에 있는 데이터 삭제)
    const { result, message } = await deleteDatas("food", docId, imgUrl);

    // 삭제 성공시 화면에 그 결과를 반영한다.
    if (!result) {
      alert(message);
      return false;
    }
    //? setItems((prevItems) => prevItems.filter((item) => item.docId !== docId));
    handleLoad(queryOptions);
  };
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (search === "") {
      // handleLoad({ fieldName: sortOrder, limits: sortCount });
      handleLoad({ fieldName: order, limits: itemCount });
    } else {
      const resultData = await getSearchDatas("food", {
        // limits: sortCount,
        limits: itemCount,
        search: search,
      });
      //? setItems(resultData);
    }
  };

  const handleAddSuccess = (resultData) => {
    handleLoad(queryOptions);
    //? setItems((prevItems) => [resultData, ...prevItems]);
  };

  const handleUpdate = (collectionName, docId, updateObj, imgUrl) => {
    dispatch(updateItem({ collectionName, docId, updateObj, imgUrl }));
  };
  const handleUpdateSuccess = (result) => {
    //? setItems((prevItems) => {
    //   const splitIdx = prevItems.findIndex((item) => {
    //     return item.id === result.id;
    //   });
    //   const beforeArr = prevItems.slice(0, splitIdx);
    //   const afterArr = prevItems.slice(splitIdx + 1);
    //   return [...beforeArr, result, ...afterArr];
    // });
  };

  const countOnClick = () => {
    dispatch(setItemCount(5));
    //? setItemCount((prevCount) => prevCount + LIMIT);
    // handleLoad();
  };
  useEffect(() => {
    // handleLoad({ fieldName: sortOrder, limits: sortCount });
    //? handleLoad({ fieldName: order, limits: itemCount });
    // const queryOptions = {
    //   conditions: [],
    //   orderBys: [
    //     {
    //       field: order,
    //       direction: "desc",
    //     },
    //   ],
    //   lastQuery: undefined,
    //   limits: itemCount,
    // };
    listData();
    // dispatch(fetchItems({ collectionName: "food", queryOptions }));
    handleLoad(queryOptions);
    // }, [sortOrder, sortCount]);
  }, [order, itemCount]);

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm
            onSubmit={addDatas}
            onSubmitSuccess={handleAddSuccess}
            // item={INITIAL_VALUES}
          />
        </div>
        <div className="App-filter">
          <form className="App-search" onSubmit={handleSearchSubmit}>
            <input className="App-search-input" onChange={handleSearchChange} />
            <button className="App-search-button">
              <img src={searchImg} />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton
              // selected={sortOrder == "createdAt" ? true : false}
              selected={order == "createdAt" ? true : false}
              onClick={handleNewestClick}
            >
              {dict[language]["newest"]}
              {/* {t("newest")} */}
              {/* {최신순} */}
            </AppSortButton>
            <AppSortButton
              // selected={sortOrder == "calorie" ? true : false}
              selected={order == "calorie" ? true : false}
              onClick={handleCalorieClick}
            >
              {dict[language]["calorie"]}
              {/* {t("calorie")} */}
              {/* 칼로리순 */}
            </AppSortButton>
          </div>
        </div>
        <FoodList
          items={items}
          onDelete={handleDelete}
          // onUpdate={updateDatas}
          onUpdate={handleUpdate}
          onUpdateSuccess={handleUpdateSuccess}
          search={search}
        />
        {/* {sortCount >= dataLength ? ( */}

        {itemCount >= dataLength ? (
          ""
        ) : (
          <button
            className="App-load-more-button"
            onClick={countOnClick}
            disabled={isLoading}
          >
            {dict[language]["load more"]}
            {/* {t("load more")} */}
          </button>
        )}
        {/* <button onClick={countOnClick}>더보기</button> */}
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={logoTextImg} />
          <LocalSelect />
          {/* <select onChange={() => handleTranslate}>
            <option value={"ko"}>한국어</option>
            <option value={"en"}>English</option>
            </select> */}
          <div className="App-footer-menu">
            {/* {t("terms of service")} | {t("private policy")} */}
            {dict[language]["terms of service"]} |{" "}
            {dict[language]["private policy"]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
