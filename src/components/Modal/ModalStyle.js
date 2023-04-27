// style-components
import styled from "styled-components";

export const Modal = styled.div`
  max-width: 1150px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 40px;
  backdrop-filter: blur(1px);
  margin: 102px auto 50px auto;

  @media (max-width: 500px) {
    left: 0px;
    margin: 0px 10px;
  }
`;

export const ModalContent = styled.div`
  padding: 0px 40px;
  padding-bottom: 80px;
`;

export const ModalShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;
