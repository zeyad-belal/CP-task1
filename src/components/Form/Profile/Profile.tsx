/* eslint-disable @typescript-eslint/no-unused-vars */

import  { useState, ChangeEvent } from 'react'; // Import React
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
  const [extraQs, setExtraQs] = useState<ExtraQuestion[]>([]); // Define the type for extraQs
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
      <p key={field}>
        {field}
        <span>
          <span>
            <input
              type="checkbox"
              checked={inputs[field].Mandatory}
              onChange={() => handleCheckboxChange(field, 'Mandatory')}
            />
            Mandatory
          </span>

          <span className={isChecked ? classes.active : ''} onClick={() => handleCheckboxChange(field, 'visibility')}>
            <input type="checkbox" checked={isChecked} />
          </span>
          {isChecked ? 'Show' : 'Hide'}
        </span>
        <input type="text" />
      </p>
    );
  };

  const handleSubmit = () => {
    // Gather data from inputs
    const dataToSend = Object.keys(inputs).map((field) => ({
      field,
      Mandatory: inputs[field].Mandatory,
      visibility: inputs[field].visibility,
    }));

    // Send data to your API (replace this with your API call)
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

  function addChoice(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    if (input) {
      setChoices((prev) => [...prev, input]);
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
          <input type='text' placeholder='type here' onChange={(e) => addChoice(e)} />
          <span> <AiOutlinePlus /> </span>
        </div>
        {choices && (
          <select>
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

  function getExtraQsData(Q: ExtraQuestion) { // Define the type for Q
    setExtraQs((prevValues) => [...prevValues, Q]);
  }

  return (
    <div className={classes.personalContainer}>
      <h2>Profile</h2>
      <div className={classes.inputs}>
        <label>
          {renderCheckboxes('Education')}
        </label>
        <input type="text" />

        <label>
          {renderCheckboxes('Experience')}
        </label>
        <input type="text" />

        <label>
          {renderCheckboxes('Resume')}
        </label>
        <input type="text" />

        {/* displaying extras questions  */}
        {extraQs.map((Q, i) => (
          <label key={i}>
            {Q.question}
            <span> </span>
            {typesMap[Q.type]}
          </label>
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
