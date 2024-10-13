// components/Modal.js
import { uploadImage } from "@/redux/slice/uploadImageSlice";
import { getToken } from "@/utils/token";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalImage = ({ isVisible, onClose, onSubmit }) => {
  if (!isVisible) return null;
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const token = getToken();
  const { loading, error, uploadResponse } = useSelector((state) => state.upload);

  const [formData, setFormData] = useState({
    imageUrl: '',
    caption: '',
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
    useEffect(() => {
      if(file){
        dispatch(uploadImage(file, 'upload-image', token))
      }
    },[file, dispatch, token])

    useEffect(() => {
      if (uploadResponse) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: uploadResponse,
        }));
      }
    }, [uploadResponse]);
  

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
        ...prev,
        [name] : value,
        imageUrl: uploadResponse,
    }))
 }


 useEffect(() => {
  if (!isVisible) {
    // Reset everything when modal is closed
    setFile(null);
    setFormData({
      imageUrl: '',
      caption: '',
    });
  }
}, [dispatch]);

  const handleSubmit = (e) => {
    const {name, value} = e.target
      setFormData((prev) => ({
        ...prev,
        [name] : value,
        imageUrl: uploadResponse,
    }))
    onSubmit(formData);

    onClose();
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex  items-center justify-center p-4">
      <div className="w-1/3 flex justify-start flex-col items-start bg-white">
      {uploadResponse ? <img src={uploadResponse } alt="" className="h-96 w-full object-contain" /> : 
        <label for="uploadFile1"
          className="bg-white text-gray-500 font-semibold text-base rounded w-full h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif] ">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000" />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000" />
            </svg>
            Upload file

          <input type="file" id='uploadFile1' onChange={handleFileChange} className="hidden" />
          <p class="text-xs font-medium text-gray-400 mt-2">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
        </label> }
      <textarea
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            placeholder="Add a caption"
            className="w-full mt-2 border rounded mb-4"
      />
      <div className="">
      <button
            type="submit"
            className=" text-white px-4 py-2 left-0 bg-blue hover:bg-blue2"
          >
            Upload
          </button>
          <button
            type="button"
            onClick={onClose}
            className=" text-white px-4 py-2 ml-2 bg-red"
          >
            Cancel
          </button>
      </div>
      
      </div>

      

   
      {/* <div className="bg-white rounded-lg p-5 shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Upload Image</h2>
        <form onSubmit={handleSubmit}>
          {uploadResponse ? 
          <img src={uploadResponse } alt="" className="w-24 h-24 bg-cover" />: <input
            type="file"
            name="image"
            accept="image/*"
            className="mb-4"
            onChange={handleFileChange}
            required
          /> }
          
          <textarea
            type="text"
            name="caption"
            // value={formData.caption}
            onChange={handleChange}
            placeholder="Add a caption..."
            className="w-full h-24 border rounded p-2 mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div> */}
    </div>
    </form>
    </>
  );
};

export default ModalImage;
