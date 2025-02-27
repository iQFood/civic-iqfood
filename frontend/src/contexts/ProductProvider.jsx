import { useState, useEffect } from "react";
import ProductContext from "./ProductContext";

function ProductContextProvider({ children }) {
  const [products, setProduct] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [removeButton, setRemoveButton] = useState(false);
  const [addButton, setAddButton] = useState(false);
  const [removeItem, setRemoveItem] = useState(false);
  const [recommendation, setRecommendation] = useState(false);
  const [product, setProductItem] = useState({});
  const [loading, setLoading] = useState(false);
  // console.log(products.length)

  useEffect(() => {
    async function fetchApi() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&page=${page}&page_size=6&json=true`
        );
        const data = await res.json();
        console.log("Data from 2 items from api:", data.products);
        // console.log(req)
        setProduct((p) => {
          p = data.products;
          console.log("yoo", p);
        });
        setProduct(data.products);
        setLoading(false);
        console.log(products);
      } catch (err) {
        console.log(err);
        return null;
      }
    }
    fetchApi();
  }, [query, page]);

  const value = {
    products,
    query,
    page,
    setQuery,
    setProduct,
    setPage,
    removeButton,
    setRemoveButton,
    addButton,
    setAddButton,
    removeItem,
    setRemoveItem,
    recommendation,
    setRecommendation,
    product,
    setProductItem,
    loading,
    setLoading,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export default ProductContextProvider;
