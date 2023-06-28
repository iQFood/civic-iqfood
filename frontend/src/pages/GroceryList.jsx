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

  function shuffleArray(array) {
    const newArray = [...array]; // Create a new array to avoid modifying the original array
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const handleRecommendation = async (groceryListId) => {
    setRecommendation(true);

    try {
      console.log("Item List is", itemList);
      const res = await fetchHandler(
        `/api/grocerylist/${groceryListId}/rec`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Hello")
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
    if(recommendation) {
      setRecommendation(false);
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
  }, [id, removeItem, recommendation, recomItem]);

  console.log(typeof itemList);
  console.log(itemList);
  // console.log(itemList[0].grocery_list_id)

  console.log("Recommendation", recomItem);
  console.log(typeof recomItem)


  return (
    <>
      <h1>GroceryList</h1>
      <div className="ui centered cards">
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
        <button className="ui button fluid" onClick={()=>{
          handleRecommendation(itemList[0].grocery_list_id);
        }}>
          Recommendation
        </button>
      </div>
      {recomItem[0] && (
        <div className="ui card">
          <div className="image">
            <img src={recomItem[0].image_front_thumb_url} />
          </div>
          <div className="content">
            <div className="meta">
              <span>
                <i className="icon-nutri-score" />
                {recomItem[0].nutriscore_grade}
                <NutriScoreGrade props={recomItem[0].nutriscore_grade}/>
              </span>

              <span>
                <i className="icon-nova-score" />
                {recomItem[0].nova_group}
                <NovaScore props={recomItem[0].nova_group} />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
