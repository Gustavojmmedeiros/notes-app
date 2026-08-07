package com.notes.backend_java.controller;

import com.notes.backend_java.model.Note;
import com.notes.backend_java.repository.NoteRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/notes")
public class NoteController {
  
  private final NoteRepository noteRepository;

  public NoteController(NoteRepository noteRepository) {
    this.noteRepository = noteRepository;
  }

  // GET /notes/:id - getOne
  @GetMapping("/{id}")
  public Note getOne(@PathVariable Long id) {
      return noteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Note not found"));
  }

  // GET /notes/filters - getMany
  @GetMapping
  public List<Note> getMany(
    @RequestParam(required = false) String title,
    @RequestParam(required = false) String tag) {

    if(title != null && tag != null) {
      return noteRepository.findByTitleContainingAndTagsContaining(title, tag);
    }

    if(title != null) {
      return noteRepository.findByTitleContaining(title);
    }

    if(tag != null) {
      return noteRepository.findByTagsContaining(tag);
    }

    return noteRepository.findAll();
  }
  
  // POST /notes - insert
  @PostMapping
  public Note insert(@RequestBody Note note) {
    note.setCreatedAt(LocalDateTime.now());
    note.setUpdatedAt(LocalDateTime.now());

    return noteRepository.save(note);
  }
}
