import styles from "../styles/Home.module.scss";

const Header = () => {
  return (
    <footer className={styles.footer}>
      <div>© 2023 Mantle.network.&nbsp;</div>
      <div className={styles.flex}>
        Made by&nbsp;<a href="https://metasvit.io">Metasvit</a>. All right
        reserved.
      </div>
    </footer>
  );
};

export default Header;
