// style-components
import styled from "styled-components";

export const Modal = styled.div`
  max-width: 37.5rem;
  background-color: white;
  position: fixed;
  top: 100px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  max-height: 342px;
  left: calc(50% - 290px);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(1px);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  @media (max-width: 500px) {
    left: 0px;
    margin: 0px 10px;
  }
`;

export const ModalContent = styled.div`
  overflow: auto;
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
