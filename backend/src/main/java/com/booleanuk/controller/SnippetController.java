package com.booleanuk.controller;

import com.booleanuk.dto.SnippetDTO;
import com.booleanuk.model.Snippet;
import com.booleanuk.model.User;
import com.booleanuk.reponses.ErrorResponse;
import com.booleanuk.reponses.Response;
import com.booleanuk.reponses.SnippetListResponse;
import com.booleanuk.reponses.SnippetResponse;
import com.booleanuk.repository.SnippetRepository;
import com.booleanuk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("snippets")
public class SnippetController {
    @Autowired
    SnippetRepository repository;
    @Autowired
    UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Response<?>> getAll() {
        List<Snippet> snippets = ResponseEntity.ok(repository.findAll()).getBody();
        SnippetListResponse snippetListResponse = new SnippetListResponse();
        snippetListResponse.set(snippets);
        return ResponseEntity.ok(snippetListResponse);
    }

    @GetMapping("{id}")
    public ResponseEntity<Response<?>> getById(@PathVariable Integer id) {
        Snippet snippet = this.repository.findById(id).orElse(null);
        if (snippet == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("Snippet not found");
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(response(snippet));
    }

    @PostMapping()
    public ResponseEntity<Response<?>> createSnippet(@RequestBody SnippetDTO snippetDTO) {
        User user = this.userRepository.findById(snippetDTO.getUserId()).orElse(null);
        if (user == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("User is not found");
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        Snippet snippet = new Snippet(
                snippetDTO.getTitle(),
                snippetDTO.getSnippet(),
                new Date(),
                new Date(),
                user
        );
        user.addSnippet(snippet);

        this.repository.save(snippet);

        return ResponseEntity.ok(response(snippet));
    }


    public SnippetResponse response(Snippet snippet) {
        SnippetResponse snippetResponse = new SnippetResponse();
        snippetResponse.set(snippet);
        return snippetResponse;
    }
}
