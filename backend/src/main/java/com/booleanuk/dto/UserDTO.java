package com.booleanuk.dto;

import com.booleanuk.model.Role;
import lombok.Getter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
public class UserDTO {
    private String email;
    private String username;
    private String password;
    private Set<Role> roles;
    private List<Integer> game;
    private Date createdAt;
    private Date updatedAt;

}
