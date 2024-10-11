package com.booleanuk.dto;

import lombok.Getter;

import java.util.Date;

@Getter
public class SnippetDTO {
    private String title;
    private Integer userId;
    private String snippet;
    private Date createdAt;
    private Date updatedAt;

}
