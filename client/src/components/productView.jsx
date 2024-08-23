import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const ProductView = () => {
  const navigate = useNavigate();
  const [productCollection, setProductCollection] = useState([]);
  const [isDeleted, setIsDeleted] = useState();

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/product/${id}`) // Corrected template literal usage
      .then((response) => {
        console.log(response.data); // 'data' property contains the actual response
        setIsDeleted(id);
      })
      .catch((error) => {
        console.error(error); // Use console.error to log errors
      });
  };

  const handleClick = (id) => {
    navigate(`/products/${id}/edit`);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((data) => {
        console.log(data);
        setProductCollection(data.data);
        console.log(data.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/get-session", { withCredentials: true })
      .then((data) => {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [isDeleted]);

  return (
    // <div>

    // </div>as
    <div className="view-wrapper">
      <div>
        <div className="view_main_heading">My Products</div>
      </div>
      {productCollection.map((product, index) => (
        <div
          key={index}
          className="view_items"
          onClick={() => handleClick(product.id)}
        >
          <div className="view_items_wrapper">
            <div>{product.title}</div>
            <div>Categories {product.categories.join(" ")}</div>
            <div>
              Price {product.price.purchasePrice} Rent: {product.price.rent}{" "}
              {product.price.validity}
            </div>
            <div>product.description</div>
            <div>product.createdAt</div>
          </div>
          <DeleteOutlinedIcon
            fontSize="large"
            onClick={() => deleteProduct(product.id)} // Wrap the function call in an arrow function
          />
        </div>
      ))}
      <Button
        variant="contained"
        onClick={() => {
          navigate("/create_products/title");
        }}
      >
        Add Product
      </Button>
    </div>
  );
};

export default ProductView;
