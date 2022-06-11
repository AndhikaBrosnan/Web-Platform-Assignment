import { css, cx } from "@emotion/css";
import styled from "@emotion/styled";

const PaginationComponent = ({ page, onHandleChangePage }) => {
  const activeButton = css`
    background-color: #4caf50;
    color: white;
  `;

  const paginationClass = css`
    display: inline-block;
    margin-bottom: 3em;
  `;

  const Button = styled.a`
    cursor: pointer;
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    &:hover:not(${activeButton}) {
      background-color: #ddd;
    }
  `;

  return (
    <div className={paginationClass}>
      <Button>&laquo;</Button>
      {[1, 2, 3].map((item) => (
        <Button
          className={page === item && activeButton}
          onClick={() => onHandleChangePage(item)}
        >
          {item}
        </Button>
      ))}

      <Button>&raquo;</Button>
    </div>
  );
};
export default PaginationComponent;
