import * as React from 'react';


export function Card ({Item, OnClick}){

    if(!Item){
        return null
    }

    return(
        <div 
            className="card__image"  
            onClick = {OnClick}
            style={{
                position: 'absolute',
                width: Item.elem_width +'px',
                transform: 'translate3d('+Item.elem_left + 'px, ' + Item.elem_top + 'px, 0px)'
            }}
            >
            <img className = "image__image"
                alt={Item.title}                    
                src={Item.media} 
            />              
        </div>    
    );
}