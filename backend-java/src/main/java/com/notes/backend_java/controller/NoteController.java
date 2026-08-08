package com.notes.backend_java.controller;

import com.notes.backend_java.model.Note;
import com.notes.backend_java.repository.NoteRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/notes")
public class NoteController {
  
  private final NoteRepository noteRepository;

  public NoteController(NoteRepository noteRepository) {
    this.noteRepository = noteRepository;
  }

  // GET /notes/:id - getOne
  @GetMapping("/{id}")
  public Note getNote(@PathVariable Long id) {
      return noteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Note not found"));
  }

  // GET /notes/filters - getMany
  @GetMapping
  public List<Note> getNotes(
    @RequestParam(required = false) String content,
    @RequestParam(required = false) String ids,
    @RequestParam(required = false) String title,
    @RequestParam(required = false) String tag) {

    System.out.println(ids);

    if(ids != null && !ids.isEmpty()) {
      List<Long> idsList = Arrays.stream(ids.split(","))
                            .map(Long::parseLong)
                            .collect(Collectors.toList());

      return noteRepository.findAllById(idsList);
    }

    if(content != null && tag != null) {
      return noteRepository.findByContentAndTags(content, tag);
    }
    
    if(content != null && title != null) {
      return noteRepository.findByContentAndTitle(content, title);
    }

    if(tag != null && title != null) {
      return noteRepository.findByTagsAndTitle(tag, title);
    }

    if(content != null & tag != null && title != null) {
      return noteRepository.findByContentAndTagsAndTitle(content, tag, title);
    }

    if(content != null) {
      return noteRepository.findByContent(content);
    }

    if(tag != null) {
      return noteRepository.findByTags(tag);
    }

    if(title != null) {
      return noteRepository.findByTitle(title);
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
