import * as React from 'react';


export function Card ({Item, OnClick}){

    if(!Item){
        return null
    }

    return(
        <div 
            className="card__image"  
            key={Item._id} 
            onClick = {OnClick}
            style={{
                position: 'absolute',
                width: Item.elem_width +'px',
                top: Item.elem_top +'px',
                left: Item.elem_left +'px'
            }}
            >
            <img className = "image__image"
                alt={Item.title}                    
                src={Item.media} 
            />              
        </div>    
    );
}