import Image from "next/image";
import Link from "next/link";
import CustomConnectButton from "../components/CustomConnectButton";
import logo from "../public/logo-lockup.svg";
import styles from "../styles/Home.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link
        href="https://www.mantle.xyz"
        rel="loosener noreferrer"
        target="_blank"
      >
        <Image src={logo} alt="Mantle logo"></Image>
      </Link>
      <div></div>
      <CustomConnectButton />
    </header>
  );
};

export default Header;
