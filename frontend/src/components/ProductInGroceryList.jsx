import NovaScore from "../components/NovaScore";
import NutriScoreGrade from "./NutriScoreGrade";
import { useNavigate } from "react-router-dom";
import { fetchHandler } from "../utils";
import ProductContext from "../contexts/ProductContext";
import { useContext } from "react";

export default function ProductInGroceryList({ props }) {
  const navigate = useNavigate();
  const {setRemoveItem, setProductItem} = useContext(ProductContext);
  // setProductItem(props);

  console.log(props);
  const handleRemoveItem = async() => {
    setRemoveItem(true);
    try{
      await fetchHandler(`/api/grocerylist/${props.grocery_list_id}/${props.item_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    }catch(err){
      console.log(err);
      return null;
    }
  };

  
  return (
    <>
      <div id="grocery-cart-card" className="ui card">
        <div className="imageCard">
          <img className="grocery-cart-image" alt="oh no!" src={props.image_front_thumb_url} />
        </div>
        <div id="grocery-cart-info" className="content">
          <div className="header">{`${props.product_name}`}</div>
          <div className="meta grocery-cart-info">
            <span>
              {/* <i className="icon-nutri-score" />
              {props.nutriscore_grade} */}
              <NutriScoreGrade props={props.nutriscore_grade} />
            </span>

            <span className="grocery-cart-info">
              {/* <i className="icon-nova-score" />
              {props.nova_groups} */}
              <NovaScore props={props.nova_groups} />
            </span>
          </div>
        </div>
        <button
          className="ui button fluid"
          onClick={() => {
            navigate(`/product/${props.item_id}`);
          }}
        >
          View
        </button>
        <button className="ui button fluid" onClick={handleRemoveItem}>Remove</button>
      </div>
    </>
  );
}
