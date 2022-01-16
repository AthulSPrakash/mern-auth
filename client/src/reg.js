import { useState } from 'react'

function Reg({url}) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPass: ''
  })
  const [regComplete, setRegComplete] = useState(false)

  function handleChange(e){
    setFormData(prevFormData=>{
      return({
          ...prevFormData,
          [e.target.name]: e.target.value
      })
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    if(formData.firstname && formData.lastname && formData.email 
      && formData.phone && formData.address && formData.password 
      && formData.confirmPass){
      if(formData.confirmPass!==formData.password){
        console.log('mismatch')
      }else{
        const regData = {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email ,
          phone: formData.phone,
          address: formData.address,
          password: formData.password 
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(regData)
        }
        fetch(`${url}/api/register`, requestOptions)
        .then(res => res.json())
        .then(data =>{
            setRegComplete(true)
        })
      }
    }else{
      console.log('Missing field')
    }
  }

  return (
    <div className='reg-page'>
      {!regComplete?
        <form>
          <input 
            type="text" 
            name="firstname" 
            value={formData.firstname} 
            onChange={handleChange} 
            placeholder='First Name'
            required={true}
            max={255}
          />
          <input 
            type="text" 
            name="lastname" 
            value={formData.lastname} 
            onChange={handleChange}
            placeholder='Last Name'
            required={true}
            max={255}
          />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            placeholder='Email'
            required={true}
            max={255}
          />
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange}
            placeholder='Address'
            required={true}
          />
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange}
            placeholder='Phone'
            required={true}
            max={10}
          />
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            placeholder='Password'
            required={true}
            min={8}
          />
          <input 
            type="password"
            name='confirmPass'
            value={formData.confirmPass}
            onChange={handleChange}
            placeholder='Confirm Password'
            required={true}
            min={8}
          />
          <button onClick={handleSubmit}>SUBMIT</button>
        </form>
      :
        <div>
          <h1 className='greeting'>Registration Successful</h1>
          <h2 className='greeting'>Welcome,{formData.firstname}</h2>
        </div>  
      }
    </div>
  )
}

export default Reg