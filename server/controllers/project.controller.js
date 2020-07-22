const Project = require('../models/project.model.js');

class ProjectsController {
  static async create (req, res) {
    if (!req.body) {
      return res.status(400).send({ errorMessage: 'Content for project can not be empty!' });
    }

    if (!req.body.name) {
      return res.status(400).send({ errorMessage: 'Name can not be empty!' });
    }

    try {
      const project = new Project(req.body);
      if (await Project.nameAlreadyExists(project.email)) {
        res.status(400).send({ errorMessage: 'A project with this name already exists !' });
      } else {
        const data = await Project.create(project);
        res.status(201).send({ data });
      }
    } catch (err) {
      res.status(500).send({
        errorMessage: err.message || 'Some error occurred while creating the project.'
      });
    }
  }

  static async findAll (req, res) {
    try {
      const data = (await Project.getAll()).map(p => new Project(p)).map(p => ({
        id: p.id,
        name: p.name,
        logo: p.logo,
        client: p.client,
        start_date: p.start_date,
        delivery_date: p.delivery_date,
        description: p.description,
      }));
      res.send({ data });
    } catch (err) {
      res.status(500).send({
        errorMessage: err.message || 'Some error occurred while retrieving projects.'
      });
    }
  }

  static async findOne (req, res) {
    try {
      const data = await Project.findById(req.params.id);
      res.send({ data });
    } catch (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({ errorMessage: `Project with id ${req.params.id} not found.` });
      } else {
        res.status(500).send({ errorMessage: 'Error retrieving project with id ' + req.params.id });
      }
    }
  }

  static async update (req, res) {
    if (!req.body) {
      res.status(400).send({ errorMessage: 'Content can not be empty!' });
    }

    try {
      const data = await Project.updateById(req.params.id, new Project(req.body));
      res.send({ data });
    } catch (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({ errorMessage: `Project with id ${req.params.id} not found.` });
      } else {
        res.status(500).send({ errorMessage: 'Error updating project with id ' + req.params.id });
      }
    }
  }

  static async delete (req, res) {
    try {
      await Project.remove(req.params.id);
      res.send({ message: 'Project was deleted successfully!' });
    } catch (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found project with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: 'Could not delete project with id ' + req.params.id
        });
      }
    }
  }
}

module.exports = ProjectsController;