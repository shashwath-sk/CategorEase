import * as React from 'react';
import search3 from '../../assets/search/search2.png';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { addLabelToFilter, removeLabelFromFilter } from '../../state/Image/imageSearchSlice';
import AssignLabel from '../AssignLabel/assign-label';

export default function SearchField() {

    const dispatch = useDispatch();
    const filters = useSelector((state) => state.search.filters);
    let labels = useSelector((state) => state.labels.labels);

    const[ filteredLabels, setFilteredLabels] = React.useState(labels);

    const hanleLabelUpdate = (label) => {
        if(filters.find(tlabel=> tlabel.toLowerCase() === label.toLowerCase())){
          dispatch(removeLabelFromFilter({label:label}));
        }
        else{
          dispatch(addLabelToFilter({label:label}));
        }
        const filteredLabels = labels.filter((label) => !filters.includes(label));
        setFilteredLabels(filteredLabels);
    }
    return(
        <div className='filter-container'>
            <img src={search3} alt="search" />
            <ul className="input-tag__tags">
              {filters && filters.map((label, i) => (
              <li key={label}>
                {label}
                <button type="button" onClick={() => hanleLabelUpdate(label)}>+</button>
              </li>
              ))}
              <li className="input-tag__tags__input">
                 <AssignLabel labels = {filteredLabels} onSelect={hanleLabelUpdate} display="downwards"/>
              </li>
            </ul>
        </div>
    );

}

