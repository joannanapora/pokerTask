import { useState } from 'react';

export default function Home() {
  const [selectedNumPlayers, setSelectedNumPlayers] = useState('');

  return (
    <div>
      <h3>Start a new game</h3>
      <div className="row mb-4">
        <div className="col-4">
          <form method="POST" action="/api/newGame">
            <div className="form-group">
              <label htmlFor="numPlayers">Number of Players</label>
              <select
                className="form-control"
                id="numPlayers"
                name="numPlayers"
                value={selectedNumPlayers}
                onChange={(e) => setSelectedNumPlayers(e.target.value)}>
                <option value="">Please select...</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
            <input
              disabled={!selectedNumPlayers}
              type="submit"
              className="btn btn-primary btn-block mt-2"
              value="Start Game"
            />
          </form>
        </div>
      </div>

      <h3>Or join an existing one by entering the game ID:</h3>
      <div className="row">
        <div className="col-4">
          <form method="POST" action="/api/joinGame">
            <div className="form-group">
              <label htmlFor="gameId">Enter game ID:</label>
              <input className="form-control" id="gameId" name="gameId" />
            </div>
            <input
              type="submit"
              className="btn btn-primary btn-block mt-2"
              value="Join Game"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
