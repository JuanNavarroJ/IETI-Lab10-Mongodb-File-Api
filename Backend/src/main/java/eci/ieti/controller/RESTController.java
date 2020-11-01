package eci.ieti.controller;


import com.mongodb.client.gridfs.model.GridFSFile;
import eci.ieti.data.TodoRepository;
import eci.ieti.data.model.Todo;
import eci.ieti.data.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RequestMapping("api")
@RestController
public class RESTController {

    @Autowired
    GridFsTemplate gridFsTemplate;

    @Autowired
    TodoRepository todoRepository;

    @CrossOrigin("*")
    @RequestMapping("/files/{filename}")
    public ResponseEntity<InputStreamResource> getFileByName(@PathVariable String filename) throws IOException {
        try {
            GridFSFile file = gridFsTemplate.findOne(new Query().addCriteria(Criteria.where("filename").is(filename)));
            GridFsResource resource = gridFsTemplate.getResource(file.getFilename());
            return ResponseEntity.ok()
                    .contentType(MediaType.valueOf(resource.getContentType()))
                    .body(new InputStreamResource(resource.getInputStream()));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin("*")
    @PostMapping("/files")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) throws IOException {
        try {
            gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());
            return file.getOriginalFilename();
        } catch (Exception e) {
            return null;
        }
    }

    @CrossOrigin("*")
    @PostMapping("/todo")
    public Todo createTodo(@RequestBody Todo todo) {
        todo.setResponsible(new User("Juan Navarro","Juan.navarro@mail.escuelaing.edu.co","7"));
        todo.setDueDate(new Date());
        todo.setPriority(5);
        todoRepository.save(todo);
        return todo;
    }

    @CrossOrigin("*")
    @GetMapping("/todo")
    public List<Todo> getTodoList() {
        return todoRepository.findAll();
    }

}
