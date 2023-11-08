import React, { useState } from 'react';
import { convertBase64, UploadImageAPI } from '../API/signAPI';

const UploadImage = ({ keyProp }: { keyProp: string | undefined }) => {
  // State to store the selected image file
  const [postImage, setPostImage] = useState<{ file: unknown | string }>();

  // State to control the display of messages
  const [display, setDisplay] = useState({ display: 'none', color: '' });

  // State to store the submission status
  const [submitState, setSubmitState] = useState('');

  // Function to handle file upload
  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setPostImage({ file: base64 });
  };

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response: any = await UploadImageAPI(keyProp, postImage);
    if (response) {
      setDisplay({ display: 'block', color: 'green' });
      setSubmitState('Image uploaded successfully');
    } else {
      setDisplay({ display: 'block', color: 'red' });
      setSubmitState('Image is unavailable');
    }
  };

  return (
    <div className='cardMainDesign'>
      <form onSubmit={handleSubmit}>
        <label>Upload Image</label>
        <input name='uploadImg' type='file' accept='image/*' multiple={false} onChange={(e) => handleFileUpload(e)} />
        <button type='submit'>Upload</button>
      </form>
      <h4 style={display}>{submitState}</h4>
      <h4 onClick={() => window.location.href = '/'}>Done</h4>
    </div>
  );
};

export default UploadImage;
