import { createContext } from "react";

export const validationConfigContext = createContext();

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitSelector: '.popup__submit',
  inactiveSubmitClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__error_visible'
};
