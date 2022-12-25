import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <div>
      <StBox></StBox>
    </div>
  );
};

export default Header;

const StBox = styled.div`
  // 그리고 이 안에 스타일 코드를 작성합니다. 스타일 코드는 우리가 알고 있는 css와 동일합니다.
  margin: 0px;
  width: 100%;
  height: 60px;

  background-color: #eee;
`;
