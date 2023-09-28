/* eslint-disable @typescript-eslint/no-unused-vars */

import  { useState } from 'react'; 
import classes from './Profile.module.css';
import { AiOutlinePlus } from 'react-icons/ai';
import AddQ from '../AddQ/AddQ';

type InputsState = {
  [key: string]: {
    Mandatory: boolean;
    visibility: boolean;
  };
};

type ExtraQuestion = {
  question: string;
  type: string;
};

export default function Profile() {
  const [extraQs, setExtraQs] = useState<ExtraQuestion[]>([]); 
  const [AddingQ, setAddingQ] = useState<boolean>(false);
  const [choices, setChoices] = useState<string[]>([]);

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
      <div key={field} className={classes.labelLike}>
        <p className={classes.fieldtitle}>
          {field}
          <span>
            <span>
              <input
                required
                name={field}
                type="checkbox"
                checked={inputs[field].Mandatory}
                onChange={() => handleCheckboxChange(field, 'Mandatory')}
              />
              Internal
            </span>

            <span className={isChecked ? classes.active : ''} onClick={() => handleCheckboxChange(field, 'visibility')}>
              <input
                required
                name={field}
                type="checkbox"
                checked={isChecked}
                className={classes.checkHidden}
              />
            </span>
            {isChecked ? 'Show' : 'Hide'}
          </span>
        </p>
        <input name={field} required type="text" className={classes.checkField} />
      </div>
    );
  };

  const handleSubmit = () => {
    // Gather data from inputs
    const dataToSend = Object.keys(inputs).map((field) => ({
      field,
      Mandatory: inputs[field].Mandatory,
      visibility: inputs[field].visibility,
    }));

    // Send data to your API 
    fetch('YOUR_API_URL', {
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

  function addChoice(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    const input = (e.target as HTMLSpanElement).parentNode?.parentNode?.querySelector<HTMLInputElement>('input[type="text"]');
    if (input) {
      const inputValue = input.value;
      if (inputValue) {
        setChoices((prev) => [...prev, inputValue]);
      }
    }
  }
  

  const typesMap = {
    textarea: <textarea></textarea>,
    text: <input type='text' />,

    boolean: (
      <select>
        <option value="yes">yes</option>
        <option value="no">no</option>
      </select>
    ),

    dropdown: (
      <select>
        <option value="one">one</option>
        <option value="two">two</option>
      </select>
    ),

    choices: (
      <>
        <div className={classes.multi}>
          <input type="text" placeholder="type here" />
          <span onClick={(e) => addChoice(e)}> <AiOutlinePlus /> </span>
        </div>
        {choices && choices.length > 0 && (
          <select className={classes.choicesSelect}>
            {choices.map((choice, index) => (
              <option key={index} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        )}
      </>
    ),

    date: <input type='date' />,
    number: <input type='number' />,
    file: <input type='file' />,
    video: <input type='video' />,
  };

  function addingStateDone() {
    setAddingQ(false);
  }

  function getExtraQsData(Q: ExtraQuestion) { 
    setExtraQs((prevValues) => [...prevValues, Q]);
  }

  return (
    <div className={classes.personalContainer}>
      <h2>Profile</h2>
      <div className={classes.inputs}>
        
          {renderCheckboxes('Education')}

          {renderCheckboxes('Experience')}


          {renderCheckboxes('Resume')}


        {/* displaying extras questions */}
        {extraQs.map((Q, i) => (
          <div className={classes.labelLike} key={i}>
            <p className={classes.EQH}>  {Q.question} </p>
            
            {typesMap[Q.type]}
          </div>
        ))}
        {AddingQ ? <AddQ getExtraQsData={getExtraQsData} addingStateDone={addingStateDone} /> : ""}

        <div className={classes.addQ} onClick={() => setAddingQ(true)}>
          <AiOutlinePlus /> Add a question
        </div>

        <button className={classes.submit} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
