import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function CrewmateDetails() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    async function fetchCrewmate() {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();
      if (error) console.error('Error fetching crewmate:', error);
      else setCrewmate(data);
    }
    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <div>Loading...</div>;

  return (
    <div>
      <h2>{crewmate.name}</h2>
      <p>Attribute 1: {crewmate.attribute1}</p>
      <p>Attribute 2: {crewmate.attribute2}</p>
      <p>Attribute 3: {crewmate.attribute3}</p>
    </div>
  );
}

export default CrewmateDetails;
