import React, { useEffect, useState } from 'react'
import AssignLabel from '../AssignLabel/assign-label'
import './image-card.css'
import { useDispatch, useSelector } from 'react-redux'
import { addLabel, removeLabel } from '../../state/Image/imagesSlice'
import ReactImageMagnify from 'react-image-magnify';

export const ImageCard= ({image, deleteHandler, isAdmin, isUploading})=>{

  const dispatch = useDispatch();
  const [imageLabels, setImageLabels] = useState();
  const labels = useSelector((state) => state.labels.labels);
  const [filteredLabels, setFilteredLabels] = useState();

  useEffect(()=>{
    const imageLabels = image.labels ||[];
    const filteredLabels = labels.filter(label => !imageLabels.includes(label));
    setFilteredLabels(filteredLabels);
    setImageLabels(imageLabels);
  },[image, labels])

  const hanleLabelUpdate = (label) => {
    if(imageLabels.find(tlabel=> tlabel.toLowerCase() === label.toLowerCase())){
      dispatch(removeLabel({url:image.url, label:label}));
    }
    else{
      dispatch(addLabel({url:image.url, label:label}));
    }
  }

  return (
    <>
      <li className="card">
        <div className="card-image">
          <div className="uploaded-image">
            <ReactImageMagnify {...{
              smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: image.url
              },
              largeImage: {
                  src: image.url,
                  width: 600,
                  height: 800
              },
              enlargedImagePosition: 'over',
              lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' },
              isHintEnabled: true,
               }} 
            />
          </div>
          {isAdmin && <button className="image-delete-button" type="button" onClick={() => deleteHandler(image.url)}>+</button>}
        </div>
        { !isUploading&& 
          <div className="card-description">
            <ul className="input-tag__tags">
              {imageLabels && imageLabels.map((label, i) => (
              <li key={label}>
                {label}    
                <button type="button" onClick={() => hanleLabelUpdate(label)}>+</button>
              </li>
              ))}
              <li className="input-tag__tags__input">
                 <AssignLabel labels = {filteredLabels} onSelect={hanleLabelUpdate}/>
              </li>
            </ul>
          </div> 
        }
      </li>
    </>
  )
}

