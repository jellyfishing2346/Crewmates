import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function CrewmateForm({ onCrewmateAdded }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [attributes, setAttributes] = useState([]);

  const categories = ['Engineer', 'Scientist', 'Medic', 'Security']; // Add your desired categories

  const categoryAttributes = {
    Engineer: ['Technical', 'Innovative', 'Problem-solver'],
    Scientist: ['Analytical', 'Curious', 'Methodical'],
    Medic: ['Caring', 'Quick-thinking', 'Knowledgeable'],
    Security: ['Vigilant', 'Strong', 'Tactical']
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('crewmates')
      .insert({ name, category, attribute1: attributes[0], attribute2: attributes[1], attribute3: attributes[2] })
    
    if (error) console.error('Error adding crewmate:', error);
    else {
      onCrewmateAdded();
      setName('');
      setCategory('');
      setAttributes([]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Crewmate name"
        required
      />
      
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {category && (
        <div>
          <h3>Select attributes for {category}:</h3>
          {categoryAttributes[category].map((attr) => (
            <label key={attr}>
              <input
                type="checkbox"
                value={attr}
                checked={attributes.includes(attr)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAttributes([...attributes, attr].slice(0, 3));
                  } else {
                    setAttributes(attributes.filter((a) => a !== attr));
                  }
                }}
              />
              {attr}
            </label>
          ))}
        </div>
      )}

      <button type="submit">Add Crewmate</button>
    </form>
  );
}

export default CrewmateForm;
