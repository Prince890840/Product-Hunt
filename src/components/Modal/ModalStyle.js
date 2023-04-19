// style-components
import styled from "styled-components";

export const Modal = styled.div`
  max-width: 1150px;
  background-color: white;
  position: fixed;
  top: 75px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  max-height: calc(100% - 200px);
  left: calc(50% - 575px);
  display: flex;
  flex-direction: column;
  padding: 40px;
  backdrop-filter: blur(1px);

  @media (max-width: 500px) {
    left: 0px;
    margin: 0px 10px;
  }
`;

export const ModalContent = styled.div`
  overflow: auto;
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
