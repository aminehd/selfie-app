import logo from './logo.svg';
import './App.css';
import helper from './helper.js'
import Header from './components/Header'
import PropTypes from 'prop-types'
import React, {useState} from "react"
import ImageUploader from 'react-images-upload'
import Axios from 'axios';
import axios from 'axios';

const UploadComponent = props => (
  <form>
    <label>
      File Upload URL:
      {/* <input id='urlinput' type='text' onChange={props.onUrlChange} value={props.url}></input> */}
    </label>
    <ImageUploader
      key='image-uploader'
      withIcon={true}
      signleImage={true}
      withPreview={true}
      label="Maximum size file: 5MB"
      buttonText='choos an Image'
      onChange={props.onImage}
      imgExtension={['.jpg', '.png', '.jpeg']}
      // maxFileSize={5242880}
      >

      </ImageUploader>
  </form>
)
helper('this works')
// function App() {
//   return (
//     <div className="App">
//       <Header title = {'title value'} job ='fdf'/>
//     </div>
//   );
// }

// Header.PropTypes = {
//   title: PropTypes.string
// }
// export default App;

const App = () =>{
  const [progress, setProgress] = useState('getUpload')
  // const [url, setImageURL] = useState(undefined)
  const [errorMessage, setErrorMessage ] = useState('')
  const [best, setBest ] = useState('')
  let url = '127.0.0.1:5000/t'
  // let url = 'http://localhost:3000/'

  // const onUrlChange = e => {
  //   setImageURL(e.target.value);
  // };

  const onImage = async (failedImages, successImages) => {
    if (!url){
      console.log('missing URL')
      setErrorMessage('missing a url to upload to')
      setProgress('uploadError')
      return
    }
// UploadComponent
    setProgress('uploading')
    try{
      
      console.log('successImages', successImages.length)
      // const parts = successImages[0].split(';')
      async function send_pic(parts){

        const mime = parts[0].split(':')[1];
        const name = parts[1].split('=')[1];
        // const data = parts[2]
        const data = new FormData();
        data.append('file', parts[2]);
        data.append('filename', "filename");
  
        // const res = await Axios.post(url, {mime, name, image:data})
        console.log(url)
        const response = await fetch('/t',{
          method: 'POST',
          body: data,
        });
        const respose_rate = await response.text();
        return respose_rate
      }
      let score = null
      let chosen = null
      for(let i = 0; i < successImages.length; i++){
        let res = await send_pic(successImages[i].split(';'))
        if (isNaN(score) || score < res){
          score = res
          chosen = i
        }
        console.log(res)
      }
      // console.log(respose_rate)
      // const response = await axios.post('/t', successImages)
      // console.log(text)
      // setImageURL(res.data.imageURL)
      setBest(successImages[chosen]);
      setProgress('uploaded')
    

    }catch (error){
      console.log('error in upload', error)
      setProgress('UploadError')
    }
  }


  const content = () => {
    switch(progress){
      case 'getUpload':
        // return <UploadComponent onUrlChange={onUrlChange} onImage={onImage} url={url}></UploadComponent>
        return <UploadComponent  onImage={onImage} url={url}></UploadComponent>

      case 'uploading':
        return <h2>uploading</h2>
      case 'uploaded':
          return <div>
          <img src={best}/>
          </div>
             
      case 'uploadError':
        return(
          <>
            <div>Error Message = {errorMessage}</div>
            <div>please upload an Image</div>
          </>
        )
    }
  }
  return (<div className="App">
    <h1> Selfie improvement website</h1>
    {content()}
  </div>)
}

export default App;