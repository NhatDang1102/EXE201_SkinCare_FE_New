import React, { useEffect, useState } from "react";
import "./BlogPage.css";
import { Link } from "react-router-dom";
export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    useEffect(() => {
        fetch("https://skincareapp.somee.com/SkinCare/Blog")
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .finally(() => setLoading(false));
    }, []);

    const totalPages = Math.ceil(blogs.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentBlogs = blogs.slice(startIdx, endIdx);

    return (
        <div className="skinBlog-root">
            <div className="skinBlog-container">
                <h1 className="skinBlog-title">Skin Care Blogs</h1>
                {loading ? (
                    <div className="skinBlog-loading">Loading...</div>
                ) : (
                    <>
                        {currentBlogs.map((blog) => (
                            <div key={blog.id} className="skinBlog-item">
                                <div className="skinBlog-imgBox">
                                    <img
                                        src={blog.product?.imageLink}
                                        alt={blog.product?.name}
                                        className="skinBlog-img"
                                    />
                                </div>
                                <div className="skinBlog-content">
                                    <Link className="skinBlog-postTitle" to={`/product/${blog.product?.id}`}>
                                        {blog.title}
                                    </Link>
                                    <div className="skinBlog-desc">
                                        {blog.content}
                                    </div>
                                    <div className="skinBlog-meta">
                                        {new Date(blog.createdAt).toLocaleDateString("vi-VN")} | By Team 202
                                    </div>
                                  
                                </div>
                            </div>
                        ))}
                        <div className="skinBlog-pagination">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="skinBlog-pagination-btn"
                            >
                                &laquo;
                            </button>
                            <span className="skinBlog-pagination-text"> PAGE  {currentPage}</span>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="skinBlog-pagination-btn"
                            >
                                &raquo;
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
