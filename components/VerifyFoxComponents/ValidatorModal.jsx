import React, { useEffect, useState } from "react";
import EmailValidator from "./EmailValidator";
import PhoneNumberValidator from "./PhoneNumberValidator";
import WhatsAppValidator from "./WhatsAppValidator";
const ValidatorModal = ({ validator }) => {
  const [openValidator, setOpenValidator] = useState(<></>);
  useEffect(() => {
    switch (validator) {
      case "VTR001":
        setOpenValidator(<EmailValidator />);
        break;
      case "VTR002":
        setOpenValidator(<PhoneNumberValidator />);
        break;
      case "VTR003":
        setOpenValidator(<WhatsAppValidator />);
        break;

      default:
        setOpenValidator(<></>);

        break;
    }
  }, [validator]);
  return openValidator;
};

export default ValidatorModal;
