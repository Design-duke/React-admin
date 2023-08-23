import styles from "./index.module.less";

function Github() {
  return (
    <div className={styles.contentBox}>
      <span className={styles.text}>
        Github 仓库：
        <a
          href="https://github.com/Design-duke/React-admin"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/Design-duke/React-admin
        </a>
        &nbsp;求 ⭐⭐
      </span>
    </div>
  );
}

export default Github;
