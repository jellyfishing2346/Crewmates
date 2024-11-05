import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './CrewmateList.css';

function CrewmateList({ crewmates, onCrewmateDeleted }) {
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id);
    
    if (error) console.error('Error deleting crewmate:', error);
    else onCrewmateDeleted();
  };

  return (
    <div className="crewmate-list">
      <h2>Crewmate List</h2>
      
      <div className="crewmate-grid">
        {crewmates.map((crewmate) => (
          <div key={crewmate.id} className="crewmate-card">
            <h3>{crewmate.name}</h3>
            <p>Attribute: {crewmate.attribute}</p>
            {crewmate.category && <p>Category: {crewmate.category}</p>}
            
            <div className="actions">
              <Link to={`/crewmate/${crewmate.id}`} className="button view">View Details</Link>
              <Link to={`/update/${crewmate.id}`} className="button update">Update</Link>
              <button onClick={() => handleDelete(crewmate.id)} className="button delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrewmateList;
