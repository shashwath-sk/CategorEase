import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"; 
import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { getAdminResource } from "../services/message.service";
import { PageLoader } from "../components/page-loader";
import { useDispatch, useSelector } from "react-redux";
import {setRole} from "../state/User/userSlice";
import {ImageCard} from "../components/ImageCard/image-card";
import {removeImage} from "../state/Image/imagesSlice";
import Pagination from "../components/pagination";
import { addLabel } from "../state/Labels/labelsSlice";
import { addImage } from "../state/Image/imagesSlice";


export const AdminPage = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.user.role);
  
  const { getAccessTokenSilently } = useAuth0();

  const dispatch = useDispatch();

  let images = useSelector((state) => state.images.images);
  const labels = useSelector((state) => state.labels.labels);
  const filters = useSelector((state) => state.search.filters);
  const [filteredImages, setFilteredImages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const deleteHandler= (url)=>{
    dispatch(removeImage({url:url}));
  }

  useEffect(() => {
    if(images.length>0 && labels.length>0)
    {
      localStorage.setItem("labels", JSON.stringify(labels));
      localStorage.setItem("images", JSON.stringify(images));
   }
  }, [labels, images]);


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

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      console.log(accessToken,"accestoken");
      const { data, error } = await getAdminResource(accessToken);
      if (!isMounted) {
        return;
      }
     
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

      if(data){
        if (data.text === "admin") {
          dispatch(setRole("admin"));
          navigate("/CategorEase/admin");
        }
      }else{
        dispatch(setRole("user"));
        navigate("/CategorEase/user");
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
        dispatch(setRole("user"));
        navigate("/CategorEase/user");
      }
    };
    console.log(userRole,"userRole");
    if(userRole!=="admin"){
      getMessage();
    }

    return () => {
      isMounted = false;
    };
  }, []);


  return userRole!=null? (
    <PageLayout>
      <div className="content__body">
        <ul class="card-list">
          {filteredImages && filteredImages.map((image) => (
            <ImageCard image={image}  isAdmin={true} isUploading={false} deleteHandler={deleteHandler}/>
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
    
  ):
  <div className="page-layout">
        <PageLoader />
      </div>
};
