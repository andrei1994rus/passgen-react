import React,{useState,useEffect} from 'react';
import './App.css';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Form} from 'react-bootstrap';
import {useForm} from 'react-hook-form';

import AlertMessage from './components/AlertMessage';

import createPassword from './gen/passwordGen';

const App=()=>
{
    const [password,setPassword]=useState('');
    const [isLoaded,setIsLoaded]=useState(false);
    const [widthScreen,setWidthScreen]=useState(window.screen.width);

    const {register,handleSubmit,errors,watch}=useForm();
    const hasSymbols=watch('hasSymbols');
    const hasNumbers=watch('hasNumbers');

    const infoAfterCreatePassword='You created password. You can create other password or copy current password.';
    const info='For generate password you should click button Create password. Input number >6 without chars and not >30.';
    const sizeWarningInfo='Your device should be with width not < 120 pixels. Or you should rotate device.';

    const onSubmit=data=>
    {
      if(isLoaded)
      {
        setIsLoaded(false);
      }
        
      setPassword(createPassword(data.inputLength,hasNumbers,hasSymbols));
      setIsLoaded(true);
    }

    const copyClick=(e)=>
    {
      const currentEl=e.target;
      currentEl.classList.add('copied');
      currentEl.innerHTML='Copied password';
    }

    useEffect(()=>
    {
      window.addEventListener('resize',event=>
      {
        console.log('width:'+event.target.window.screen.width);
        setWidthScreen(event.target.window.screen.width);
      });
    },[]);
    
    return (
      <div>
        <div className="div_alert">
          {errors.inputLength &&
            <AlertMessage message={errors.inputLength.message}/>}
        </div>
        
        <div className="div_warning-size text-danger">
          {sizeWarningInfo}
        </div>

        <Form className="form bg-success" onSubmit={handleSubmit(onSubmit)}>
          <span className="lbl text-warning">Password settings</span>
          {widthScreen>=320 &&
            <Form.Control className="form-control-lg w-75" id="passwordLength" type="text" placeholder="input length" name="inputLength" 
                ref={register(
                {
                  required:"Password length is required",
                  min:
                  {
                    value:6,
                    message:"Password length must be >6"
                  },
                  max:
                  {
                    value:30,
                    message:"Password length must be not >30"
                  },
                  pattern:
                  {
                    value:/^[1-9]{1}[0-9]*$/i,
                    message:"Password length must be only number >0 without chars and mustn't start with zero"
                  }
                })}/>
          }
          {(widthScreen<320 && widthScreen>=120) &&
            <Form.Control className="form-control-sm w-75" id="passwordLength" type="text" placeholder="input length" name="inputLength" 
                ref={register(
                {
                  required:"Password length is required",
                  min:
                  {
                    value:6,
                    message:"Password length must be >6"
                  },
                  max:
                  {
                    value:30,
                    message:"Password length must be not >30"
                  },
                  pattern:
                  {
                    value:/^[1-9]{1}[0-9]*$/i,
                    message:"Password length must be only number >0 without chars and mustn't start with zero"
                  }
                })}/>
          }
          
          <div className="div_chb">
            <Form.Check className="chb text-warning" type="checkbox" name="hasNumbers" label="Password has numbers" 
              ref={register}/>
            <Form.Check className="chb text-warning" type="checkbox" name="hasSymbols" label="Password has symbols"
              ref={register}/>
          </div>

          <div className="div_info">
            <span className="info text-warning">{info}</span>
          </div>

          <div className="div_create-button">
            <button className="button" type="submit">Create password</button>
          </div>
        </Form>
        
        <div className="div_password">
            {isLoaded &&
              <div>
                <span className="password text-success">{password}</span>
                <div className="div_info_after_create_password">
                  <span className="info_after_create_password text-info">{infoAfterCreatePassword}</span>
                </div>
                <div className="div_copy-button">
                  <CopyToClipboard text={password}>
                    <button className="button" onClick={e=>copyClick(e)}>Copy password</button>
                  </CopyToClipboard>
                </div>
              </div>
            }
        </div>
      </div>
    );
};

export default App;