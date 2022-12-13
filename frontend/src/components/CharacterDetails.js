import { useCharacterContext } from "../hooks/useCharacterContext";

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const CharacterDetails = ({character}) => {

  const { dispatch } = useCharacterContext();

  const handleClick = async () => {
    const response = await fetch('/api/characters/' + character._id, {
      method: 'DELETE'
    })

    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'DELETE_CHARACTER', payload: json})
    }
  }

  return (  
    <div className="text-center justify-content-center mx-auto mx-md-0 col-10 col-md-6 col-lg-3">
      <div className="card bg-dark text-light rounded border">
        <div className="card-body">
          <div className="mb-3">
            <h4 className="card-title fw-bold">{character.characterName}</h4>
            <p className="card-text text-muted">{character.characterClass}</p>
          </div>
          <p className="text-success">{formatDistanceToNow(new Date(character.createdAt), { addSuffix: true })}</p>
          <div className="d-flex align-items-center justify-content-center">
            <a href="#home" className="mx-2 btn btn-primary">Play</a>
            <button onClick={handleClick} className="btn btn-sm btn-danger">
              <span className="mx-2 material-symbols-outlined">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default CharacterDetails;