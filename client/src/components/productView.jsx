import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ProductCard from "./productCard.jsx";
import { Tab, Tabs } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useParams } from "react-router-dom";

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productCollection, setProductCollection] = useState([]);
  const [isDeleted, setIsDeleted] = useState();

  const [currentTabIndex, setCurrentTabIndex] = useState(1);

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

  const handleLogOut = () => {
    axios
      .get("http://localhost:5000/logout")
      .then((response) => {
        if (response.status === 200) {
          navigate(`/`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentTabIndex === 1) {
      axios
        .get(`http://localhost:5000/${id}/products`)
        .then((data) => {
          setProductCollection(data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (currentTabIndex === 2) {
      axios
        .get("http://localhost:5000/all-products")
        .then((data) => {
          setProductCollection(data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [isDeleted, currentTabIndex]);

  return (
    <div className="product_view_page">
      <TabContext value={currentTabIndex}>
        <TabList onChange={handleTabChange} variant="fullWidth">
          <Tab label="My Products" value={1} />
          <Tab label="All products" value={2} />
        </TabList>

        <div className="logout-button">
          <Button
            variant="contained"
            onClick={() => {
              handleLogOut();
            }}
          >
            LogOut
          </Button>
        </div>

        <TabPanel value={1}>
          <div className="view-wrapper">
            <div className="view_main_heading">My Products</div>

            <ProductCard
              products={productCollection}
              currentTabIndex={currentTabIndex}
              setIsDeleted={setIsDeleted}
            />
            <div className="add_product_button">
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/create_products/title");
                }}
              >
                Add Product
              </Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={2}>
          <div className="view-wrapper">
            <div className="view_main_heading">All Products</div>

            <ProductCard products={productCollection} />
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default ProductView;
