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
  },[file])

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
        ...prev,
        [name] : value,
        imageUrl: uploadResponse,
    }))
 }


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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-5 shadow-lg w-1/3">
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
      </div>
    </div>
  );
};

export default ModalImage;
