import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EmailValidator from "../VerifyFoxComponents/EmailValidator";
import Home from "./Home/Home";
import ShopPage from "./Pages/ShopPage";
import AccountPage from "./Pages/AccountPage";

const DashboardModal = () => {
  const [openPage, setOpenPage] = useState(<Home />);
  const router = useRouter();
  useEffect(() => {
    switch (router.asPath) {
      case "/dashboard#accountPage":
        setOpenPage(<AccountPage />);
        break;
      case "/dashboard#shopPage":
        setOpenPage(<ShopPage />);
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
