import * as React from 'react';

export function Image ({Src}){

if(!Src){
    return null
}
    return(  
        <div className="image">
             <img src={Src} />
        </div>
    );
}