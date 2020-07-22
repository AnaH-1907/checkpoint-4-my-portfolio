const projectController = require('../controllers/project.controller.js');
const router = require('express').Router();

router.post('/', projectController.create);
router.get('/', projectController.findAll);
router.get('/:id', projectController.findOne);
router.patch('/:id', projectController.update);
router.delete('/:id', projectController.delete);

module.exports = router;
