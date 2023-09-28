/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState, ChangeEvent } from 'react';
import classes from './AddQ.module.css';

interface Props {
  getExtraQsData(Q: { type: string; question: string  }): void;
  addingStateDone(done: boolean): void;
}

export default function AddQ(props: Props) {
  const [formData, setFormData] = useState<{ type: string; question: string }>({
    type: 'text', 
    question: '',
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement; 
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function saveQ() {
    const Q = {
      type: formData.type,
      question: formData.question,
    };
    props.getExtraQsData(Q); 
    props.addingStateDone(true);
  }

  return (
    <div className={classes.QContainer}>
      <div className={classes.inputs}>
        <label htmlFor={formData.type} className={classes.fixedField}>
          Type
          <select
            name={formData.type}
            value='type'
            onChange={(e)=> handleInputChange(e)} >
            <option value="textarea">Paragraph</option>
            <option value="text">Short answer</option>
            <option value="boolean">Yes/No</option> 
            <option value="dropdown">Dropdown</option>
            <option value="choices">Multiple choice</option>
            <option value="date">Date</option>
            <option value="number">Number</option>
            <option value="file">File upload</option>
            <option value="video">Video question</option>
          </select>
        </label>

        <label htmlFor={formData.question} className={classes.fixedField}>
          Question
          <input
            name='question'
            className={classes.Q}
            type="text"
            placeholder="Type here"
            value={formData.question}
            onChange={(e)=> handleInputChange(e)}
          />
        </label>
      </div>
      <button className={classes.save} onClick={saveQ}>
        Save
      </button>
    </div>
  );
}
