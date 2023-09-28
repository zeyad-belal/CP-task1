/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, FormEvent, MouseEvent } from 'react';
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
    firstName: { internal: false, visibility: false },
    lastName: { internal: false, visibility: false },
    emailId: { internal: false, visibility: false },
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
      <div key={field} className={classes.labelLike}>
        <p className={classes.fieldtitle}>
          {field}
          <span>
            <span>
              <input
                required
                name={field}
                type="checkbox"
                checked={inputs[field].internal}
                onChange={() => handleCheckboxChange(field, 'internal')}
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

  function getExtraQsData(Q: ExtraQuestion) {
    setExtraQs((prevValues) => [...prevValues, Q]);
  }

  function addingStateDone(done: boolean) {
    setAddingQ(false);
    console.log(done)
  }

  function addChoice(e: MouseEvent<HTMLSpanElement>) {
    const input = (e.target as HTMLSpanElement).parentNode?.parentNode?.children[0]?.textContent;
    if (input) {
      setChoices((prev) => [...prev, input]);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Gather data from inputs and extra questions
    const dataToSend = {
      ...inputs,
      extraQuestions: extraQs,
    };

    console.log('Data to send:', dataToSend);

    try {
      const response = await axios.post('theAPI', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

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

  const typesMap: { [key: string]: React.ReactNode } = {
    textarea: <textarea></textarea>,
    text: <input type="text" />,
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
    date: <input type="date" />,
    number: <input type="number" />,
    file: <input type="file" />,
    video: <input type="video" />,
  };

  return (
    <form className={classes.personalContainer} onSubmit={(e) => handleSubmit(e)}>
      <h2>Personal Information</h2>
      <div className={classes.inputs}>
        <label className={classes.fixedField}>
          First Name
          <input name="firstName" type="text" required />
        </label>

        <label className={classes.fixedField}>
          Last Name
          <input name="lastName" type="text" required />
        </label>

        <label className={classes.fixedField}>
          Email
          <input name="emailId" type="text" required />
        </label>

        {renderCheckboxes('Phone')}

        {renderCheckboxes('Nationality')}

        {renderCheckboxes('Current Residence')}

        {renderCheckboxes('Id Number')}

        {renderCheckboxes('Date of Birth')}

        {renderCheckboxes('Gender')}

        {/* displaying extras questions */}
        {extraQs.map((Q, i) => (
          <label key={i}>
            {Q.question}
            <span> </span>
            {typesMap[Q.type]}
          </label>
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
