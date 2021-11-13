import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { toast } from "react-toastify";

let data;

const Add = (props) => {
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({
    title: "",
    short_description: "",
    description: "",
  });

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const submit = () => {
    const data = {
      title: blog.title,
      description: blog.description,
      img: image,
      short_description: blog.short_description,
    };
    if (blog.title.length > 0 && blog.description.length > 0) {
      props.submit(data);
      setBlog({
        title: "",
        image: "",
        short_description: "",
        description: "",
      });
    } else {
      // toast.error("All Fields are required");
    }
  };
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "himanshuImages");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dse1vv6sd/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();

    console.log(file);

    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <div className="container ">
      <form>
        {loading && (
          <div className="d-flex justify-content-center">
            <div class="spinner-border " role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            name="title"
            value={blog.title}
          />
        </div>{" "}
        <div className="form-group">
          <label>Short Description</label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            name="short_description"
            value={blog.short_description}
          />
        </div>
        <div className="form-group">
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              data = editor.getData();
              setBlog({ ...blog, description: data });
            }}
            name="description"
            value={blog.description}
          />
        </div>{" "}
        <div className="form-group">
          <input
            type="file"
            className="form- "
            name="image"
            placeholder="Upload an Image"
            onChange={uploadImage}
          ></input>
        </div>
        <button
          type="button"
          disabled={!image}
          className="btn btn-success"
          onClick={submit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
