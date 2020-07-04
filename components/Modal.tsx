import React, { FunctionComponent, useState, ChangeEvent } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { rgba } from "polished";

import { useModal } from "../providers/modal";
import { useUser } from "../providers/user";
import { styled } from "../providers/theme";

const StyledOverlay = styled.aside<{ isOpen: boolean }>`
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
  background: ${(props) => rgba(props.theme.palette.text, 0.5)};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  grid-template-columns: 1fr;
  place-content: center;
  transition: 0.2s ease;
  position: fixed;
  display: grid;
  padding: 1rem;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
`;

const StyledModal = styled.section`
  box-shadow: 0 0 1rem ${(props) => rgba(props.theme.palette.text, 0.5)};
  background: ${(props) => props.theme.palette.bg};
  border-radius: 1rem;
  max-width: 425px;
  overflow: hidden;
  margin: 0 auto;
  display: grid;
  cursor: auto;
  width: 100%;
  gap: 1rem;
`;

const StyledHeader = styled.header`
  background: ${(props) => props.theme.palette.primary};
  color: ${(props) => props.theme.palette.bg};
  text-transform: capitalize;
  text-align: center;
  font-size: 1.5rem;
  display: grid;
  padding: 1rem;
`;

const StyledFooter = styled.footer`
  background: ${(props) => props.theme.palette.primary};
  color: ${(props) => props.theme.palette.bg};
  grid-template-columns: auto auto;
  justify-content: space-between;
  font-size: 2rem;
  display: grid;
  padding: 1rem;
  gap: 1rem;
`;

const StyledContent = styled.article`
  display: grid;
  padding: 1rem;
  gap: 1rem;
`;

const StyledLabel = styled.label``;

const StyledError = styled.p`
  color: ${(props) => props.theme.palette.error};
  margin: 0;
`;

const StyledInput = styled.input`
  border: 1px solid ${(props) => props.theme.palette.primary};
  background: ${(props) => props.theme.palette.bg};
  font-family: monospace;
  border-radius: 1rem;
  font-size: 1rem;
  padding: 1rem;
  &:focus {
    outline: none;
  }
`;

const Modal: FunctionComponent<{ canCancel: boolean }> = ({ canCancel }) => {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<string>("");
  const { isOpen, closeModal } = useModal();
  const { setUser } = useUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const handleCancel = () => {
    if (canCancel) closeModal();
    else setError("you cant proceed without confirm");
  };

  const handleConfirm = async () => {
    if (!data) return setError("A name is required");
    if (data.length < 3) return setError("This name is too short");
    await setUser({ name: data });
    closeModal();
  };

  return (
    <StyledOverlay role="button" onClick={handleCancel} isOpen={isOpen}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <StyledHeader>what's your name?</StyledHeader>
        <StyledContent>
          <StyledLabel>Name:</StyledLabel>
          <StyledInput
            placeholder="Leroy Jenkins"
            onChange={handleChange}
            value={data}
          />
          {error && <StyledError>{error}</StyledError>}
        </StyledContent>
        <StyledFooter>
          <FiX role="button" onClick={handleCancel} />
          <FiCheck role="button" onClick={handleConfirm} />
        </StyledFooter>
      </StyledModal>
    </StyledOverlay>
  );
};

export default Modal;
