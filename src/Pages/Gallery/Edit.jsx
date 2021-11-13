import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { toast } from "react-toastify";

let data;
const Edit = (props) => {
  const [image, setImage] = useState(props.Blog.img);

  const [loading, setLoading] = useState(false);

  const submit = () => {
    props.handleEdit(image);
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
        <div className="form-group">
          <input
            type="file"
            className="form- "
            name="image"
            placeholder="Upload an Image"
            onChange={uploadImage}
          ></input>
        </div>
        <button type="button" className="btn btn-success m-2" onClick={submit}>
          Submit
        </button>
        <button
          type="button"
          className="btn btn-danger m-2"
          onClick={props.cancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Edit;
