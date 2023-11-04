import styles from "../styles/Home.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.flex}>
        © Powered by&nbsp;<a href="https://knowyourcat.id">kyCat</a>.&nbsp;
      </div>
      <div>All right reserved.</div>
    </footer>
  );
};

export default Footer;
