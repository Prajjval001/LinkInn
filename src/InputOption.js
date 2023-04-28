import { color } from '@mui/system';
import React from 'react';
import './styles/InputOption.css';


function InputOption({ Icon, title, color ,does}) {
  // does(title);
  return (
   
    <div className='inputOption' onClick = {() => does(title)}>
        <Icon style = {{color: color }} />
        <h4>{title}</h4>
    </div>
    
  );
}


export default InputOption;