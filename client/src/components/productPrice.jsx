import {
  Button,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useForm } from "./Formcontext";

const ProductPrice = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useForm();
  const rentTime = ["perHour", "perDay", "perMonth"];
  const [selectedTime, setSelectedTime] = useState([]);
  const [price, setPrice] = useState("");
  const [rentRate, setRentRate] = useState("");

  return (
    <>
      <div className="product_price">
        <div className="input_title">Select Price</div>
        <div className="product_input_rent">
          <TextField
            id="rent"
            type="number"
            size="small"
            defaultValue="50"
            value={rentRate}
            onChange={(e) => setRentRate(e.target.value)}
          />
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
        <div className="product_input_purchase_price">
          <TextField
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Purchase Price" // Added placeholder
            size="medium"
            fullWidth={true} // Added fullWidth
          />
        </div>
      </div>
      <div className="input_button_price">
        <Button
          variant="contained"
          onClick={() => {
            navigate("/create_products/description");
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setFormData((prevData) => ({
              ...prevData,
              price: {
                purchase_price: price,
                rent_rate: rentRate,
                validity: selectedTime,
              },
            }));
            navigate("/create_products/summary");
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default ProductPrice;
