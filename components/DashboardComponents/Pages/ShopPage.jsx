import React from "react";
import { useUserDb } from "../../../contexts/UserDatabaseContext";

const ShopPage = () => {
  const { getUserInfo } = useUserDb();
  return (
    <section id="shopPage" onLoad={getUserInfo}>
      Shop
    </section>
  );
};

export default ShopPage;
