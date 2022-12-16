import React, { useEffect, useState } from "react";
import Home from "./Home/Home";
import Shop from "./Pages/Shop";
import YourAccount from "./Pages/YourAccount";

const DashboardModal = ({ page }) => {
  const [openPage, setOpenPage] = useState(<Home />);
  useEffect(() => {
    switch (page) {
      case "accountPage":
        setOpenPage(<YourAccount />);
        break;
      case "shopPage":
        setOpenPage(<Shop />);
        break;
      default:
        setOpenPage(<Home />);
        break;
    }
  }, [page]);
  return openPage;
};

export default DashboardModal;
