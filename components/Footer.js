import Image from "next/image";
import LogoLayerZero from "../public/images/iconLayerZero.svg";
import styles from "../styles/Home.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.flex}>
        Powered by&nbsp;&nbsp;
        <Image src={LogoLayerZero} slt="icon LayerZero" />
        &nbsp;
      </div>
      {/* <div>All right reserved.</div> */}
    </footer>
  );
};

export default Footer;
