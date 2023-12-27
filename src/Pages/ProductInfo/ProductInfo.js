import React, { useState,useEffect } from "react";
import { styled } from "@mui/system";
import { Grid, TextField, Box } from "@mui/material";
import { getItemDetailsById } from "../../Services/Config/config";

const Wrapper = styled("div")`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    110.6deg,
    rgb(184, 142, 252) 2.2%,
    rgb(104, 119, 244) 100.2%
  );
`;

const ProductContainer = styled(Grid)`
  width: 60rem;
  min-height: 25rem;
  overflow: hidden;
  margin: 2rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
`;

const LeftContentContainer = styled(Grid)`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const RightContentContainer = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = () => {
  const [productData, setProductData] = useState({});

  useEffect(() => {

    // const urlParams = new URLSearchParams(window.location.search);
    // const itemId = urlParams.get('itemId');
    const itemId = 699;

    const fetchData = async () => {
      try {
        const data = await getItemDetailsById(itemId);

        // Update productData state with API response
        setProductData({
          productName: data.item_name,
          price: data.costprice,
          brandName: data.brand,
          imageUrl: Array.isArray(data.image) ? data.image.map(imageObject => imageObject.image) : "https://picsum.photos/536/354",
        });
      } catch (error) {
        // Handle error if needed
        console.error('Error in fetchData:', error);
      }
    };

    if (itemId) {
      fetchData();
    }
  }, []);
  const getImageSource = () => {
    if (!productData.images || productData.images.length === 0) {
      return "https://picsum.photos/536/354";
    } else {
      return `data:image/png;base64,${productData.images[0]}`;
    }
  };
  
  return (
    <Wrapper>
      <ProductContainer container>
        {/* Right Content (Product Image) */}
        <RightContentContainer item xs={12} md={6}>
          <ProductImage alt="Product Image" src={getImageSource()} />
        </RightContentContainer>
        {/* Left Content (Product Info) */}
        <LeftContentContainer item xs={12} md={6}>
          <Box m={2}>
            <TextField
              label="Product Name"
              value={productData.productName}
              readOnly
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Price"
              value={productData.price}
              readOnly 
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              label="Brand Name"
              value={productData.brandName}
              readOnly
              variant="outlined"
              fullWidth
            />
          </Box>
        </LeftContentContainer>
      </ProductContainer>
    </Wrapper>
  );
};

export default ProductInfo;
