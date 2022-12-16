import React, { useRef, useState, useEffect } from "react";
import styles from "./FAQ.module.css";
import PlusSign from "../../../public/Icons/PlusSign.svg";
import MinusSign from "../../../public/Icons/MinusSign.svg";
import Image from "next/image";
const FAQ = () => {
  const faqContent = [
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
      answer:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti a dolor! Exercitationem modi labore temporibus numquam dicta odit, vero animi laudantium cum dolorum minima officiis recusandae eos provident laborum.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
      answer:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti a dolor! Exercitationem modi labore temporibus numquam dicta odit, vero animi laudantium cum dolorum minima officiis recusandae eos provident laborum.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
      answer:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti a dolor! Exercitationem modi labore temporibus numquam dicta odit, vero animi laudantium cum dolorum minima officiis recusandae eos provident laborum.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
      answer:
        " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut corrupti a dolor! Exercitationem modi labore temporibus numquam dicta odit, vero animi laudantium cum dolorum minima officiis recusandae eos provident laborum.",
    },
  ];
  const [isActive, setIsActive] = useState(false);
  const [serial, setSerial] = useState("");
  const ActiveFaq = useRef(null);
  useEffect(() => {
    const activeanswer = ActiveFaq.current;
    if (activeanswer != null) activeanswer.scrollIntoView({ block: "center" });
  });
  return (
    <section id="FAQ" className={styles.container}>
      <div className={styles.title}>
        <h1 data-color="white" data-aos="zoom-in-down">Frequently Asked</h1>
        <h1 data-color="white" data-aos="zoom-in" data-aos-delay="300">
          <span>Questions!</span>
        </h1>
      </div>
      <div className={styles.accordion}>
        {faqContent.map((element, index) => {
          return (
            <div
              className={styles.element}
              key={index}
              data-aos="zoom-in-down"
              data-aos-delay={(index + 1) * 100}
            >
              <div
                data-shadow="outer"
                className={styles.question}
                onClick={() => {
                  setIsActive(!isActive);
                  setSerial(index);
                }}
              >
                <p>{element.question}</p>
                <Image
                  src={isActive && serial == index ? MinusSign : PlusSign}
                  alt="open"
                  width={20}
                  height={20}
                />
              </div>
              <div
                ref={isActive && serial == index ? ActiveFaq : null}
                data-shadow="inner"
                className={
                  styles.answer +
                  " " +
                  (isActive && serial == index ? styles.active : "")
                }
              >
                {element.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
