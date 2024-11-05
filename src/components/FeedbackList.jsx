import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function FeedbackList({ feedback, onFeedbackAdded }) {
  const [newFeedback, setNewFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;
  
    try {
      const { data, error } = await supabase
        .from('feedback')
        .insert([{ content: newFeedback }]);
  
      if (error) throw error;
  
      setNewFeedback('');
      onFeedbackAdded();
    } catch (error) {
      console.error('Error adding feedback:', error);
      alert('Failed to add feedback. Please try again.');
    }
  };
  
  

  return (
    <div className="feedback-list">
      <h2>Feedback</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
          placeholder="Enter your feedback"
        />
        <button type="submit">Submit Feedback</button>
      </form>

      <ul>
        {feedback.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
