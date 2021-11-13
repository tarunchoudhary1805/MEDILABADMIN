import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { toast } from "react-toastify";

let data;

const Add = (props) => {
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = () => {
    const data = {
      img: image,
    };

    props.submit(data);
    setImage("");
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
          className="btn btn-success"
          disabled={!image}
          onClick={submit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
