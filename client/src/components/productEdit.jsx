import { Form, Field } from "react-final-form";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "./Formcontext";
import { useEffect, useState } from "react";

const ProductEdit = () => {
  const { id } = useParams();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const rentTime = ["perHour", "perDay", "perMonth"];
  const [selectedTime, setSelectedTime] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((data) => {
        setCategoryOptions(data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((data) => {
        setSelectedCategory(data.data.categories);
        setSelectedTime(data.data.price?.validity);

        setData(data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onSubmit = (values) => {
    let payload = {
      title: values.title,
      description: values.description,
      categories: selectedCategory,
      price: {
        purchasePrice: values.purchasePrice,
        rent: values.rent,
        validity: selectedTime,
      },
    };

    axios
      .patch(`http://localhost:5000/product/${id}/edit`, payload)
      .then((data) => {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const validate = () => {};

  return (
    <div className="edit_form_wrapper">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="edit_form_fields">
              <Field name="title" initialValue={data.title}>
                {({ input, meta }) => (
                  <div className="edit_title">
                    <div className="edit_form_subtitle">Title</div>
                    <TextField
                      {...input}
                      id="title"
                      type="text"
                      fullWidth={true}
                    />
                  </div>
                )}
              </Field>
              <Field name="categories">
                {({ input, meta }) => (
                  <div className="edit_categories">
                    <div className="edit_form_subtitle">Categories</div>
                    <Select
                      id="category"
                      value={selectedCategory}
                      select
                      fullWidth={true}
                      multiple={true}
                      label="Select a category"
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                      }}
                    >
                      {categoryOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                )}
              </Field>
              <Field name="description" initialValue={data.description}>
                {({ input, meta }) => (
                  <div className="edit_description">
                    <div className="edit_form_subtitle">Description</div>
                    <TextField
                      {...input}
                      id="title"
                      type="text"
                      fullWidth={true}
                    />
                  </div>
                )}
              </Field>
              <div className="edit_price_inputs">
                <Field
                  name="purchasePrice"
                  initialValue={data.price?.purchasePrice}
                >
                  {({ input, meta }) => (
                    <div>
                      <div className="edit_form_subtitle">Price</div>
                      <TextField {...input} id="purchasePrice" type="number" />
                    </div>
                  )}
                </Field>

                <Field name="rent" initialValue={data.price?.rent}>
                  {({ input, meta }) => (
                    <div>
                      <div className="edit_form_subtitle">Rent</div>
                      <TextField {...input} id="rent" type="number" />
                    </div>
                  )}
                </Field>
                <Field name="rent_rate">
                  {({ input, meta }) => (
                    <div className="edit_form_select_box">
                      <FormControl>
                        <InputLabel>Select option</InputLabel>
                        <Select
                          id="rent_rate"
                          value={selectedTime}
                          size="medium"
                          onChange={(e) => setSelectedTime(e.target.value)}
                          sx={{ width: 200 }}
                        >
                          {rentTime.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  )}
                </Field>
              </div>
            </div>
            <div className="edit_form_button">
              <Button
                type="submit"
                size="medium"
                variant="contained"
                onClick={handleSubmit}
              >
                Edit Product
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default ProductEdit;
