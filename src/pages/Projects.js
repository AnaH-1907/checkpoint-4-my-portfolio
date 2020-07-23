import React, { useState, useEffect } from 'react';
import '../styles/Projects.css';
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
    <div className='project-container'>
      <div className='project-text-container'>
        <h1 className='title'>Mes projets</h1>
        <div className='cards-container'>
          {projects && projects.map(p => {
            return (
              <div key={p.id} className='card'>
                <a title={p.name} href={p.link} target="_blank"><img className='card-img-top' alt='projet' src={p.logo} /></a>
                <div className='card-body'>
                  <p className='card-text'>{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Projects;