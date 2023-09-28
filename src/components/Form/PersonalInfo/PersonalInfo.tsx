/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, FormEvent, MouseEvent, ChangeEvent } from 'react';
import classes from './PersonalInfo.module.css';
import { AiOutlinePlus } from 'react-icons/ai';
import AddQ from '../AddQ/AddQ';
import axios from 'axios';

type ExtraQuestion = {
  question: string;
  type: string;
};


type InputsState = {
  [key: string]: {
    internal: boolean;
    visibility: boolean;
  };
};

export default function PersonalInfo() {
  const [extraQs, setExtraQs] = useState<ExtraQuestion[]>([]);
  const [AddingQ, setAddingQ] = useState<boolean>(false);
  const [choices, setChoices] = useState<string[]>([]);

  const initialInputs: InputsState = {
    firstName: { internal: false, visibility: false  },
    lastName: { internal: false, visibility: false  },
    emailId: { internal: false, visibility: false  },
    Phone: { internal: false, visibility: false  },
    Nationality: { internal: false, visibility: false  },
    'Current Residence': { internal: false, visibility: false  },
    'Id Number': { internal: false, visibility: false  },
    'Date of Birth': { internal: false, visibility: false  },
    Gender: { internal: false, visibility: false  },
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
      <div key={field} className={classes.labelLike}>
        <p className={classes.fieldtitle}>
          {field}
          <span>
            <span>
              <input
                name={field}
                type="checkbox"
                checked={inputs[field].internal}
                onChange={() =>handleCheckboxChange(field, 'internal')}
              />
              Internal
            </span>

            <span className={isChecked ? classes.active : ''} onClick={()=> handleCheckboxChange(field, 'visibility')}>
              <input
                name={field}
                type="checkbox"
                checked={isChecked}
                className={classes.checkHidden}
              />
            </span>
            {isChecked ? 'Show' : 'Hide'}
          </span>
        </p>
        <input name={field} required type="text" className={classes.checkField} onChange={(e)=> handleInputChange(e)} />
      </div>
    );
  };

  function getExtraQsData(Q: ExtraQuestion) {
    setExtraQs((prevValues) => [...prevValues, Q]);
  }

  function addingStateDone(done: boolean) {
    setAddingQ(false);
    console.log(done)
  }

  function addChoice(e: MouseEvent<HTMLSpanElement>) {
    const input = (e.target as HTMLSpanElement).parentNode?.parentNode.children[0].value;
    if (input) {
      setChoices((prev) => [...prev, input]);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Gather data from inputs and extra questions
    const dataToSend = {};
    Object.keys(inputs).forEach((field) => {
      // Check if the field exists in formData
      if (formData.hasOwnProperty(field)) {
        // Update the dataToSend[field] with the corresponding data from formData
        dataToSend[field] = {
          ...dataToSend[field],
          ...inputs[field],
          value: formData[field],
        };
      }
    });



    console.log("formData",formData)
    console.log('Data to send:', dataToSend);

    try {
      const response = await axios.post('https://stoplight.io/mocks/zeyad/cptask/247155419', dataToSend );

      // Handle the API response
      console.log('API Response:', response.data);

      setInputs(initialInputs);
      setExtraQs([]);
      setChoices([]);
    } catch (error) {
      // Handle errors
      console.error('API Error:', error);
    }
  };

  const [formData, setFormData] = useState<object>({});
  console.log(formData)

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement; 
    console.log(e.target)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  const typesMap: { [key: string]: React.ReactNode } = {
    textarea: <textarea></textarea>,
    text: <input placeholder='type here' type="text" />,
    boolean: (
      <select onChange={handleInputChange} >
        <option value="yes">yes</option>
        <option value="no">no</option>
      </select>
    ),
    dropdown: (
      <select onChange={handleInputChange} >
        <option value="one">one</option>
        <option value="two">two</option>
      </select>
    ),
    choices: (
      <>
        <div className={classes.multi} >
          <input placeholder='type here' type="text" onChange={handleInputChange}  />
          <span onClick={(e) => addChoice(e)}> <AiOutlinePlus /> </span>
        </div>
        {choices && choices.length > 0 && (
          <select className={classes.choicesSelect} onChange={handleInputChange} >
            {choices.map((choice, index) => (
              <option key={index} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        )}
      </>
    ),
    date: <input placeholder='type here' type="date" onChange={handleInputChange}  />,
    number: <input placeholder='type here' type="number" onChange={handleInputChange}  />,
    file: <input placeholder='type here' type="file" onChange={handleInputChange}  />,
    video: <input placeholder='type here' type="video" onChange={handleInputChange}  />,
  };

  return (
    <form className={classes.personalContainer} onSubmit={(e) => handleSubmit(e)}>
      <h2>Personal Information</h2>
      <div className={classes.inputs}>
        <label className={classes.fixedField}>
          First Name
          <input name="firstName" type="text" required  onChange={(e) => handleInputChange(e)}  />
        </label>

        <label className={classes.fixedField}>
          Last Name
          <input name="lastName" type="text" required  onChange={(e) => handleInputChange(e)}  />
        </label>

        <label className={classes.fixedField}>
          Email
          <input name="emailId" type="text" required  onChange={(e) => handleInputChange(e)}  />
        </label>

        {renderCheckboxes('Phone')}

        {renderCheckboxes('Nationality')}

        {renderCheckboxes('Current Residence')}

        {renderCheckboxes('Id Number')}

        {renderCheckboxes('Date of Birth')}

        {renderCheckboxes('Gender')}

        {/* displaying extras questions */}
        {extraQs.map((Q, i) => (
          <div className={classes.labelLike} key={i}>
            <p className={classes.EQH}>  {Q.question} </p>
            
            {typesMap[Q.type]}
          </div>
        ))}
        {AddingQ ? <AddQ getExtraQsData={getExtraQsData} addingStateDone={addingStateDone} /> : ''}

        <div className={classes.addQ} onClick={() => setAddingQ(true)}>
          <AiOutlinePlus /> Add a question
        </div>

        <input type="submit" value={'Submit'} className={classes.submit} />
      </div>
    </form>
  );
}
