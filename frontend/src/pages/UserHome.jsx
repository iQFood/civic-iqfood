import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";
import ProductsList from "../components/ProductsList";
import LoadingPage from "./LoadingPage";

export default function Page404() {
  let query
  const { setQuery, loading } = useContext(ProductContext);
  // if(e.target[0].value){
  //   query = e.target[0].value
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setQuery(e.target[0].value);
  };

  if (loading) return <LoadingPage />;

  return (
    // <>
    <div id="search-food-area">
      <form id="search-food-form" onSubmit={handleSubmit}>
        <h1 id="search-text">{"Search"}</h1>
        <div id="search-food-box">
          <input type="text" placeholder="Enter your food" />
          <button type="submit">Search</button>
        </div>
      </form>
      <ProductsList />
    </div>
    // </>
  );
  // <body id="search-page">
  // <style>
  //     @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
  // </style>

  {
    /* </body>; */
  }
}
