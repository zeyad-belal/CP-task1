/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState } from 'react';
import classes from './PersonalInfo.module.css';
import { AiOutlinePlus } from 'react-icons/ai';
import AddQ from '../AddQ/AddQ';

type InputsState = {
  [key: string]: {
    internal: boolean;
    visibility: boolean;
  };
};

export default function PersonalInfo() {
  const [extraQs, setExtraQs] = useState<object[]>([]);
  const [AddingQ, setAddingQ] = useState<boolean>(false);
  const [choices, setChoices] = useState<string[]>([]);

  const initialInputs: InputsState = {
    Phone: { internal: false, visibility: false },
    Nationality: { internal: false, visibility: false },
    'Current Residence': { internal: false, visibility: false },
    'Id Number': { internal: false, visibility: false },
    'Date of Birth': { internal: false, visibility: false },
    Gender: { internal: false, visibility: false },
  };
  const [inputs, setInputs] = useState<InputsState>(initialInputs);




  const handleCheckboxChange = (field: string, type: 'internal' | 'visibility') => {
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
      <p key={field} className={classes.labelLike}>
        <p className={classes.fieldtitle}>  {field} 
        <span>
          <span>
            <input
              type="checkbox"
              checked={inputs[field].internal}
              onChange={() => handleCheckboxChange(field, 'internal')} />
            Mandatory
          </span>

          <span
            className={isChecked ? classes.active : ''}
            onClick={() => handleCheckboxChange(field, 'visibility')} >
            <input
              type="checkbox"
              checked={isChecked} className={classes.checkHidden} />
          </span>
          {isChecked ? 'Show' : 'Hide'} 
        </span>
        </p>
        <input type="text" className={classes.checkField} />

      </p>
    );
  };
  
  
  function getExtraQsData(Q:object){
    setExtraQs(prevValues => [...prevValues, Q])
  }

  function addingStateDone(){
    setAddingQ(false)
  }


function addChoice(e:Event){
  const input = e.target.parentNode.parentNode.children[0].value;
  setChoices(prev => [...prev , input])
}


  const handleSubmit = () => {
    // Gather data from inputs
    const dataToSend = Object.keys(inputs).map((field) => ({
      field,
      internal: inputs[field].internal,
      visibility: inputs[field].visibility,
    }));

    // Send data to your API (replace this with your API call)
    fetch('the api which i cant find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response if needed
        console.log('API Response:', data);
      })
      .catch((error) => {
        // Handle errors
        console.error('API Error:', error);
      });
  };

  const typesMap = {
    "textarea":  <textarea> </textarea>  ,
    "text": <input type='text' />  ,

    "boolen":  <select > 
      <option value="yes">yes</option>
      <option value="no">no</option>
    </select>
    ,

    "dropdown":  <select > 
    <option value="one">one</option>
    <option value="two">two</option>
  </select>
  ,

    "choices": <>
      <div className={classes.multi}>  <input type='text' placeholder='type here' /> <span onClick={(e)=> addChoice(e)}> <AiOutlinePlus /> </span>  </div>
      { choices && <select > 
      {choices.map((choice,index)=>(
        <option key={index} value={choice}>{choice}</option>
      ))}
    </select>}
    </> ,

    "date":  <input type='date' /> ,
    "number":  <input type='number' /> ,
    "file":  <input type='file' /> ,
    "video":  <input type='video' /> ,
  }



  return (
    <div className={classes.personalContainer}>
      <h2>Personal Information</h2>
      <div className={classes.inputs}>
        <label >
          First Name
          <input type="text" />
        </label>

        <label >
          Last Name
          <input type="text" />
        </label>

        <label >
          Email
          <input type="text" />
        </label>

          {renderCheckboxes('Phone')} 

          {renderCheckboxes('Nationality')} 

          {renderCheckboxes('Current Residence')} 

          {renderCheckboxes('Id Number')} 

          {renderCheckboxes('Date of Birth')} 

          {renderCheckboxes('Gender')} 

        {/* displaying extras questions  */}
        {extraQs.map((Q,i)=>(
          <label key={i}>  
            {Q.question}
            <span> </span>
            {typesMap[Q.type]}
          </label>
        ))}
        {AddingQ ?  <AddQ getExtraQsData={getExtraQsData} addingStateDone={addingStateDone} /> : "" }



        <div className={classes.addQ} onClick={()=> setAddingQ(true)} >
          <AiOutlinePlus /> Add a question
        </div>

        <button className={classes.submit} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}        
  