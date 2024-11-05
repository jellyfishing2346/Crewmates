import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import CrewmateForm from './components/CrewmateForm.jsx';
import CrewmateList from './components/CrewmateList.jsx';
import CrewmateDetails from './components/CrewmateDetails.jsx';
import UpdateCrewmate from './components/UpdateCrewmate.jsx';
import FeedbackList from './components/FeedbackList.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import { supabase } from './supabaseClient';

function App() {
  const [crewmates, setCrewmates] = useState([]);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchCrewmates();
    fetchFeedback();
  }, []);

  async function fetchCrewmates() {
    try {
      const { data, error } = await supabase.from('crewmates').select('*');
      if (error) throw error;
      setCrewmates(data || []);
    } catch (error) {
      console.error('Error fetching crewmates:', error);
      setCrewmates([]);
    }
  }

  async function fetchFeedback() {
    try {
      const { data, error } = await supabase.from('feedback').select('*')
      if (error) throw error;
      setFeedback(data || [])
    } catch (error) {
      console.error('Error fetching feedback:', error)
      setFeedback([])
    }
  }
  

  return (
    <ErrorBoundary>
      <Router>
        <div className="app-container">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/create">Create Crewmate</Link></li>
              <li><Link to="/list">Crewmate List</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CrewmateForm onCrewmateAdded={fetchCrewmates} />} />
            <Route 
              path="/list" 
              element={
                <CrewmateList 
                  crewmates={crewmates} 
                  onCrewmateDeleted={fetchCrewmates}
                />
              } 
            />
            <Route path="/crewmate/:id" element={<CrewmateDetails />} />
            <Route path="/update/:id" element={<UpdateCrewmate onCrewmateUpdated={fetchCrewmates} />} />
            <Route 
              path="/feedback" 
              element={
                <FeedbackList 
                  feedback={feedback} 
                  onFeedbackAdded={fetchFeedback}
                />
              } 
            />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
