import React, { useState } from 'react'
import videoLogo from '../assets/video-marketing-2.png'
import { Alert, Button, Card, FileInput, Label, Progress, Textarea, TextInput } from 'flowbite-react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function VideoUploader() {

  // This is a demo Comment 
  // This is Added By Rajib

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  // const [message, setMessage] = useState("");
  const [metaData, setMetaData] = useState({
    title: "",
    description: "",
  });

  function handleFileChange(event) {
    console.log("Hi I am in handle File change: ", event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  }

  function setFieldData(event) {
    console.log([event.target.name])
    setMetaData({
      ...metaData,
      [event.target.name]: event.target.value
    })
  }

  function resetForm() {

    setMetaData({
      title: "",
      description: "",
    });
    setSelectedFile(null);
    setIsUploading(false);
    
    

  }

  function handleForm(formEvent) {
    formEvent.preventDefault();
    // setMetaData({
    //   title: 
    // })
    if (!selectedFile) {
      alert("Select File");
      return;
    }
    saveVideoToServer(selectedFile, metaData);
    setIsUploading(true);


    // console.log(formEvent.target.title.value);
    // console.log(formEvent.target.description.value);
    // console.log(formEvent.target.file.value);
  }

  // submit the file to server
  async function saveVideoToServer(video, videoMetaData) {
    try {

      //api call
      let formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);
      formData.append("file", video);
      let response = await axios.post("http://localhost:8080/ePadhai/api/v1/videos", formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

            setProgress(progress);

            console.log("progress: ", progress);
          },
        }
      );


      console.log(response);
      setMessage("File Uploaded!");
      toast.success("File Uploaded!");
      setIsUploading(false);
      setProgress(0);



    } catch (err) {
      console.log(err);
      setMessage("Error occured uploading file!");
      toast.error("Error occured uploading file!");
      setIsUploading(false);
    }
  }

  return (
    <>
    <Toaster />

    <div className="text-white">
      <Card className='flex flex-col items-center'>
        <h1>Upload Video</h1>

        <div>
          <form
            onSubmit={handleForm}
            noValidate
            className="items-center space-x-6 space-y-6">

            <div className='flex flex-col space-y-6'>

              <div className='flex flex-col'>
                <div className="mb-2 block">
                  <Label htmlFor="file-upload" value="Video Title" />
                </div>
                <TextInput onChange={setFieldData} value={metaData.title} name='title' placeholder='Enter Title' required />
              </div>

              <div className='flex flex-col'>
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Video Description" />
                </div>
                <Textarea onChange={setFieldData} name='description' value={metaData.description} id="comment" placeholder="Enter Video Description" required rows={4} />
              </div>

            </div>

            <div className='flex items-center space-x-6'>
              <div className="shrink-0">
                <img className="h-16 w-16 object-cover rounded"
                  src={videoLogo} alt="Current profile photo" />
              </div>
              <label className="block">
                <span className="sr-only">Choose Video File</span>
                <input
                  name='file'
                  onChange={handleFileChange}
                  type="file"
                  className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              "/>
              </label>
            </div>
            <div className="">
              {
                isUploading &&
                <Progress
                progress={progress}
                textLabel="Uploading..."
                size="lg"
                labelProgress
                labelText />
              }
            </div>
            {/* <div className="">
              {
              message && <Alert 
                color={messageType==="success" ? "success" : "warning"} 
                onDismiss={() => this.style.display = "none"}
                rounded
                withBorderAccent
                >
                <span className="font-medium">{messageType} alert!</span> {message}
              </Alert>
              }
            </div> */}

            <div className='flex justify-center'>
              <Button disabled={isUploading} type='submit'>Upload</Button>
            </div>

          </form>
        </div>


      </Card>
    </div>
    </>

  )
}

export default VideoUploader
