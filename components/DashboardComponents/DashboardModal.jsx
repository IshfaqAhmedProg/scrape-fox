import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EmailValidator from "../VerifyFoxComponents/EmailValidator";
import Home from "./Home/Home";
import Shop from "./Pages/Shop";
import YourAccount from "./Pages/YourAccount";

const DashboardModal = ({ page }) => {
  const [openPage, setOpenPage] = useState(<Home />);
  const router = useRouter();
  useEffect(() => {
    switch (router.asPath) {
      case "/dashboard#accountPage":
        setOpenPage(<YourAccount />);
        break;
      case "/dashboard#shopPage":
        setOpenPage(<Shop />);
        break;
      case "/dashboard#emailValidator":
        setOpenPage(<EmailValidator />);
        break;
      case "/dashboard":
        setOpenPage(<Home />);
      default:
        setOpenPage(<Home />);
        break;
    }
  }, [router.asPath]);
  return openPage;
};

export default DashboardModal;
