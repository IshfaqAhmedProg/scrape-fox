import React from "react";
import styles from "./OurServices.module.css";
import { ServiceCard } from "./ServiceCard/ServiceCard";
import GoogleMapsScraperIcon from "../../../public/Icons/GoogleMapsScraper.svg";
import EmailAddressValidatorIcon from "../../../public/Icons/EmailAddressValidator.svg";
import PhoneNumberValidatorIcon from "../../../public/Icons/PhoneNumberValidator.svg";
import WhatsAppValidatorIcon from "../../../public/Icons/WhatsAppValidator.svg";
const OurServices = () => {
  const Services = [
    {
      ServiceId: "SRV001",
      ServiceName: "Google Maps Scraper",
      ServiceImage: GoogleMapsScraperIcon,
      ServiceDesc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quod
      dolor reiciendis animi sed sit.`,
    },
    {
      ServiceId: "SRV002",
      ServiceName: "Email Address Validator",
      ServiceImage: EmailAddressValidatorIcon,
      ServiceDesc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quod
        dolor reiciendis animi sed sit.`,
    },
    {
      ServiceId: "SRV003",
      ServiceName: "Phone Number Validator",
      ServiceImage: PhoneNumberValidatorIcon,
      ServiceDesc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quod
        dolor reiciendis animi sed sit.`,
    },
    {
      ServiceId: "SRV004",
      ServiceName: "WhatsApp Validator",
      ServiceImage: WhatsAppValidatorIcon,
      ServiceDesc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quod
      dolor reiciendis animi sed sit.`,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          Our
          <span> Services</span>
        </h1>
      </div>
      <div className={styles.content}>
        {Services.map((service) => {
          return (
            <ServiceCard
              key={service.ServiceId}
              serviceImage={service.ServiceImage}
              serviceName={service.ServiceName}
              serviceDesc={service.ServiceDesc}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OurServices;
