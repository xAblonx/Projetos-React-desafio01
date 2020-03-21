const express = require('express');

const server = express();

//Query params = ?teste=1
//Route params = /users/1
//Request body = {"name": "teste", "email": "teste@gmail.com"}

server.use(express.json());

const projects = [];

server.use(logRequests);

function logRequests(res, res, next) {
  console.count("Número de requisições");

  return next();
}

function checkIfProjectExists(req, res, next) {
  const project = projects.find(p => p.id == req.params.id);

  if(!project) {
    return res.status(400).json({error: "Project does not exist"});
  }

  req.project = project;

  return next();
}

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);
  
  return res.json(projects);
});

server.post('/projects/:id/tasks', checkIfProjectExists, (req, res) => {
  
  const { title } = req.body;
  const { project } = req;
  project.tasks.push(title);

  return res.json(project);
});

server.put('/projects/:id', checkIfProjectExists, (req, res) => {
  
  const { title } = req.body;

   const { project } = req;
   project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkIfProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);
  projects.splice(projectIndex, 1);
  
  return res.send();
});

server.listen(3000);