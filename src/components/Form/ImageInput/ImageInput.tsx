/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './ImageInput.module.css';
import  { useRef, useState, ChangeEvent } from 'react'; // Import React
import { AiOutlineUpload } from 'react-icons/ai';
import { RiCloseLine } from 'react-icons/ri';

export default function ImageInput() {
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  console.log(imageFile);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageURL(URL.createObjectURL(file));
    }
  };

  return (
    <div className={classes.imageInputContainer}>
      <div className={classes.imageInput}>
        <input type="file" ref={imageInput} onChange={(e) => handleImageChange(e)} />
      </div>
      {!imageURL ? (
        <>
          <h2>Upload cover image</h2> {/* Fixed typo in 'Upload' */}
          <div className={classes.container}>
            <button
              type="button"
              className={classes.button}
              onClick={() => imageInput.current?.click()}
            >
              <AiOutlineUpload size={33} />
              <p className={classes.upload}>Upload cover image</p> {/* Fixed typo in 'upload' */}
              <p className={classes.note}>16:9 ratio is recommended. Max image size 1mb</p>
            </button>
          </div>
        </>
      ) : (
        <div className={classes.imageContainer}>
          <img className={classes.image} src={imageURL} alt="image" />
          <div className={classes.closeButton} onClick={() => imageInput.current?.click()}>
            <RiCloseLine size={22} /> Delete & re-upload
          </div>
        </div>
      )}
    </div>
  );
}
