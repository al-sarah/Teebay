import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "./Formcontext";
import { useState } from "react";

const ProductTitle = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useForm();
  const [title, setTitle] = useState("");

  return (
    <div className="centre">
      <div className="input_title">Select a title for your product</div>
      <TextField
        id="title"
        type="text"
        fullWidth={true}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <div className="input_button">
        <Button
          variant="contained"
          onClick={() => {
            setFormData({ ...formData, title: title });
            navigate("/create_products/category");
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductTitle;
