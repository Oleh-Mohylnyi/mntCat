import Image from "next/image";
import Link from "next/link";
import CustomConnectButton from "../components/CustomConnectButton";
import logo from "../public/images/logo.svg";
import styles from "../styles/Home.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link
        href="https://knowyourcat.id"
        rel="loosener noreferrer"
        target="_blank"
      >
        <Image height={42} src={logo} alt="Mantle logo"></Image>
      </Link>
      <div></div>
      <div style={{ padding: "6px" }}>
        <CustomConnectButton />
      </div>
    </header>
  );
};

export default Header;
