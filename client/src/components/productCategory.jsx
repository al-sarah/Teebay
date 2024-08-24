import { Button, TextField, Select } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { Form, Field } from "react-final-form";
import { useForm } from "./Formcontext";

import { useEffect, useState } from "react";

const ProductCategory = () => {
  const { formData, setFormData } = useForm();
  const navigate = useNavigate();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((data) => {
        setCategoryOptions(data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="centre">
      <div className="input_title">Select categories</div>

      <Select
        id="category"
        value={selectedCategory}
        select
        fullWidth={true}
        multiple={true}
        label="Select a category"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categoryOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      <div className="input_button">
        <Button
          variant="contained"
          onClick={() => {
            navigate("/create_products/title");
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setFormData({ ...formData, categories: selectedCategory });
            navigate("/create_products/description");
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default ProductCategory;
