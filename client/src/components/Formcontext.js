// FormContext.js

import React, { useState } from 'react'; // Import React and useState
import { createContext, useContext } from 'react';

// Create a context
const FormContext = createContext();

// Create a provider component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// // Custom hook to use the FormContext
export const useForm = () => useContext(FormContext);