import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const ProductCard = ({ products, currentTabIndex, setIsDeleted }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    if (currentTabIndex === 1) {
      navigate(`/products/${id}/edit`);
    } else {
      navigate(`/products/${id}/show`);
    }
  };
  const deleteProduct = (id, event) => {
    event.stopPropagation();
    axios
      .delete(`http://localhost:5000/product/${id}`) // Corrected template literal usage
      .then((response) => {
        setIsDeleted(id);
      })
      .catch((error) => {
        console.error(error); // Use console.error to log errors
      });
  };
  return (
    <div>
      {products.map((product, index) => (
        <div
          key={index}
          className="view_items"
          onClick={() => handleClick(product.id)}
        >
          <div className="view_items_wrapper">
            <div>{product?.title}</div>
            <div>Categories {product?.categories.join(" ")}</div>
            <div>
              Price {product?.price.purchasePrice} Rent: {product.price.rent}{" "}
              {product?.price?.validity}
            </div>
            <div>{product?.description}</div>
            <div>{product?.createdAt}</div>
          </div>
          {currentTabIndex === 1 && (
            <DeleteOutlinedIcon
              fontSize="large"
              onClick={(event) => deleteProduct(product.id, event)} // Wrap the function call in an arrow function
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
