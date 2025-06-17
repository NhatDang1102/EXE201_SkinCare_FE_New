
import React, { useEffect, useState } from "react";
import BGImage from "../../../components/BGImage/BGImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ListBlogPage.css";

export default function ListBlogPage() {
  const { scrollYProgress } = useScroll();
  const position = useTransform(scrollYProgress, [0, 0.3], ["0%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.85]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBlogs = () => {
    setLoading(true);
    fetch("https://skincareapp.somee.com/SkinCare/Blog")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Xoá blog
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa blog này?")) return;
    try {
      const resp = await fetch(`https://skincareapp.somee.com/SkinCare/Blog/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      if (resp.ok) {
        toast.success("Xóa blog thành công!");
        fetchBlogs();
      } else {
        toast.error("Xóa blog thất bại!");
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra khi xóa!");
    }
  };

  // Chuyển trang Edit Blog (giả sử đã có trang này)
  const handleEdit = (id) => {
    window.location.href = `/AdminPage/EditBlogPage/${id}`;
  };

  return (
    <div className="listBlogPage-admin">
      <BGImage />
      <motion.div
        className="adminBlogListContainer"
        style={{ y: position, scale, opacity }}
      >
        <h2 className="adminBlogTitle">Quản lý Blog</h2>
        {loading ? (
          <div className="adminBlogLoading">Đang tải...</div>
        ) : blogs.length === 0 ? (
          <div className="adminBlogNoData">Chưa có blog nào.</div>
        ) : (
          <div className="adminBlogList">
            {blogs.map((blog) => (
              <div className="adminBlogListItem" key={blog.id}>
                <div className="adminBlogListImageBox">
                  <img
                    src={blog.product?.imageLink}
                    alt={blog.product?.name}
                    className="adminBlogListImage"
                  />
                </div>
                <div className="adminBlogListContent">
                  <div className="adminBlogListTitle">{blog.title}</div>
                  <div className="adminBlogListDesc">{blog.content}</div>
                  <a
                    href={blog.externalProductLink}
                    className="adminBlogListLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {blog.externalProductLink}
                  </a>
                  <div className="adminBlogListMeta">
                    <span>
                      {new Date(blog.createdAt).toLocaleString("vi-VN", {
                        hour12: false,
                        timeZone: "Asia/Ho_Chi_Minh",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                    <span className="adminBlogListProduct">
                      {blog.product?.name}
                    </span>
                  </div>
                  <div className="adminBlogListActions">
                    <button
                      className="adminBlogListBtn adminBlogListEdit"
                      onClick={() => handleEdit(blog.id)}
                    >
                      Sửa
                    </button>
                    <button
                      className="adminBlogListBtn adminBlogListDelete"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Xoá
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}
