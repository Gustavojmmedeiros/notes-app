package com.notes.backend_java.repository;

import com.notes.backend_java.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
  List<Note> findByContent(String content);
  List<Note> findByTags(String tags);
  List<Note> findByTitle(String title);
  List<Note> findByContentAndTags(String content, String tag);
  List<Note> findByContentAndTitle(String content, String title);
  List<Note> findByTagsAndTitle(String tags, String title);
  List<Note> findByContentAndTagsAndTitle(String content, String tags, 
    String title);
  List<Note> findAllByOrderByUpdatedAtDesc();
}
