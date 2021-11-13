import React, { useState, useEffect } from "react";
import Add from "./Add";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Edit from "./Edit";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
// import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
let data;
// import { getBloglistApi } from "../../apiList";

const Blog = () => {
  const state = useSelector((state) => state.LoginReducer);
  const editor = { ClassicEditor };
  const [images, setImages] = useState([]);
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
          "https://vardaa.herokuapp.com/getAllGallery"
        );
        const val = await response.json();
        console.log(val);
        if (val) {
          setImages(val);
        }
      } catch (error) {
        console.log(error.message);
      }

      setLoading(false);
    })();
  }, []);

  const submit = async (image) => {
    setLoading(true);
    const response1 = await fetch(
      "https://vardaa.herokuapp.com/createGallery",
      {
        method: "POST",
        body: JSON.stringify(image),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const val = await response1.json();
    if (val) {
      const data = [...images];
      data.push(image);
      // toast("Blog Added Successfully");
      setImages(data);
    }
    setLoading(false);
    setShow(!show);
  };

  const handleDelete = async (i, id) => {
    setLoading(true);
    const response2 = await fetch(
      `https:vardaa.herokuapp.com/deleteGallery/${id}`,
      {
        method: "DELETE",
      }
    );
    const val1 = await response2.json();

    //   .then((res) => res.json())
    //   .catch((err) => console.log(err));

    if (val1) {
      const d1 = [...images];
      d1.splice(i, 1);
      // toast("Blog Deleted Successfully");
      setImages(d1);
    }
    setLoading(false);
  };

  const handleEdit = async (image, e) => {
    setLoading(true);
    const response2 = await fetch(
      `https:vardaa.herokuapp.com/editBlog/${editBlog._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(image),
      }
    );
    const val2 = await response2.json();

    //   .then((res) => res.json())
    //   .catch((err) => console.log(err));
    if (val2) {
      const value = [...images];
      value[i] = image;
      setImages(value);
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
        <h4 className="text-center">Gallery</h4>
        <div className="d-flex justify-content-end">
          {!edit && (
            <button className="btn btn-primary" onClick={() => setShow(!show)}>
              {show ? "X" : "Add Images"}
            </button>
          )}
        </div>

        {show && <Add submit={(image) => submit(image)} />}
        <br />
        <br />
        {edit && (
          <Edit
            Blog={editBlog}
            cancel={() => setEdit(!edit)}
            handleEdit={(image) => handleEdit(image)}
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
              <div className="row">
                {images?.map((image, i) => (
                  <div className="container1 col-lg-4 col-md-6">
                    <div className="card1 ">
                      <div className="card__header1">
                        <img
                          src={image.img}
                          alt="card__image"
                          className="card__image1 img1"
                          width={600}
                          height={200}
                        />
                      </div>
                      <div className="d-flex justify-content-center mx-2 my-2">
                        <button
                          className="btn btn-success mx-2"
                          onClick={() => {
                            setEditBlog(image);
                            setEdit(true);
                            setI(i);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(i, image._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
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
