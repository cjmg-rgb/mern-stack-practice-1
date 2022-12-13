import { useCharacterContext } from '../hooks/useCharacterContext';
import { useEffect } from 'react';
import CharacterDetails from './CharacterDetails';


const CharacterList = () => {

  const { characters, dispatch } = useCharacterContext();

  useEffect(() => {
    
    const fetchCharacters = async () => {
      const response = await fetch('/api/characters');
      const json = await response.json();
      
      if(response.ok) {
        dispatch({type: 'SET_CHARACTERS', payload: json});
      }
    }

    fetchCharacters();

  }, [dispatch])

  return (  
    <div className="row g-3">
      {characters && characters.map(character => (
        <CharacterDetails character={character} key={character._id}/>
      ))}
    </div>
  );
}
 
export default CharacterList;