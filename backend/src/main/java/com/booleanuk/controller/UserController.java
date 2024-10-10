package com.booleanuk.controller;


import com.booleanuk.dto.UserDTO;
import com.booleanuk.model.User;
import com.booleanuk.reponses.ErrorResponse;
import com.booleanuk.reponses.Response;
import com.booleanuk.reponses.UserListResponse;
import com.booleanuk.reponses.UserResponse;
import com.booleanuk.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    UserRepository repository;

    @GetMapping
    public ResponseEntity<Response<?>> getAll() {
        List<User> users = ResponseEntity.ok(repository.findAll()).getBody();
        UserListResponse userListResponse = new UserListResponse();
        userListResponse.set(users);
        return ResponseEntity.ok(userListResponse);
    }

    @GetMapping("{id}")
    public ResponseEntity<Response<?>> getById(@PathVariable Integer id) {
        User user = this.repository.findById(id).orElse(null);
        if(user == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("User not Found");
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
        UserResponse userResponse = new UserResponse();
        userResponse.set(user);
        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("{id}")
    public ResponseEntity<Response<?>> update(@PathVariable Integer id, @RequestBody UserDTO updatedUser) {
        User oldUser = this.repository.findById(id).orElse(null);
        if(oldUser == null) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.set("User not found");
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
        oldUser.setUsername(updatedUser.getUsername());
        oldUser.setEmail(updatedUser.getEmail());
        oldUser.setPassword(updatedUser.getPassword());
        oldUser.setRoles(updatedUser.getRoles());

        UserResponse userResponse = new UserResponse();
        userResponse.set(oldUser);
        this.repository.save(oldUser);
        return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
    }

}
