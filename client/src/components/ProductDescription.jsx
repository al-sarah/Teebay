import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "./Formcontext";

const ProductDescription = ({ form }) => {
  const [description, setDescription] = useState("");
  const { formData, setFormData } = useForm();
  const navigate = useNavigate();
  // console.log(form);

  return (
    <div className="input_description">
      <div className="input_title">Select description</div>
      <TextField
        id="title"
        type="text"
        fullWidth={true}
        size="small"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
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
            console.log(formData);
            setFormData({ ...formData, description: description });
            navigate("/create_products/price");
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductDescription;
