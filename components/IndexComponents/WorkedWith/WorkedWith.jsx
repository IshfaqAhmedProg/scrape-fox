import Image from "next/image";
import React, { useState } from "react";
import styles from "./WorkedWith.module.css";
import Person from "./Person";
import GoogleLogo from "../../../public/Logos/Companies/GoogleLogo.svg";
import FigmaLogo from "../../../public/Logos/Companies/FigmaLogo.svg";
import MicrosoftLogo from "../../../public/Logos/Companies/MicrosoftLogo.svg";
import SlackLogo from "../../../public/Logos/Companies/SlackLogo.svg";
const WorkedWith = () => {
  const [activePerson, setActivePerson] = useState(1);
  //TODO Bring Company logos and People from firebase
  const CompanyLogos = [GoogleLogo, FigmaLogo, MicrosoftLogo, SlackLogo];
  const People = [
    {
      PersonId: "COMM1",
      PersonName: "John Doe",
      PersonComment: `Lorem ipsum dolor sit amet consectetur. Eget malesuada urna consequat
  elit enim in libero elementum vitae.`,
    },
    {
      PersonId: "COMM2",
      PersonName: "Jane Doe",
      PersonComment: `Consectetur. Eget malesuada urna consequat
      elit enim in libero elementum vitae.`,
    },
    {
      PersonId: "COMM3",
      PersonName: "Stacy Rugart",
      PersonComment: `Enim in libero elementum vitae Consectetur. Eget malesuada urna consequat
  elit .`,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1 data-aos="fade-right">People & Companies we&apos;ve</h1>
        <h1 data-aos="fade-right" data-aos-delay="300">
          <span>
            Worked
            <br />
            With
          </span>
        </h1>
      </div>
      <div
        className={styles.people}
        data-aos="zoom-in-down"
        data-aos-delay="300"
      >
        <div className={styles.buttons}>
          <svg
            width="5%"
            height="auto"
            viewBox="0 0 31 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              activePerson != 1
                ? setActivePerson(activePerson - 1)
                : setActivePerson(1);
            }}
          >
            <path
              d="M28 3L4 27L28 51"
              stroke="#5781FF"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          <svg
            width="5%"
            height="auto"
            viewBox="0 0 31 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              activePerson != People.length
                ? setActivePerson(activePerson + 1)
                : setActivePerson(People.length);
            }}
          >
            <path
              d="M3 3L27 27L3 51"
              stroke="#5781FF"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {People.map((person) => {
          return (
            <Person
              key={person.PersonId}
              personId={person.PersonId}
              personName={person.PersonName}
              personComment={person.PersonComment}
              active={activePerson}
            />
          );
        })}
      </div>
      <div className={styles.companies}>
        {CompanyLogos.map((company, index) => {
          return (
            <Image
              data-aos="zoom-in"
              data-aos-delay={(index + 1) * 100}
              key={index}
              src={company}
              alt="companies worked with"
            />
          );
        })}
      </div>
    </div>
  );
};

export default WorkedWith;
