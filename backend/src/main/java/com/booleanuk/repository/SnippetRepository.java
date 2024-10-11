package com.booleanuk.repository;

import com.booleanuk.model.Snippet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SnippetRepository extends JpaRepository<Snippet, Integer> {
}
