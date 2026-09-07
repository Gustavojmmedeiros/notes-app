package com.notes.backend_java.service;

import com.notes.backend_java.model.Note;
import com.notes.backend_java.model.Tag;
import com.notes.backend_java.repository.NoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {
  
  private final NoteRepository noteRepository;
  private final TagService tagService;

  public NoteService(NoteRepository noteRepository, TagService tagService) {
    this.noteRepository = noteRepository;
    this.tagService = tagService;
  }

  public List<Note> getAll() {
    return noteRepository.findAll();
  }

  public List<Note> getAllOrderedByUpdatedAt() {
    return noteRepository.findAllByOrderByUpdatedAtDesc();
  }

  @Transactional
  public Note getOne(Long id) {
    Note note = noteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Note not found"));

    return note;
  }

  public List<Note> getNotesByIds(List<Long> ids) {
    return noteRepository.findAllById(ids);
  }

  public List<Note> filterNotes(String content, String tagLabel, String title) {
    List<Note> notes = noteRepository.findAll();

    if(content != null && !content.isEmpty()) {
      notes = notes.stream()
              .filter(n -> n.getContent().toLowerCase().contains(content.toLowerCase()))
              .collect((Collectors.toList()));
    }

    if(title != null && !title.isEmpty()) {
      notes = notes.stream()
              .filter(n -> n.getTitle().toLowerCase().contains(title.toLowerCase()))
              .collect((Collectors.toList()));
    }

    if(tagLabel != null && !tagLabel.isEmpty()) {
      notes = notes.stream()
              .filter(n -> n.getTags().stream()
                      .anyMatch(t -> t.getLabel().toLowerCase().contains(tagLabel.toLowerCase())))
                      .collect(Collectors.toList());

    }

    return notes;
  }

  @Transactional
  public Note createNote(Note note) {
    note.setCreatedAt(LocalDateTime.now());
    note.setUpdatedAt(LocalDateTime.now());

    Note createdNote = noteRepository.save(note);

    // Forces tags "existence"
    createdNote.getTags().size();

    return createdNote;
  }

  public int updateOne(Long id, String content, String title, List<Long> tagIds) {
    Note note = getOne(id);

    if(content != null) note.setContent(content);
    if(title   != null) note.setTitle(title);
    if(tagIds  != null) {
      List<Tag> tags = tagService.getAll().stream()
                        .filter(t -> tagIds.contains(t.getId())) // getId from Note model
                        .collect(Collectors.toList());

      note.setTags(tags);  
    }

    note.setUpdatedAt(LocalDateTime.now());
    noteRepository.save(note);

    return 1;
  }

  @Transactional
  public int updateMany(List<Long> ids, String content, String title, List<Long> tagIds) {
    List<Note> notes = noteRepository.findAllById(ids);

    if(notes.isEmpty()) {
      return 0;
    }

    List<Tag> tags = tagIds != null ? tagService.getAll().stream()
                    .filter(t -> tagIds.contains(t.getId()))
                    .collect(Collectors.toList()) : null;

    for(Note note : notes) {
      if(content != null) note.setContent(content);
      if(tags != null) note.setTags(tags);
      if(title != null) note.setTitle(title);
      note.setUpdatedAt(LocalDateTime.now());
    }

    noteRepository.saveAll(notes);

    return notes.size();
    // return noteRepository.updateMany(ids, title, content, tags, LocalDateTime.now());
  }

  public void deleteNote(Long id) {
    noteRepository.deleteById(id);
  }

  @Transactional
  public int deleteNotes(List<Long> ids) {
    // noteRepository.deleteAllById(ids);
    if(ids == null || ids.isEmpty()) {
      return 0;
    }

    List<Note> notes = noteRepository.findAllById(ids);

    int count = notes.size();

    noteRepository.deleteAll(notes);

    return count;
  }

  @Transactional
  public Note addTagToNote(Long noteId, Long tagId) {
    Note note = getOne(noteId);
    Tag tag = tagService.getOne(tagId);

    if(!note.getTags().contains(tag)) {
      note.getTags().add(tag);
    }

    return noteRepository.save(note);
  }

  @Transactional
  public Note removeTagFromNote(Long noteId, Long tagId) {
    Note note = getOne(noteId);
    Tag tag = tagService.getOne(tagId);

    note.getTags().remove(tag);

    return noteRepository.save(note);
  }
}
