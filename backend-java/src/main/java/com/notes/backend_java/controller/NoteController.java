package com.notes.backend_java.controller;

import com.notes.backend_java.dto.NoteRequest;
import com.notes.backend_java.model.Note;
import com.notes.backend_java.repository.NoteRepository;
import com.notes.backend_java.service.NoteService;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/notes")
public class NoteController {

  private final NoteService noteService;

  public NoteController(NoteService noteService) {
    this.noteService = noteService;
  }


  // GET /notes/:id - getOne
  @GetMapping("/{id}")
  public Note getNote(@PathVariable Long id) {
      return noteService.getOne(id);
  }

  // @GetMapping
  // public List<Note> getAllNotes() {
  //   return noteService.getAllOrderedByUpdatedAt();
  // }

  // GET /notes/filters - getMany
  @GetMapping
  public List<Note> getNotes(
    @RequestParam(required = false) String content,
    @RequestParam(required = false) String ids,
    @RequestParam(required = false) String title,
    @RequestParam(required = false) String tag) {

      if(
        content == null && 
        ids     == null &&
        title   == null &&
        tag     == null
      ) {
        return noteService.getAllOrderedByUpdatedAt();
      }

    if(ids != null && !ids.isEmpty()) {
      List<Long> idsList = Arrays.stream(ids.split(","))
                            .map(Long::parseLong)
                            .collect(Collectors.toList());

      return noteService.getNotesByIds(idsList);
    }

    if(content != null && tag != null) {
      // return noteRepository.findByContentAndTags(content, tag);
      return noteService.findByContentAndTags(content, tag);
    }
    
    if(content != null && title != null) {
      // return noteRepository.findByContentAndTitle(content, title);
      return noteService.findByContentAndTitle(content, title);
    }

    if(tag != null && title != null) {
      return noteService.findByTagsAndTitle(tag, title);
    }

    if(content != null & tag != null && title != null) {
      return noteService.findByContentAndTagsAndTitle(content, tag, title);
    }

    if(content != null) {
      return noteService.findByContent(content);
    }

    if(tag != null) {
      return noteService.findByTags(tag);
    }

    if(title != null) {
      return noteService.findByTitle(title);
    }

    return noteService.getAll();
  }
  
  // POST /notes - insert
  @PostMapping
  public Note insert(@RequestBody Note note) {

    return noteService.insert(note);
  }

  @PatchMapping("/{id}")
  public Note updateOne(@PathVariable Long id, @RequestBody Note note) {
    return noteService.updateOne(
      note.getContent(),
      id,
      note.getTags(),
      note.getTitle()
    );
  }

  @PatchMapping
  public int updateMany(@RequestBody NoteRequest request) {

    return noteService.updateMany(
      request.getIds(),
      request.getContent(),
      request.getTags(),
      request.getTitle()
    );
  }

  @DeleteMapping("/{id}")
  public void deleteOne(@PathVariable Long id) {
    noteService.deleteOne(id);
  }

  @DeleteMapping
  public void deleteMany(@RequestBody NoteRequest request) {
    noteService.deleteMany(request.getIds());
  }
}
