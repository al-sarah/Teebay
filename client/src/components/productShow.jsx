import ProductCard from "./productCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const ProductShow = () => {
  const { id } = useParams();
  const [data, setData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((response) => {
        console.log(response.data);
        // Set the state with an array containing the fetched product data
        setData([response.data]);
        console.log("HERE", [response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]); // Include `id` in the dependency array

  return (
    <div>
      <div className="product_show_page">
        <ProductCard products={data} />
      </div>

      <div className="input_button">
        <Button
          variant="contained"
          onClick={() => {
            // navigate("/create_products/category");
          }}
        >
          Rent
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            // onSubmit();
          }}
        >
          Buy
        </Button>
      </div>
    </div>
  );
};

export default ProductShow;
