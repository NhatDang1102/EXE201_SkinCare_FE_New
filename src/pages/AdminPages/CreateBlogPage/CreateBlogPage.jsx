import BGImage from "../../../components/BGImage/BGImage";
import React, { useState, useEffect } from "react";
import "./CreateBlogPage.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateBlogPage() {
  const { scrollYProgress } = useScroll();
  const position = useTransform(scrollYProgress, [0, 0.3], ["0%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [productId, setProductId] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoImage, setAutoImage] = useState("");

  useEffect(() => {
    fetch("https://skincareapp.somee.com/SkinCare/Product")
      .then(res => res.json())
      .then(data => setAllProducts(data));

    fetch("https://skincareapp.somee.com/SkinCare/Category")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const filteredProducts = selectedCategory
    ? allProducts.filter(p =>
        p.categories.some(c => c.id === selectedCategory)
      )
    : allProducts;

  useEffect(() => {
    if (!productId) {
      setAutoImage("");
      setLink("");
      return;
    }
    const prod = allProducts.find(p => p.id === productId);
    if (prod) {
      setLink(prod.productLink || "");
      setAutoImage(prod.imageLink || "");
    }
  }, [productId, allProducts]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !productId) {
      toast.warning("Please fill all fields and select a product.");
      return;
    }
    setLoading(true);
    const payload = {
      title,
      content,
      productId,
      externalProductLink: link
    };
    const resp = await fetch("https://skincareapp.somee.com/SkinCare/Blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include"
    });
    setLoading(false);
    if (resp.ok) {
      toast.success("Create Blog Successfully!");
      setTitle("");
      setContent("");
      setLink("");
      setProductId("");
      setAutoImage("");
      setSelectedCategory("");
    } else {
      toast.error("Create blog failed!");
    }
  };

  return (
    <div className="createBlogPage-admin">
      <BGImage />
      <motion.form
        className="adminBlogForm"
        onSubmit={handleSubmit}
        style={{ y: position, scale, opacity }}
      >
        <h2 className="adminBlogTitle">Create Blog</h2>
        <div className="adminBlogImages">
          {autoImage && (
            <div className="adminPreviewImgBox">
              <img src={autoImage} alt="product-preview" className="adminPreviewImg" />
            </div>
          )}
        </div>

        <div className="adminBlogLabel">Select category</div>
        <select
          className="adminBlogProduct"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">--  All categories --</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <div className="adminBlogLabel">Select product</div>
        <select
          className="adminBlogProduct"
          value={productId}
          onChange={e => setProductId(e.target.value)}
          disabled={!filteredProducts.length}
        >
          <option value="">-- Select Product --</option>
          {filteredProducts.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <div className="adminBlogLabel">Blog Information</div>
        <input
          className="adminBlogInput"
          type="text"
          placeholder="Title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="adminBlogTextarea"
          placeholder="Content here..."
          rows={5}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="adminBlogLabel">Link</div>
        <input
          className="adminBlogInput"
          placeholder="url..."
          value={link}
          onChange={e => setLink(e.target.value)}
        />
        <button className="adminBlogSubmit" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </motion.form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}
