import Image from "next/image";
import styles from "../styles/Home.module.scss";
import logo from '../public/logo-lockup.svg';
import CustomConnectButton from "../components/CustomConnectButton";

const Header = () => {
    return (
      <header className={styles.header}>
        <Image src={logo} alt="Mantle logo"></Image>
        <div></div>
        <CustomConnectButton />
      </header>
    );
}

export default Header