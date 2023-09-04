import React from "react";
import "./StoreFilter.css";
import "./Store.jsx";

let StoreFilter = (props) => {
    function onFilterValueChanged(event){
        props.onFilterValueSelected(event.target.value)
    }

    return(<div className="Filter-Products">
        <select name="type" onChange={onFilterValueChanged}>
            <option value="all">All</option>
            <option value="Gaming Mouses">Gaming mouses</option>
            <option value="Gaming Keyboards">Gaming Keyboards</option>
            <option value="Gaming Headphones">Gaming Headphones</option>
            <option value="Gaming pads">Gaming Pads</option>
            <option value="Gaming Controllers">Gaming Controllers</option>
        </select>
    </div>)
}

export default StoreFilter;