package com.notes.backend_java.service;

import com.notes.backend_java.model.Note;
import com.notes.backend_java.repository.NoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoteService {
  
  private final NoteRepository noteRepository;

  public NoteService(NoteRepository noteRepository) {
    this.noteRepository = noteRepository;
  }

  public List<Note> getAll() {
    return noteRepository.findAll();
  }

  public Note getOne(Long id) {
    return noteRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Note not found"));
  }

  public List<Note> getNotesByIds(List<Long> ids) {
    return noteRepository.findAllById(ids);
  }

  public List<Note> findByContent(String content) {
    return noteRepository.findByContent(content);
  }

  public List<Note> findByTags(String tags) {
    return noteRepository.findByTags(tags);
  }

  public List<Note> findByTitle(String title) {
    return noteRepository.findByTitle(title);
  }

  public List<Note> findByContentAndTags(String content, String tags) {
    return noteRepository.findByContentAndTags(content, tags);
  }

  public List<Note> findByContentAndTitle(String content, String title) {
    return noteRepository.findByContentAndTitle(content, title);
  }

  public List<Note> findByTagsAndTitle(String tags, String title) {
    return noteRepository.findByTagsAndTitle(tags, title);
  }

  public List<Note> findByContentAndTagsAndTitle(String content, String tags, String title) {
    return noteRepository.findByContentAndTagsAndTitle(content, tags, title);
  }

  public Note insert(Note note) {
    note.setCreatedAt(LocalDateTime.now());
    note.setUpdatedAt(LocalDateTime.now());

    return noteRepository.save(note);
  }

  public Note updateOne(String content, Long id, List<String> tags, String title) {
    Note note = getOne(id);

    if(content != null) note.setContent(content);
    if(tags != null && !tags.isEmpty()) note.setTags(tags);
    if(title != null) note.setTitle(title);

    note.setUpdatedAt(LocalDateTime.now());

    return noteRepository.save(note);
  }

  @Transactional
  public int updateMany(List<Long> ids, String content, List<String> tags, String title) {
    List<Note> notes = noteRepository.findAllById(ids);

    if(notes.isEmpty()) return 0;

    for(Note note : notes) {
      if(content != null) note.setContent(content);
      if(tags != null) note.setTags(tags);
      if(title != null) note.setTitle(title);
      note.setUpdatedAt(LocalDateTime.now());
    }

    noteRepository.saveAll(notes);

    return notes.size();
  }

  public void deleteOne(Long id) {
    noteRepository.deleteById(id);
  }

  @Transactional
  public void deleteMany(List<Long> ids) {
    noteRepository.deleteAllById(ids);
  }

}
