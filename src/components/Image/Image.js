import * as React from 'react';

export function Image ({Src}){

if(!Src){
    return null
}
    return(  
        <div className="image"
            >
             <img 
                className="image__image" 
                src={Src}
                alt=''
            />
        </div>
    );
}