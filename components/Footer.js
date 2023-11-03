import styles from "../styles/Home.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>© 2023 Mantle.network.&nbsp;</div>
      <div className={styles.flex}>
        Made by&nbsp;<a href="https://metasvit.io">Metasvit</a>.&nbsp;
      </div>
      <div>All right reserved.</div>
    </footer>
  );
};

export default Footer;
