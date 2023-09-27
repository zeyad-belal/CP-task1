/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react';
import classes from './Profile.module.css';
import { AiOutlinePlus } from "react-icons/ai";


type InputsState = {
  [key: string]: {
    Mandatory: boolean;
    visibility: boolean;
  };
};


export default function Profile() {


  const initialInputs: InputsState = {
    Education: { Mandatory: false, visibility: false },
    Experience: { Mandatory: false, visibility: false },
    Resume: { Mandatory: false, visibility: false },
  };

  const [inputs, setInputs] = useState<InputsState>(initialInputs);


  const handleCheckboxChange = (field: string, type: 'Mandatory' | 'visibility') => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [field]: {
        ...prevInputs[field],
        [type]: !prevInputs[field][type],
      },
    }));
  };




  const renderCheckboxes = (field: string) => {
    const isChecked = inputs[field].visibility;
  
    return (
      <p key={field}>
        {field}
        <span>
          <span>
            <input
              type="checkbox"
              checked={inputs[field].Mandatory}
              onChange={() => handleCheckboxChange(field, 'Mandatory')} />
            Mandatory
          </span>

          <span
            className={isChecked ? classes.active : ''}
            onClick={() => handleCheckboxChange(field, 'visibility')} >
            <input
              type="checkbox"
              checked={isChecked}
            />
          </span>
          {isChecked ? 'Show' : 'Hide'} 
        </span>
      </p>
    );
  };









  return (
    <div className={classes.personalContainer}>
      <h2>Profile</h2>
      <div className={classes.inputs}>

      <label htmlFor="">  
        {renderCheckboxes('Education')} 
        <input type="text" />
      </label>

      <label htmlFor="">  
        {renderCheckboxes('Experience')} 
        <input type="text" />
      </label>

      <label htmlFor="">  
        {renderCheckboxes('Resume')} 
        <input type="text" />
      </label>
        

        <div className={classes.addQ}> <AiOutlinePlus /> Add a question </div>
      </div>

    </div>
  )
}
