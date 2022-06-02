import React, { useEffect, useState } from 'react'
import { getTemplateOriginal, processTemplate, uploadTemplateJson } from './polotnoactions'
import './App.css'

const App = () => {
  // Feeds for Json file
  const [feed, setFeed] = useState({});

  // ===================================

  const [jsonFile, setJsonFile] = useState("");
  const [templateBlob, setTemplateBlob] = useState("");
  const [processedBlob, setProcessedBlob] = useState("");
  const [uploding, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [changing, setChaging] = useState(false);

  const [initialTemplate, setInitialTemplate] = useState();

  const process = () => {
    if(jsonFile == "")
    {
      alert("Plesae choose one of the template and preview.");
      return;
    }
    setChaging(true);
    processTemplate(jsonFile, feed)
      .then(res=>{
        if(res.data.warning.length != 0)
        {
          alert("Can not find layer names for this template: " + res.data.warning.toString());
          return;
        }
        setProcessedBlob(res.data.data);
        setChaging(false);
      })
  }

  const showTemplate = () => {
    if(initialTemplate == null)
    {
      alert("Choose Template please");
      return;
    }
    setUploading(true);
    console.log(initialTemplate)
    uploadTemplateJson(initialTemplate).then(res => {
      if(res.data.status == "success")
      {
        const _jsonFile = res.data.data;
        setJsonFile(_jsonFile);
        setUploading(false);
        setProcessing(true);

        getTemplateOriginal(_jsonFile)
          .then(res=>{
            setTemplateBlob(res.data.data);
            setProcessing(false);
          })
      }
    });
    
  }
  
  const onFileChange = (e) => {
    setInitialTemplate(e.target.files[0]);
  }

  const handleFeedChange = (ev) =>{
    let _name = ev.target.name;
    let _val = ev.target.value;
    setFeed({...feed, [_name]: _val});
    console.log(_name, _val);
  }

  useEffect(()=>{
    console.log(initialTemplate);
    if(initialTemplate == null)
      setTemplateBlob('');
  }, [initialTemplate])
  
  return (
    <main>
      <div className='container'>
        <h1 className='text-center mb-4'>Polotno Simulation</h1>
        <div className='col-12' style={{marginBottom: '40px'}}>
          <div className='d-flex justify-content-center'>
            <input type="file" className="custom-file-input" name="myTemplate" onChange= {(e) => {onFileChange(e)}} />

            <button type="button" className="btn btn-primary" onClick={() => {showTemplate()}}>Upload and Preview</button>
          </div>
          <div className='offset-3 col-6' style={{marginTop: '20px'}}>
          {
            templateBlob != '' &&
            <img src={`data:image/jpeg;base64, ${templateBlob}`} alt="Template" style={{width:'100%'}}/>
          }
          {
            (templateBlob == '' && uploding == true) &&
            <p className='text-primary'>Uploading Template...</p>
          }
          {
            (templateBlob == '' && processing == true) &&
            <p className='text-primary'>Please wait until process preview template...</p>
          }
          </div>
        </div>
        <div className='col-12'>
          <div className='row mb-4'>
            <input className='col-12' name="street_address" onChange={handleFeedChange} placeholder="Street Address"/>
            <input className='col-12' name="suburb" onChange={handleFeedChange} placeholder="Suburb"/>
            <input className='col-12' name="priceview" onChange={handleFeedChange} placeholder="PriceView"/>
            <input className='col-4' name="bed_count" onChange={handleFeedChange} placeholder="Bedroom Number"/>
            <input className='col-4' name="bath_count" onChange={handleFeedChange} placeholder="Bathroom Number"/>
            <input className='col-4' name="car_count" onChange={handleFeedChange} placeholder="Car Number"/>
            <label className='col-2' style={{border: 'solid 1px rgb(133, 133, 133)'}}> Bedroom Icon Color </label>
            <input className='col-2' type="color" name="bed_icon" onChange={handleFeedChange}/>
            <label className='col-2' style={{border: 'solid 1px rgb(133, 133, 133)'}}> Bath Icon Color </label>
            <input className='col-2' type="color" name="bath_icon" onChange={handleFeedChange}/>
            <label className='col-2' style={{border: 'solid 1px rgb(133, 133, 133)'}}> Car Icon Color </label>
            <input className='col-2' type="color" name="car_icon" onChange={handleFeedChange}/>
            <input className='col-12' name="listing_image" onChange={handleFeedChange} placeholder="Listing Image"/>
            <input className='col-12' name="gradient_overlay" onChange={handleFeedChange} placeholder="Gradient Overlay"/>
            
          </div>
          <button type="button" className="btn btn-success" onClick={() => {process()}}>Process</button>
          <div className='offset-3 col-6' style={{marginTop: '20px'}}>
          {
            processedBlob != '' &&
            <img src={`data:image/jpeg;base64, ${processedBlob}`} alt="Processed Post" style={{width:'100%'}}/>
          }
          {
            (processedBlob == '' && changing == true) &&
            <p className='text-primary'>Processing...</p>
          }
          </div>
        </div>
      </div>
      
    </main>
  )
}

export default App;