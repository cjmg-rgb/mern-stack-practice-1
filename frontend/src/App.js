import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import CharacterList from "./components/CharacterList";
import "./style.css";

import { useState } from "react";
import { useCharacterContext } from "./hooks/useCharacterContext";

function App() {
  const { dispatch } = useCharacterContext();
  const [characterName, setCharacterName] = useState("");
  const [characterClass, setCharacterClass] = useState("Swordsman");

  const postCharacter = async () => {
    const character = { characterName, characterClass };
    const response = await fetch("/api/characters", {
      method: "POST",
      body: JSON.stringify(character),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (response.ok) {
      setCharacterName('');
      setCharacterClass('');
      dispatch({ type: "CREATE_CHARACTER", payload: json });
    }
  };

  return (
    <div className="App" id="home">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a href="#home" className="navbar-brand">
            CJMG
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#home" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#home" className="nav-link">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="#home" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section className="text-center bg-dark p-5">
        <div className="container">
          <h1 className="text-light">
            Create your own{" "}
            <span className="fw-bold text-warning">character</span>
          </h1>
          <p className="lead text-muted py-4">
            Create your own character right now now
          </p>
          <button
            type="button"
            className="btn btn-outline-warning"
            data-bs-toggle="modal"
            data-bs-target="#create"
          >
            Create
          </button>
        </div>
      </section>
      <section className="bg-secondary py-4">
        <div className="container">
          <CharacterList />
        </div>
      </section>

      {/* Modal */}
      <div
        className="modal fade"
        id="create"
        tabIndex="-1"
        aria-labelledby="createModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="create">
                Create Character
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="d-flex w-75 flex-column mx-auto">
                <label className="h4">Username</label>
                <input
                  required
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  type="text"
                />
                <label className="h4">Class</label>
                <select 
                className="custom-select" 
                value={characterClass}
                required
                onChange={e => setCharacterClass(e.target.value)}
                >
                  <option value="Swordsman">Swordsman</option>
                  <option value="Assassin">Assassin</option>
                  <option value="Mage">Mage</option>
                  <option value="Range">Range</option>
                </select>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={postCharacter}
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
