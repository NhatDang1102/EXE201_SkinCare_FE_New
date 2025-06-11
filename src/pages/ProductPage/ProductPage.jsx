import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";

export default function ProductPage() {
  const { productId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch("https://skincareapp.somee.com/SkinCare/Blog")
      .then((res) => res.json())
      .then((blogs) => {
        const found = blogs.find(
          (item) => item.product && item.product.id === productId
        );
        setBlog(found);
      });
  }, [productId]);

  if (!blog) return <div style={{ textAlign: "center" }}>Loading...</div>;
  const product = blog.product;

  return (
    <div className="productpage-root">
    <div className="productpage-section1">
  <div className="productpage-category">SKIN CARE BLOGS</div>
  <h1 className="productpage-title">{blog.title}</h1>
    {product.imageLink && (
    <div className="productpage-imgBox">
      <img
        src={product.imageLink}
        alt={product.name}
        className="productpage-img"
      />
    </div>
  )}
  {blog.content && (
    <div className="productpage-summary">{blog.content}</div>
  )}


</div>
      {/* PHẦN 2 */}
      <div className="product-ecom-container">
        {/* Ảnh sản phẩm */}
        <div className="product-ecom-gallery">
          <img
            src={product.imageLink}
            alt={product.name}
            className="product-ecom-mainimg"
          />
        </div>
        {/* Thông tin và mua hàng */}
        <div className="product-ecom-info">
          <div className="product-ecom-brand">SKINCARE</div>
          <h1 className="product-ecom-title">{product.name}</h1>
          <div className="product-ecom-desc">{product.description}</div>
          <div className="product-ecom-price">
            {product.price ? `$${product.price.toFixed(2)}` : "Liên hệ"}
          </div>
           <a
      className="product-ecom-addcart"
      href={product.productLink || "#"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="cart-icon">🛒</span> Buy Now
    </a>
        </div>
      </div>
    </div>
  );
}
