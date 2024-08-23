import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "./Formcontext";

import axios from "axios";

const ProductSummary = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useForm();
  console.log(formData);

  const onSubmit = () => {
    axios
      .post("http://localhost:5000/products", formData, {
        withCredentials: true,
      })
      .then((data) => {
        //this console.log will be in our frontend console
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="input_summary">
      <div className="input_title">Summary</div>
      <div className="input_summary_items">
        <div>Title: {formData.title}</div>
        <div>Categories: {formData.categories}</div>
        <div>Description: {formData.description}</div>
        <div>Price: {formData.price?.purchase_price} </div>
        <div>
          To rent: {formData.price?.rent_rate} {formData.price?.validity}
        </div>
      </div>
      <div className="input_button">
        <Button
          variant="contained"
          onClick={() => {
            navigate("/create_products/category");
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onSubmit();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ProductSummary;
