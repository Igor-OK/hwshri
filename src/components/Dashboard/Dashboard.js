import * as React from 'react';

import {Button} from '../Button/Button';
import {Image} from '../Image/Image';


export function Dashboard ({Items, Opened, Current, CloseIt, Next, Previous}){

if(!Items){
    return null
}


    return(  
        <div className={Opened? "dashboard":"hidden"}>
            <Button 
                onClick={CloseIt}
                Class={"dashboard__closebtn"} 
            />
            <Button 
                onClick={Next}
                Class={"dashboard__nextbtn"} 
            />
            <Button 
                onClick={Previous}
                Class={"dashboard__previousbtn"} 
            />   
            <Image 
                Src={Items[Current].media}
            />
         </div>     
    );
}