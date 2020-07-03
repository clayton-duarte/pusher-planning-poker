import React, { FunctionComponent, useState, ChangeEvent } from "react";
import { rgba } from "polished";

import { useModal } from "../providers/modal";
import { styled } from "../providers/theme";

const StyledOverlay = styled.aside<{ isOpen: boolean }>`
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
  background: ${(props) => rgba(props.theme.palette.text, 0.5)};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  grid-template-columns: 1fr;
  place-content: center;
  transition: 0.2s ease;
  position: fixed;
  cursor: pointer;
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
  max-width: 768px;
  overflow: hidden;
  margin: 0 auto;
  display: grid;
  cursor: auto;
  width: 100%;
  gap: 1rem;
  grid-template-areas:
    "header header header"
    "content content content"
    "cancel . confirm";
`;

const StyledHeader = styled.header`
  background: ${(props) => props.theme.palette.secondary};
  color: ${(props) => props.theme.palette.bg};
  text-transform: capitalize;
  text-align: center;
  grid-area: header;
  padding: 1rem;
`;

const StyledContent = styled.article`
  grid-area: content;
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

const StyledButton = styled.button<{ area: string }>`
  background: ${(props) => props.theme.palette.primary};
  color: ${(props) => props.theme.palette.bg};
  grid-area: ${(props) => props.area};
  text-transform: uppercase;
  font-family: monospace;
  border-radius: 1rem;
  font-size: 1rem;
  cursor: pointer;
  padding: 1rem;
  border: none;
  margin: 1rem;
  &:focus {
    outline: none;
  }
`;

const Modal: FunctionComponent = () => {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<string>("");
  const { isOpen, closeModal } = useModal();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleConfirm = async () => {
    if (!data) return setError("A name is required");
    if (data.length < 3) return setError("This name is too short");
    closeModal();
  };

  return (
    <StyledOverlay onClick={handleCancel} isOpen={isOpen}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <StyledHeader> Hey, what's your name?</StyledHeader>
        <StyledContent>
          <StyledLabel>Name:</StyledLabel>
          <StyledInput
            placeholder="Leroy Jenkins"
            onChange={handleChange}
            value={data}
          />
          {error && <StyledError>{error}</StyledError>}
        </StyledContent>
        <StyledButton onClick={handleCancel} area="cancel">
          cancel
        </StyledButton>
        <StyledButton onClick={handleConfirm} area="confirm">
          confirm
        </StyledButton>
      </StyledModal>
    </StyledOverlay>
  );
};

export default Modal;
