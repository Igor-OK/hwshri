import * as React from 'react';


export function Button ({Class, ButtonHandler}){

    return(
        <div 
            className={Class}  
            onClick = {ButtonHandler}
            style={{
                Display: 'none'
            }}
        >            
        </div>    
    );
}