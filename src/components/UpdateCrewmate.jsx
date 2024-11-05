import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function UpdateCrewmate({ onCrewmateUpdated }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [attribute1, setAttribute1] = useState('');
  const [attribute2, setAttribute2] = useState('');
  const [attribute3, setAttribute3] = useState('');

  const categories = ['Engineer', 'Scientist', 'Medic', 'Security'];

  const categoryAttributes = {
    Engineer: ['Technical', 'Innovative', 'Problem-solver'],
    Scientist: ['Analytical', 'Curious', 'Methodical'],
    Medic: ['Caring', 'Quick-thinking', 'Knowledgeable'],
    Security: ['Vigilant', 'Strong', 'Tactical']
  };

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  async function fetchCrewmate() {
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) console.error('Error fetching crewmate:', error);
    else {
      setName(data.name);
      setCategory(data.category);
      setAttribute1(data.attribute1);
      setAttribute2(data.attribute2);
      setAttribute3(data.attribute3);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from('crewmates')
      .update({ name, category, attribute1, attribute2, attribute3 })
      .eq('id', id);

    if (error) {
      console.error('Error updating crewmate:', error);
    } else {
      console.log('Crewmate updated successfully:', data);
      if (onCrewmateUpdated) {
        onCrewmateUpdated();
      }
      navigate('/list');
    }
  }

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
          {categoryAttributes[category].map((attr, index) => (
            <label key={attr}>
              <input
                type="checkbox"
                value={attr}
                checked={[attribute1, attribute2, attribute3].includes(attr)}
                onChange={(e) => {
                  if (e.target.checked) {
                    if (!attribute1) setAttribute1(attr);
                    else if (!attribute2) setAttribute2(attr);
                    else if (!attribute3) setAttribute3(attr);
                  } else {
                    if (attribute1 === attr) setAttribute1('');
                    else if (attribute2 === attr) setAttribute2('');
                    else if (attribute3 === attr) setAttribute3('');
                  }
                }}
              />
              {attr}
            </label>
          ))}
        </div>
      )}
      <button type="submit">Update Crewmate</button>
    </form>
  );
}

export default UpdateCrewmate;
