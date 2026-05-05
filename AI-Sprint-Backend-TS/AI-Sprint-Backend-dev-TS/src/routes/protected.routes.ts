import express from 'express';
import * as ProjectController from '../modules/controllers/project.controller.js';
import * as TaskController from '../modules/controllers/task.controller.js';
import validateObjectId from '../middleware/validateObjectId.middleware.js';

const router = express.Router();

/* =========================
   PROJECT ROUTES
========================= */

router.post('/projects', ProjectController.CreateProjectWithGeneratedTasks);
router.get('/projects', ProjectController.GetAllProjects);

router.get(
    '/projects/:projectId',
    validateObjectId('projectId'),
    ProjectController.GetProjectDetails
);

router.delete(
    '/projects/:id',
    validateObjectId('id'),
    ProjectController.DeleteProject
);

router.patch(
    '/projects/:id',
    validateObjectId('id'),
    ProjectController.UpdateProject
);

/* =========================
   TASK ROUTES
========================= */

router.post(
    '/tasks/:projectId',
    validateObjectId('projectId'),
    TaskController.AddNewTask
);

router.get(
    '/tasks/:projectId',
    validateObjectId('projectId'),
    TaskController.GetAllTasks
);

router.delete(
    '/tasks/:id',
    validateObjectId('id'),
    TaskController.DeleteTask
);

router.patch(
    '/tasks/:id',
    validateObjectId('id'),
    TaskController.UpdateTask
);

export default router;
