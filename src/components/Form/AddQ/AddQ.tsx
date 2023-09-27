/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState, ChangeEvent } from 'react';
import classes from './AddQ.module.css';

interface Props {
  getExtraQsData(Q: { type: string; question: string }): void;
  addingStateDone(done: boolean): void;
}

export default function AddQ(props: Props) {
  // Initialize state for type and question
  const [formData, setFormData] = useState<{ type: string; question: string }>({
    type: 'textarea', // Set a default type if needed
    question: '',
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement; // Cast to the correct type
    // Update the corresponding state value based on the input name
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function saveQ() {
    // Create an object with type and question from formData
    const Q = {
      type: formData.type,
      question: formData.question,
    };
    props.getExtraQsData(Q); // Pass the 'Q' object as an argument
    props.addingStateDone(true);
  }

  return (
    <div className={classes.QContainer}>
      <div className={classes.inputs}>
        <label htmlFor="type">
          Type
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="textarea">Paragraph</option>
            <option value="text">Short answer</option>
            <option value="boolean">Yes/No</option> {/* Fixed typo in 'boolean' */}
            <option value="dropdown">Dropdown</option>
            <option value="choices">Multiple choice</option>
            <option value="date">Date</option>
            <option value="number">Number</option>
            <option value="file">File upload</option>
            <option value="video">Video question</option>
          </select>
        </label>

        <label htmlFor="question">
          Question
          <input
            name="question"
            className={classes.Q}
            type="text"
            placeholder="Type here"
            value={formData.question}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button className={classes.save} onClick={saveQ}>
        Save
      </button>
    </div>
  );
}
