import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";


import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorComponent = ({ ...props }) => {
  const [uploadedImages, updateuploadedImages] = useState([]);
  const uploadImageCallBack = async (file) => {
    // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.

    // Make sure you have a uploadImages: [] as your default state
    const imageObject = await {
      file: file,
      localSrc: URL.createObjectURL(file),
    };


    updateuploadedImages(uploadedImages.push(imageObject));
    console.log(uploadedImages);

    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  };

  return (
    <Editor
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      // wrapperStyle={<wrapperStyleObject>}
      // editorStyle={<editorStyleObject>}
      // toolbarStyle={<toolbarStyleObject>}
      {...props}
   
      uploadEnabled={true}
      toolbar={{ image: { uploadCallback: uploadImageCallBack } }}
    />
  );
};

export default EditorComponent;
