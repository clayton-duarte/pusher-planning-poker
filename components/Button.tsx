import { styled } from "../providers/theme";

export default styled.button<{ area: string }>`
  background: ${(props) => props.theme.palette.primary};
  color: ${(props) => props.theme.palette.bg};
  text-transform: uppercase;
  font-family: monospace;
  border-radius: 1rem;
  font-size: 1rem;
  padding: 1rem;
  border: none;
  &:focus {
    outline: none;
  }
`;
