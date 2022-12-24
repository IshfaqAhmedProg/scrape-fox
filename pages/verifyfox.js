import React, { useState } from "react";
import Image from "next/image";
import styles from "../components/VerifyFoxComponents/VerifyFox.module.css";
import formStyles from "../styles/Forms.module.css";
import bg from "../public/Images/VerifyFox.png";
import EmailAddressValidatorIcon from "../public/Icons/EmailAddressValidatorBlue.svg";
import PhoneNumberValidatorIcon from "../public/Icons/PhoneNumberValidatorBlue.svg";
import WhatsAppValidatorIcon from "../public/Icons/WhatsAppValidatorBlue.svg";
import Button from "../components/Button/Button";
import ValidatorModal from "../components/VerifyFoxComponents/ValidatorModal";
import Modal from "react-modal";

Modal.setAppElement("#__next");
const VerifyFox = () => {
  const customStyles = {
    content: {
      marginTop: "10vh",
      marginInline: "auto",
      paddingBlock: "1.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "var(--border-radius)",
      border: "none",
      isolation: "isolate",
      boxShadow: "0px 0px 20px -5px rgba(34, 22, 43, 0.25)",
      width: "max(60vw,300px)",
      height: "fit-content",
      overflow: "hidden",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [activeValidator, setActiveValidator] = useState("");
  function closeModal() {
    setIsOpen(false);
  }
  const Validators = [
    {
      Id: "VTR001",
      Icon: EmailAddressValidatorIcon,
      Name: "Email Address Validator",
      Desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna.",
    },
    {
      Id: "VTR002",
      Icon: PhoneNumberValidatorIcon,
      Name: "Phone Number Validator",
      Desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna.",
    },
    {
      Id: "VTR003",
      Icon: WhatsAppValidatorIcon,
      Name: "WhatsApp Validator",
      Desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna.",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={formStyles.content} data-shadow="outer">
        {Validators.map((validator) => {
          return (
            <div
              className={styles.element}
              data-shadow="outer"
              key={validator.Name}
              onClick={() => {
                setActiveValidator(validator.Id);
                setIsOpen(true);
              }}
            >
              <Image src={validator.Icon} alt={validator.Name} />
              <div className={styles.main}>
                <div className={styles.title}>
                  <h2>{validator.Name}</h2>
                  <p>{validator.Desc}</p>
                </div>
                <Button variant="rightarrow" />
              </div>
            </div>
          );
        })}
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Validator Modal"
        >
          <Button variant="close" onClick={() => setIsOpen(false)} />
          <ValidatorModal validator={activeValidator} />
        </Modal>
      </div>
      <div className={formStyles.background}>
        <Image src={bg} alt="verifyfox background" />
      </div>
    </div>
  );
};

export default VerifyFox;
