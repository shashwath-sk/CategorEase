import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addLabel, removeLabel } from "../../state/Labels/labelsSlice";
import {removeLabel as removeImageLabel} from "../../state/Image/imagesSlice";

const LabelModel = ({setShowUploadModal}) => {

  const tags = useSelector((state) => state.labels.labels);
  const images = useSelector((state) => state.images.images);
  const [tagInputValue, setTagInputValue] = useState('');
  const dispatch = useDispatch();

  const removeTag = (label) => {
    dispatch(removeLabel(label));
    // should remove above label from all images lable array
    images.forEach(image => {
      dispatch(removeImageLabel({url:image.url, label:label, isAdmin:true}));
    });
  };

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      dispatch(addLabel(val));
      setTagInputValue('');
    } else if (e.key === 'Backspace' && !val) {
      dispatch(removeLabel(tags[tags.length - 1]));
    }
  };

  useEffect(() => {
    console.log(tags);
  }
  ,[tags]);

  return (

    <div className="modal" onClick={()=>{setShowUploadModal(false)}}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <span className='modal-title'>Labels</span>
                </div>
                <div className='modal-body'>
                  <div className="input-tag">
                    <ul className="input-tag__tags">
                      {tags.map((tag, i) => (
                        <li key={tag}>
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)}>+</button>
                        </li>
                      ))}
                      <li className="input-tag__tags__input">
                        <input type="text" onKeyDown={inputKeyDown} value={tagInputValue} onChange={(e) => setTagInputValue(e.target.value)} />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='modal-footer'>
                    <button onClick={()=>{setShowUploadModal(false)}} className='modal-close-button'>Close</button>
                    {/* <button className='modal-create-button' onClick={handleOperations} >{operation}</button> */}
                </div>
            </div>
      </div>
   
  );
};

export default LabelModel;
