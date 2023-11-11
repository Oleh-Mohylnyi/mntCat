import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomConnectButton from "../components/CustomConnectButton";
import logo from "../public/images/logo.svg";
import logoKYC from "../public/images/logo_knowyourcat.svg";
import styles from "../styles/Home.module.scss";

const Header = () => {
  const [screenWidth, setScreenWidth] = useState(1440);
  useEffect(() => {
    setScreenWidth(window.screen.width);
  }, []);

  return (
    <header className={styles.header}>
      <Link
        href="https://knowyourcat.id"
        rel="loosener noreferrer"
        target="_blank"
      >
        <Image
          height={42}
          src={screenWidth >= 600 ? logo : logoKYC}
          alt="Mantle logo"
        ></Image>
      </Link>
      <div></div>
      <div style={{ padding: "6px" }}>
        <CustomConnectButton />
      </div>
    </header>
  );
};

export default Header;
