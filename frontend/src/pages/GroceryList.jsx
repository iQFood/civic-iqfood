import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchHandler } from "../utils";
import ProductInGroceryList from "../components/ProductInGroceryList";
import ProductContext from "../contexts/ProductContext";
import NovaScore from "../components/NovaScore";
import NutriScoreGrade from "../components/NutriScoreGrade";

export default function GroceryList() {
  const { id } = useParams();
  const [itemList, setItemList] = useState([]);
  const { removeItem, setRemoveItem, setRecommendation, recommendation } =
    useContext(ProductContext);
  const [recomItem, setRecomItem] = useState([]);
  const [addItemRecom, setAddItemRecom] = useState(false);

  const [toggleRecommendation, setToggleRecommendation] = useState(false);
  function shuffleArray(array) {
    const newArray = [...array]; // Create a new array to avoid modifying the original array
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const handleAddRecommendation = async (groceryListId) => {
    setAddItemRecom(true);

    console.log(recomItem[0]);
    const newItem = {
      product_name: recomItem[0].product_name,
      quantity: recomItem[0].quantity || null,
      ecoscore_grade: recomItem[0].ecoscore_grade.toLowerCase() || null,
      additives_original_tags: recomItem[0].additives_original_tags,
      image_front_thumb_url: recomItem[0].image_front_thumb_url,
      stores: recomItem[0].stores,
      nutriscore_grade: recomItem[0].nutriscore_grade,
      nova_group: recomItem[0].nova_group,
      id: recomItem[0].id,
    };
    try {
      await fetchHandler(`/api/grocerylist/${groceryListId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const handleRecommendation = async (groceryListId) => {
    setRecommendation(true);

    try {
      console.log("Item List is", itemList);
      const res = await fetchHandler(`/api/grocerylist/${groceryListId}/rec`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Hello");
      console.log(res);
      const v = shuffleArray(res[0]);
      setRecomItem(v);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  console.log(id);

  useEffect(() => {
    if (removeItem) {
      setRemoveItem(false);
    }
    if (recommendation) {
      setRecommendation(false);
    }
    if (addItemRecom) {
      setAddItemRecom(false);
    }
    const groceryList = async () => {
      try {
        const res = await fetchHandler(`/api/grocerylist/${id}/items`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = res[0];
        setItemList(data);
      } catch (err) {
        console.log(err);
        return null;
      }
    };
    groceryList();
  }, [id, removeItem, recommendation, recomItem, addItemRecom]);

  console.log(typeof itemList);
  console.log(itemList);
  // console.log(itemList[0].grocery_list_id)

  console.log("Recommendation", recomItem);
  console.log(typeof recomItem);

  // return (

  // )

  return (
    <body id="grocery-list-page">
      {/* <div className="page-bg"> */}

      {/* <h1>GroceryList</h1> */}
      <div id="grocery-list-item-section" className="ui centered cards">
        {itemList.map((product, i) => {
          return (
            <ProductInGroceryList
              key={i}
              props={{
                id: product.id,
                image_front_thumb_url: product.image_front_thumb_url,
                product_name: product.product_name,
                nutriscore_grade: product.nutriscore_grade,
                nova_groups: product.nova_group,
                item_id: product.item_id,
                grocery_list_id: product.grocery_list_id,
              }}
            />
          );
        })}
      </div>
      <div>
        <button
          className="ui button fluid"
          onClick={() => {
            setToggleRecommendation(!toggleRecommendation);
            handleRecommendation(itemList[0].grocery_list_id);
          }}
        >
          Recommendation
        </button>
      </div>
      {toggleRecommendation ? (
        <>
          {recomItem[0] && (
            <div id="grocery-cart-recommendation" className="ui card">
              {/* <div id="grocery-cart-recommendation-image" className="image"> */}
              <img
                id="grocery-cart-recommendation-image"
                src={recomItem[0].image_front_thumb_url}
              />
              {/* </div> */}
              <div className="content">
                <div id="grocery-cart-recommendation-info" className="meta">
                  <span>
                    <i className="icon-nutri-score" />
                    {recomItem[0].nutriscore_grade}
                    <NutriScoreGrade props={recomItem[0].nutriscore_grade} />
                  </span>

                  <span>
                    <i className="icon-nova-score" />
                    {recomItem[0].nova_group}
                    <NovaScore props={recomItem[0].nova_group} />
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="ui button fluid"
                  onClick={() => {
                    setToggleRecommendation(!toggleRecommendation);
                    handleAddRecommendation(itemList[0].grocery_list_id);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </>
      ) : null}
    </body>
  );
}
