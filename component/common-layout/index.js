import { css, cx } from "@emotion/css";

const CommonLayout = ({ children }) => {
  return (
    <div>
      <div
        className={css`
          height: 3em;
          padding: 1em 2em;
        `}
      >
        <ul
          className={css`
            display: flex;
            list-style-type: none;
            flex-wrap: wrap;
            gap: 1em;
          `}
        >
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/collection">Collection</a>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
};
export default CommonLayout;
