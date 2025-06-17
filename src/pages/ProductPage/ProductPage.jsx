import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import TrustedBrand from "../../assets/trusted_brand_icon.png"
import LeavesBg from "../../assets/—Pngtree—leaves_5636474.png"

export default function ProductPage() {
  const { productId } = useParams();
  const [blog, setBlog] = useState(null);
  const [reviews, setReviews] = useState([]);
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
  useEffect(() => {
    if (!blog) return;
    fetch(`https://skincareapp.somee.com/SkinCare/Blog/Comment/blog/${blog.id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [blog]);

  if (!blog) return <div style={{ textAlign: "center" }}>Loading...</div>;
  const product = blog.product;
  const total = reviews.length;
  const avg = 5;
  const count = [total, 0, 0, 0, 0];; // [1*,2*,3*,4*,5*]
  return (
    <div className="productpage-root">
      <img className="bg-leaves" src={LeavesBg} alt="" />
      <div id="leaves">
        <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> 
      </div>
      <div className="productpage-section1">
        <div className="productpage-category">SKIN CARE BLOGS</div>
        <div className="productpage-item-box">
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
          <img className="trustedBrandIcon" src={TrustedBrand} alt="" />
          <div className="rippleContainer"><div class="wave"></div></div>
          <div className="rippleContainer2"><div class="wave"></div></div>
        </div>
      </div>

      {}
      <div className="product-ecom-container">
        <div className="product-ecom-gallery">
          <img
            src={product.imageLink}
            alt={product.name}
            className="product-ecom-mainimg"
          />
        </div>
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

      {}
      <div className="product-review-section">
        {}
        <div className="review-summary">
          <div className="review-title">Customer Reviews</div>
          <div className="review-stars">
            <span className="stars">{'★★★★★'}</span>
            <span className="review-avg">{avg}</span>
          </div>
          <div className="review-total">{total} reviews</div>
         <div className="review-bars">
        {[5, 4, 3, 2, 1].map((star, i) => (
          <div className="review-bar-row" key={star}>
            <span className="star-num">{star} ★</span>
            <div className="bar-bg">
              <div
                className="bar-fill"
                style={{
                  width:
                    total === 0
                      ? "0%"
                      : `${Math.round((count[i] / total) * 100)}%`,  // <--- Sửa thành count[i]
                }}
              ></div>
            </div>
            <span className="star-cnt">{count[i]}</span>
          </div>
        ))}
      </div>
          <a className="review-create" href="#review-form">
            CREATE A REVIEW
          </a>
        </div>
        {/* Cột phải: Review chi tiết */}
        <div className="review-detail">
          <div className="review-detail-title">Top Customer Reviews</div>
          <div className="review-detail-note">
            Reviews and results may vary from person to person. Customer reviews are and do not represent the views of The Hut Group.
          </div>
          <hr />
          {reviews.length === 0 && <div className="review-empty">No reviews yet.</div>}
          {reviews.map((rev) => (
            <div className="review-item" key={rev.id}>
              <div className="review-item-row">
                <img src={rev.user_Avatar} alt={rev.user_Name} className="review-avatar" />
                <div className="review-main">
                  <div className="review-username">{rev.user_Name}</div>
                  <div className="review-rating">★★★★★</div>
                  <div className="review-text">{rev.commentText}</div>
                  <div className="review-date">
                    {new Date(rev.createdAt).toLocaleDateString("en-CA")}
                    <span className="review-verified">  ** Verified Purchase **</span>
                  </div>
                  <div className="review-helpful">
                    Was this helpful?
                    <div className="helpful-btn-group">
                      <button className="helpful-btn helpful-yes">
                        <span className="helpful-icon">👍</span> <b>YES (0)</b>
                      </button>
                      <button className="helpful-btn helpful-no">
                        <span className="helpful-icon">👎</span> <b>NO (0)</b>
                      </button>
                    </div>
                  </div>

                  <a href="#" className="review-report">REPORT THIS REVIEW</a>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
