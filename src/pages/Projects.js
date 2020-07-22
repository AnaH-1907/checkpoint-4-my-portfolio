import React, { useState, useEffect } from 'react';
// import '../Styles/Projects.css';
import API from '../services/API';

function Projects () {
  const [projects, setProjects] = useState([]);
  console.log(projects);

  useEffect(() => {
    API.get("/project")
    .then(res => {
      setProjects(res.data.data);
    })
    .catch(err => [
      console.log(err)
    ]);
  }, []); // eslint-disable-line

  return (
    <>
      <h1>Mes projets</h1>
      <div>
        {projects && projects.map(p => {
          return (
            <div key={p.id}>
              <a title={p.name} href={p.link}><img alt='projet' src={p.logo} /></a>
              <p>{p.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Projects;