import { useAuth0 } from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";
import { PageLayout } from "../components/page-layout";
import {ImageCard} from "../components/ImageCard/image-card";
import { useSelector } from "react-redux";
import Pagination from "../components/pagination";
import { useDispatch } from "react-redux";
import {addImage} from "../state/Image/imagesSlice";
import { addLabel } from "../state/Labels/labelsSlice";

export const ProfilePage = () => {
  const { user } = useAuth0();
  
  const dispatch = useDispatch();
  let images = useSelector((state) => state.images.images);
  const labels = useSelector((state) => state.labels.labels);
  const filters = useSelector((state) => state.search.filters);
  const [filteredImages, setFilteredImages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  useEffect(()=>{
    if (images.length === 0) {
      const imagesFromLocalStorage = JSON.parse(
        localStorage.getItem("images")
      );
      if (imagesFromLocalStorage) {
        imagesFromLocalStorage.forEach((image) => {
          dispatch(addImage({ url: image.url, labels: image.labels }));
        });
      }
    }
    if (labels.length === 0) {
      const labelsFromLocalStorage = JSON.parse(
        localStorage.getItem("labels")
      );
      if (labelsFromLocalStorage) {
        labelsFromLocalStorage.forEach((label) => {
          dispatch(addLabel(label));
        });
      }
    }
  },[]);

  useEffect(() => {
    images = images.filter((image) => {
      if (filters.length === 0) {
        return true;
      }
      return filters.every((filter) => image.labels.includes(filter));
    });
    const filteredImages = images.slice(firstPostIndex, lastPostIndex);
    setFilteredImages(filteredImages);
  }, [images, filters, currentPage, postsPerPage])

  if (!user) {
    return null;
  }

  return (
    <PageLayout>
      <div className="content__body">
        <ul class="card-list">
          {filteredImages&&filteredImages.map((image) => (
            <ImageCard image={image} isAdmin={false} isUploading={false}/>
          ))}
        </ul>
      </div>
      {images.length>0 && <Pagination
          totalPosts={images.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
      />}
    </PageLayout>
  );
};
