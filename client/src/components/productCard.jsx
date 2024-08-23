const ProductCard = ({ products }) => {
  return (
    <div>
      {products.map((product, index) => (
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
    </div>
  );
};
