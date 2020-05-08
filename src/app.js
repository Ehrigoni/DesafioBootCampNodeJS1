const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const likes = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    //const { title, url, techs } = request.body;
    const repository = {  id: uuid(),
                          likes: 0,
                          techs: ["Node", "Express", "TypeScript"],                    
                          title: "Umbriel",
                          url: "https://github.com/Rocketseat/umbriel", 
                        };
    repositories.push(repository);
    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
   const { id } = request.params;
   const { title, url, techs } = request.body;
     
   const repositoryIndex = repositories.findIndex(repository => repository.id == id); 
   
   if (repositoryIndex <0) {
     return response.status(400).json( {error: "repository not found!"} )
   }  
   repositories[repositoryIndex].id = id;
   repositories[repositoryIndex].techs = techs;
   repositories[repositoryIndex].title = title;
   repositories[repositoryIndex].url = url;
     
   return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
   const { id } = request.params;
   const repositoryIndex = repositories.findIndex(repository => repository.id == id );
  
   if (repositoryIndex <0) {
     return response.status(400).json( {error: "repository not found!"} )
   }

   repositories.splice(repositoryIndex, 1);
   return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
   const { id } = request.params;
 
   const repositoryIndex = repositories.findIndex(repository => repository.id == id);
   
   if (repositoryIndex < 0) {
      return response.status(400).json("Repository not found!");
   }

   repositories[repositoryIndex].id = id;
   repositories[repositoryIndex].likes++;
   
   return response.json(repositories[repositoryIndex]);

});

module.exports = app;
