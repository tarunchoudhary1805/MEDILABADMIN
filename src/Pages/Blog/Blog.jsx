import React, { useState, useEffect } from "react";
import Add from "./Add";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Edit from "./Edit";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
// import { toast } from "react-toastify";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
let data;
// import { getBloglistApi } from "../../apiList";

const Blog = () => {
  const state = useSelector((state) => state.LoginReducer);
  const editor = { ClassicEditor };
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editBlog, setEditBlog] = useState();
  const [show, setShow] = useState(false);
  const [i, setI] = useState();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await fetch(
          "https://vardaa.herokuapp.com/getAllBlogs"
        );
        const val = await response.json();
        console.log(val);
        if (val) {
          setBlogs(val);
        }
      } catch (error) {
        console.log(error.message);
      }

      setLoading(false);
    })();
  }, []);

  const submit = async (blog) => {
    setLoading(true);
    const response1 = await fetch("https://vardaa.herokuapp.com/createBlog", {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "content-type": "application/json",
      },
    });
    const val = await response1.json();
    if (val) {
      const data = [...blogs];
      data.push(blog);
      // toast("Blog Added Successfully");
      setBlogs(data);
    }
    setLoading(false);
    setShow(!show);
  };

  const handleDelete = async (i, id) => {
    setLoading(true);
    const response2 = await fetch(
      `https:vardaa.herokuapp.com/deleteBlog/${id}`,
      {
        method: "DELETE",
      }
    );
    const val1 = await response2.json();

    //   .then((res) => res.json())
    //   .catch((err) => console.log(err));

    if (val1) {
      const d1 = [...blogs];
      d1.splice(i, 1);
      // toast("Blog Deleted Successfully");
      setBlogs(d1);
    }
    setLoading(false);
  };

  const handleEdit = async (blog, e) => {
    setLoading(true);
    const response2 = await fetch(`https:vardaa.herokuapp.com/updateBlogs`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    const val2 = await response2.json();

    //   .then((res) => res.json())
    //   .catch((err) => console.log(err));
    if (val2) {
      const value = [...blogs];
      value[i] = blog;
      setBlogs(value);
      setLoading(false);
      setEdit(false);
    }
  };
  if (!state.isAuth) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div className="container border p-2">
        {/* <ToastContainer /> */}
        <h4 className="text-center">Blogs</h4>
        <div className="d-flex justify-content-end">
          {!edit && (
            <button className="btn btn-primary" onClick={() => setShow(!show)}>
              {show ? "X" : "Add Blog"}
            </button>
          )}
        </div>

        {show && <Add submit={(blog) => submit(blog)} />}
        <br />
        <br />
        {edit && (
          <Edit
            Blog={editBlog}
            cancel={() => setEdit(!edit)}
            handleEdit={(blog) => handleEdit(blog)}
          />
        )}
        <div className="text-center">
          {loading && (
            <div class="spinner-border text-center" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          )}
        </div>
        <div>
          {!show && !edit && (
            <ol>
              <div class="row">
                {blogs?.map((blog, i) => (
                  <>
                    {" "}
                    <div className="container1 col-lg-4 col-md-6">
                      <div className="card1 ">
                        <div className="card__header1">
                          <img
                            src={blog.img}
                            alt="card__image"
                            className="card__image1 img1"
                            width={600}
                          />
                        </div>
                        <div className="card__body1">
                          <h4>
                            <b>{blog.title.slice(0, 30)}</b>
                          </h4>
                          <p className="text-secondary">
                            {blog.short_description?.length > 40
                              ? `${blog.short_description.slice(0, 40)} . . . `
                              : blog.short_description}
                          </p>
                        </div>
                        <div className="d-flex my-2 mx-2  justify-content-start">
                          <div className="d-flex">
                            <button
                              className="btn btn-success mx-2"
                              onClick={() => {
                                setEditBlog(blog);
                                setEdit(true);
                                setI(i);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => handleDelete(i, blog._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </ol>
          )}
        </div>
      </div>
    );
  }
};

export default Blog;
