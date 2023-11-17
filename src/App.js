import {useState, useRef} from 'react';
import QRCode from 'qrcode.react';
import './App.css';

function App() {
  const [value, setValue] = useState(null);

  // update value without need re-render;
  const updateValue = useRef(null);

  const handleClick = (event) =>{
    event.preventDefault();
    setValue(updateValue.current.value)
  }

  const handleDownload = () => {
    const QrComponent = document.getElementById("qr_component")
    .toDataURL()
    .replace('image/png', 'image/octet-stream');

    // console.log(QrComponent); // gice qr image as a link

    let qrCreate = document.createElement('a');
    qrCreate.href = QrComponent;
    qrCreate.download = 'qrCode.png';
    document.body.appendChild(qrCreate);
    qrCreate.click();
    document.body.removeChild(qrCreate);
  }

return (
  <>
    <div className='parent'>
      <div className='child'>

        <h1>QR Generator</h1>

        <div className='input_group'>
          <form onClick={handleClick}>
            <input type='text' 
              placeholder='Enter Your Text' 
              className='qr_text'
              ref={updateValue}
            />
            <button title='generator' 
              className='qr_btn'
            >
            Generator</button>
          </form>
        </div>


        {
        /* if one of bothis fales , it will not work 
        ==> must both be truth to work */
        }
        {
        value && 
        (<>
          <div className='qr_container'>
            <div className='qr_package'>
              <QRCode value={value} size={200} id='qr_component'/>
            </div>
          </div>
          <button title='Download' id='qr_download' 
            className='qr_btn'
            onClick={handleDownload}
          >Download</button>
        </>)
        }

      </div>
    </div>
  </>
)
}

export default App;