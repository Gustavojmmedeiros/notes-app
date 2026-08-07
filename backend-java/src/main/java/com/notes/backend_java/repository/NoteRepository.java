package com.notes.backend_java.repository;

import com.notes.backend_java.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

  List<Note> findByTitleContaining(String title);
  List<Note> findByTagsContaining(String tag);
  List<Note> findByTitleContainingAndTagsContaining(String title, String tag);
}
