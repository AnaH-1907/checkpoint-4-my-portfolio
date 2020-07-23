import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import API from '../services/API';
import '../styles/EditProject.css';
import moment from 'moment';

const EditProject = () => {
  const { id } = useParams();
  const history = useHistory();
  const editMode = id !== 'new';

  const [data, setData] = useState({
    name: '',
    logo: '',
    client: '',
    start_date: '',
    delivery_date: '',
    description: '',
    link: ''
  });

  useEffect(() => {
    if (editMode) {
      API.get(`/project/${id}`)
        .then(res => {
          const start_date = moment(res.data.data.start_date).format('yyyy-MM-DD'); //eslint-disable-line
          const delivery_date = moment(res.data.data.delivery_date).format('yyyy-MM-DD'); //eslint-disable-line
          setData({...res.data.data, start_date, delivery_date});
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []); // eslint-disable-line

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editMode) {
      API.patch(`/project/${id}`, data)
        .then(res => {
          history.push('/admin');
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      API.post('/project', data)
        .then((res) => {
          history.push('/admin');
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  };

  return (
    <>
      <main className='main-form-container'>
        <form className='editor-form-center' onSubmit={(e) => handleSubmit(e)}>
          <div className='editor-group'>
            <div className='editor-form-input-container'>
              <label>Nom du projet</label>
              <input
                className='editor-form-input'
                type='text'
                name='name'
                minLength='3'
                value={data.name}
                placeholder='Ajouter un nom'
                onChange={(e) => handleChange(e)}
                required
              />
              <label>Logo du projet</label>
              <input
                className='editor-form-input'
                type='text'
                name='logo'
                minLength='3'
                value={data.logo}
                placeholder='Ajouter un logo'
                onChange={(e) => handleChange(e)}
              />
              <label>Nom du client</label>
              <input
                className='editor-form-input'
                type='text'
                name='client'
                minLength='3'
                value={data.client}
                placeholder='Ajouter un client'
                onChange={(e) => handleChange(e)}
                required
              />
              <label>description du projet</label>
              <input
                className='editor-form-input'
                type='text'
                name='description'
                minLength='3'
                value={data.description}
                placeholder='Ajouter une description'
                onChange={(e) => handleChange(e)}
                required
              />
              <label>Date de début de projet</label>
              <input
                className='editor-form-input'
                type='text'
                name='start_date'
                minLength='3'
                value={moment(data.start_date).format('yyyy-MM-DD')}
                placeholder='Ajouter une date de lancement'
                onChange={(e) => handleChange(e)}
                required
              />
              <label>Date de fin de projet</label>
              <input
                className='editor-form-input'
                type='text'
                name='delivery_date'
                minLength='3'
                value={moment(data.delivery_date).format('yyyy-MM-DD')}
                placeholder='Ajouter une date de livraison'
                onChange={(e) => handleChange(e)}
              />
              <label>Lien vers le site déployé</label>
              <input
                className='editor-form-input'
                type='text'
                name='link'
                minLength='3'
                value={data.link}
                placeholder='Ajouter un lien de déploiement'
                onChange={(e) => handleChange(e)}
              />
            </div>
              <button type='submit' className="btn btn-dark">{editMode ? 'Modifier' : 'Ajouter'}</button>
            </div>
        </form>
      </main>
    </>
  );
};

export default EditProject;