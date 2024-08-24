import ProductCard from "./productCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // or another date adapter

const ProductShow = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rentModal, setRentModal] = useState(false);
  const [rentFrom, setRentFrom] = useState(null);
  const [rentTo, setRentTo] = useState(null);
  const [data, setData] = useState([]); // Initialize as an empty array

  const buyProduct = () => {
    axios
      .put(`http://localhost:5000/product/${id}/buy`)
      .then((response) => {
        if (response.status === 200) {
          navigate(`/${id}/products`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => setRentModal(false);

  const rentProduct = () => {
    const dateFrom = rentFrom.toISOString();
    const dateTo = rentTo.toISOString();
    axios
      .put(`http://localhost:5000/product/${id}/rent`, { dateFrom, dateTo })
      .then((response) => {
        if (response.status === 200) {
          navigate(`/${id}/products`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((response) => {
        setData([response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]); // Include `id` in the dependency array

  return (
    <div>
      <Modal
        open={rentModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal_style">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="datepicker-wrapper">
              <div className="datepicker-width">
                <div>From</div>
                <DatePicker
                  value={rentFrom}
                  onChange={(newValue) => setRentFrom(newValue)}
                />
              </div>

              <div className="datepicker-width">
                <div>To</div>
                <DatePicker
                  value={rentTo}
                  onChange={(newValue) => setRentTo(newValue)}
                />
              </div>
            </div>
          </LocalizationProvider>
          <div className="rent_modal_button_wrapper">
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                setRentModal(false);
              }}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                rentProduct();
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <div className="product_show_page">
        <ProductCard products={data} />
      </div>

      <div className="input_button">
        <Button
          variant="contained"
          onClick={() => {
            setRentModal(true);
          }}
        >
          Rent
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            buyProduct();
          }}
        >
          Buy
        </Button>
      </div>
    </div>
  );
};

export default ProductShow;
