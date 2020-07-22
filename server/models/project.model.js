const db = require('../db.js');

class Project {
  constructor (project) {
    this.id = project.id;
    this.name = project.name;
    this.logo = project.logo;
    this.client = project.client;
    this.start_date = project.start_date;
    this.delivery_date = project.delivery_date;
    this.description = project.description;
    this.link = project.link;
  }

  static async create (newProject) {
    return db.query('INSERT INTO projects SET ?', newProject).then(res => { newProject.id = res.insertId; return newProject; });
  }

  static async findById (id) {
    return db.query(`SELECT * FROM projects WHERE id = ${id}`)
      .then(rows => {
        if (rows.length) {
          return Promise.resolve(rows[0]);
        } else {
          const err = new Error();
          err.kind = 'not_found';
          return Promise.reject(err);
        }
      });
  }

  static async nameAlreadyExists (name) {
    return db.query('SELECT * FROM projects WHERE name = ?', [name])
      .then(rows => {
        if (rows.length) {
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      });
  }

  static async getAll (result) {
    return db.query('SELECT * FROM projects');
  }

  static async updateById (id, project) {
    return db.query(
      'UPDATE projects SET name = ?, logo = ?, client = ?, start_date = ?, delivery_date = ?, description = ?, link = ? WHERE id = ?',
      [project.name, project.logo, project.client, project.start_date, project.delivery_date, project.description, project.link, id]
    ).then(() => this.findById(id));
  }

  static async remove (id) {
    return db.query('DELETE FROM projects WHERE id = ?', id).then(res => {
      if (res.affectedRows !== 0) {
        return Promise.resolve();
      } else {
        const err = new Error();
        err.kind = 'not_found';
        return Promise.reject(err);
      }
    });
  }

  static async removeAll (result) {
    return db.query('DELETE FROM projects');
  }
}

module.exports = Project;
