import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from '../services/API';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const history = useHistory();
  const [projects, setProjects] = useState([]);

  const handleDelete = (id) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer ce projet ?')) {
      API.delete(`/project/${id}`)
        .then(res => {
          const currentProject = projects.filter(p => p.id !== id);
          setProjects(currentProject);
        })
        .catch(err => {
          console.warn(err);
        });
    }
  };

  useEffect(() => {
    API.get('/project')
      .then(res => {
        setProjects(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // eslint-disable-line


  return (
    <>
      <div style={{ paddingTop: '20px' }}>
        <Link to='/admin/edit/new'>
          <button className='form-button'>Ajouter</button>
        </Link>
      </div>

      <br />
      <table className='render-list'>
        <thead>
          <tr>
            <td>Nom</td>
            <td>logo</td>
            <td>client</td>
            <td>date de début</td>
            <td>date de livraison</td>
            <td>description</td>
            <td>lien déployé</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => {
            return (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.logo}</td>
                <td>{p.client} </td>
                <td>{p.start_date} </td>
                <td>{p.delivery_date} </td>
                <td>{p.description} </td>
                <td>{p.link} </td>
                <td>
                  <EditOutlined className='edit-icon' onClick={() => history.push(`/admin/edit/${p.id}`)} />
                  <DeleteOutlined className='delete-icon' onClick={() => handleDelete(p.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Admin;