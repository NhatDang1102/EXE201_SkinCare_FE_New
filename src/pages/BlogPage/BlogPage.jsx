import React, { useEffect, useState } from "react";
import "./BlogPage.css";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog list
  useEffect(() => {
    fetch("https://skincareapp.somee.com/SkinCare/Blog")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="skinBlog-root">
      <div className="skinBlog-container">
        <h1 className="skinBlog-title">Skin Care Blogs</h1>
        {loading ? (
          <div className="skinBlog-loading">Loading...</div>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="skinBlog-item">
              <div className="skinBlog-imgBox">
                <img
                  src={blog.product?.imageLink}
                  alt={blog.product?.name}
                  className="skinBlog-img"
                />
              </div>
              <div className="skinBlog-content">
                <a className="skinBlog-postTitle" href={`/blog/${blog.id}`}>
                  {blog.title}
                </a>
                  <div className="skinBlog-desc">
    {blog.content}
  </div>
                <div className="skinBlog-meta">
                  {new Date(blog.createdAt).toLocaleDateString("vi-VN")} | By Team 202
                </div>
                <a
                  className="skinBlog-link"
                  href={blog.externalProductLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Xem sản phẩm
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
