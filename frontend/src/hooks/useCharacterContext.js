import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);

  if(!context) {
    throw Error('Out of bounds')
  }

  return context;
}