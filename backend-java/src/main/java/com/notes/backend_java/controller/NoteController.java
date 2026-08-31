package com.notes.backend_java.controller;

import com.notes.backend_java.dto.NoteRequest;
import com.notes.backend_java.model.Note;
import com.notes.backend_java.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

  // GET /notes/filters - getMany
  @GetMapping
  public List<Note> getNotes(
    @RequestParam(required = false) String content,
    @RequestParam(required = false) String title,
    @RequestParam(required = false) String tag,
    @RequestParam(required = false) String ids) {

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

    return noteService.filterNotes(content, tag, title);
  }
  
  // POST /notes - insert
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Note create(@RequestBody Note note) {

    return noteService.createNote(note);
  }

  @PatchMapping("/{id}")
  public Map<String, Integer> updateOne(@PathVariable Long id, @RequestBody NoteRequest request) {
    int updatedNote = noteService.updateOne(
                        id,
                        request.getContent(),
                        request.getTitle(),
                        request.getTagIds()
                      );
    
    Map<String, Integer> response = new HashMap<>();
    response.put("updated", updatedNote);

    return response;
  }

  @PatchMapping
  public Map<String, Integer> updateMany(@RequestBody NoteRequest request) {
    int updatedNotes = noteService.updateMany(
                    request.getIds(),
                    request.getContent(),
                    request.getTitle(),
                    request.getTagIds()
                  );
    
    Map<String, Integer> response = new HashMap<>();
    response.put("updated", updatedNotes);

    return response;
  }

  @DeleteMapping("/{id}")
  public Map<String, Boolean> deleteOne(@PathVariable Long id) {
    noteService.deleteNote(id);

    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", true);

    return response;
  }

  @DeleteMapping
  public Map<String, Integer> deleteMany(@RequestBody NoteRequest request) {
    int deletedNotes = noteService.deleteNotes(request.getIds());

    Map<String, Integer> response = new HashMap<>();
    response.put("deleted", deletedNotes);

    return response;
  }
}
