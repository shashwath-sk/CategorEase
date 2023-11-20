import { useAuth0 } from "@auth0/auth0-react";
import React, {useState, useEffect} from "react";
import { PageLayout } from "../components/page-layout";
import {ImageCard} from "../components/ImageCard/image-card";
import { useDispatch, useSelector } from "react-redux";
import {addImage} from "../state/Image/imagesSlice";
import { addLabel } from "../state/Labels/labelsSlice";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/pagination";


export const UploadImagesPage = () => {
  const { user } = useAuth0();
  const [selectedImages, setSelectedImages] = useState([]);
  const [patientId, setPatientId] = useState("");
  const navigate = useNavigate();
  const allLabels = useSelector((state) => state.labels.labels);

  const dispatch = useDispatch();
  let images = useSelector((state) => state.images.images);
  const [filteredImages, setFilteredImages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  useEffect(() => {
    const filteredImages = selectedImages.slice(firstPostIndex, lastPostIndex);
    setFilteredImages(filteredImages);
  }, [selectedImages, currentPage, postsPerPage])

  useEffect(() => {
    localStorage.setItem("labels", JSON.stringify(allLabels));
    localStorage.setItem("images", JSON.stringify(images));
  }, [allLabels, images]);

  if (!user) {
    return null;
  }

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    event.target.value = "";
  };

  const deleteHandler= (image)=>{
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const uploadHandler = () => {
    selectedImages.forEach((imageUrl) => {
      const labels = [patientId];
      const imageObject = { url: imageUrl, labels: labels };

      dispatch(addImage(imageObject));
    });
    dispatch(addLabel(patientId));
    setPatientId("");
    navigate("/CategorEase/admin");
  }

  return (
    <PageLayout>
      <div className="content-layout">
        <label id="page-title" className="upload-image-title">
        + Upload Images
        <br />
        <input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
        </label>
        <div className="content__body">
        <ul class="card-list">
          {filteredImages && filteredImages.map((image) => (
            <ImageCard image={{url:image}} deleteHandler={deleteHandler} isAdmin={true} isUploading={true}/>
          ))}
        </ul>
        {selectedImages.length > 0 &&
        <>
        <label>Patient Id</label>
            <input
              type="text"
              placeholder="Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
            {!patientId.trim() && (
              <p className="validation-message">Patient ID is required.</p>
            )}

          <button
            className="upload-btn"
            onClick={() => {
              uploadHandler();
            }}
            >
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </button>
        </>
        }
        {selectedImages.length>0 &&
          <Pagination
          totalPosts={selectedImages.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          />
        }
        </div>
      </div>
    </PageLayout>
  );
};
