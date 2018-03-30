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
                ButtonHandler={CloseIt}
                Class={"dashboard__closebtn"} 
            />
            <Button 
                ButtonHandler={Next}
                Class={"dashboard__nextbtn"} 
            />
            <Button 
                ButtonHandler={Previous}
                Class={"dashboard__previousbtn"} 
            />   
            <Image 
                Src={Items[Current].media}
            />
         </div>     
    );
}