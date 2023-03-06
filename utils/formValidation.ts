import React from 'react';

const FormValidation = (event) => {
console.log('event :>> ', event);
//     let isValid = true
    
//     if (!name) {
//       validations.name = 'Name is required'
//       isValid = false
//     }
    
//     if (name && name.length < 3 || name.length > 50) {
//       validations.name = 'Name must contain between 3 and 50 characters'
//       isValid = false
//     }
    
//     if (!email) {
//       validations.email = 'Email is required'
//       isValid = false
//     }
    
//     if (email && !/\S+@\S+\.\S+/.test(email)) {
//       validations.email = 'Email format must be as example@mail.com'
//       isValid = false
//     }
    
//     if (!gender) {
//       validations.gender = 'Gender is required'
//       isValid = false
//     }
    
//     if (!isValid) {
//       setValidations(validations)
//     }
    
//     return isValid
//   }

//   const validateOne = (e) => {
//     const { name } = e.target
//     const value = values[name]
//     let message = ''
    
//     if (!value) {
//       message = `${name} is required`
//     }
    
//     if (value && name === 'name' && (value.length < 3 || value.length > 50)) {
//       message = 'Name must contain between 3 and 50 characters'
//     }

//     if (value && name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
//       message = 'Email format must be as example@mail.com'
//     }
    
//     setValidations({...validations, [name]: message })
//   }
  
//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setValues({...values, [name]: value })
//   }

}

export default FormValidation;