import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const ScoreSubmission = ({ game, score, setScore, submitScore, user }) => {
  const [submitting, setSubmitting] = useState(false);

  const handleScoreChange = (e) => {
    const newValue = parseInt(e.target.value, 10);

  // Check if the parsed value is NaN
  if (!isNaN(newValue)) {
    setScore(newValue);
  } else {
    setScore(0); 
  }
  };

  return (
    <div className="game-section">
    <h3>{game}</h3>
    <input
      type="number"
      placeholder="Enter your score"
      value={score}
      onChange={handleScoreChange}
    />
    <button onClick={submitScore} disabled={!user || submitting}>
      {submitting ? 'Submitting...' : 'Submit'}
    </button>
  </div>
  
  );
};

ScoreSubmission.propTypes = {
  game: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
  submitScore: PropTypes.func.isRequired,
};

export default ScoreSubmission;
