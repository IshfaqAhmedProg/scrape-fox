import { useRouter } from "next/router";
import React from "react";
import Button from "../../Button/Button";
import styles from "./GetInTouch.module.css";
export const GetInTouch = () => {
  const router = useRouter();
  return (
    <section id="ContactUs" className={styles.container}>
      <div className={styles.title} data-aos="fade-right">
        <h1 data-color="white">Get in</h1>
        <h1 data-color="white">
          <span>Touch</span>
        </h1>
      </div>
      <div
        className={styles.content}
        data-shadow="outer"
        data-aos="zoom-in"
        data-aos-delay="600"
      >
        <h1>Contact Us</h1>
        <form>
          <fieldset>
            <input type="text" id="name" name="name" placeholder="Name" />
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email Address"
            />
          </fieldset>
          <fieldset>
            <textarea
              type="text"
              id="message"
              name="message"
              rows="5"
              placeholder="Your Message"
            />
          </fieldset>
          <fieldset>
            <Button
              variant="primary"
              onClick={() => router.push("/dashboard#accountPage")}
            >
              Send
            </Button>
          </fieldset>
        </form>
      </div>
    </section>
  );
};
