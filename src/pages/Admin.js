import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from '../services/API';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Admin.css'
import moment from 'moment';
import '../styles/EditProject.css';

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
    <div className='admin-container'>
      <div className='admin-text-container'>
        <div style={{ paddingTop: '20px' }}>
          <Link to='/admin/edit/new'>
            <button type="button" className="btn btn-dark">Ajouter</button>
          </Link>
        </div>

        <br />
        <table className='render-list'>
          <thead>
            <tr className='tableau-1'>
              <td className='tableau-1'>Nom</td>
              <td className='img-logo tableau-1'>logo</td>
              <td className='tableau-1'>client</td>
              <td className='tableau-1'>date de début</td>
              <td className='tableau-1'>date de livraison</td>
              <td className='tableau-1'>lien déployé</td>
              <td className='tableau-1'>Actions</td>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => {
              return (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td><img className='img-logo' src={p.logo} alt={p.name} /></td>
                  <td>{p.client} </td>
                  <td>{moment(p.start_date).format('LL')}</td>
                  <td>{moment(p.delivery_date).format('LL')}</td>
                  <td><a href={p.link}>{p.link}</a></td>
                  <td>
                    <EditOutlined className='edit-icon' onClick={() => history.push(`/admin/edit/${p.id}`)} />
                    <DeleteOutlined className='delete-icon' onClick={() => handleDelete(p.id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Admin;