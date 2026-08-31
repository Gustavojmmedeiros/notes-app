package com.notes.backend_java.service;

import com.notes.backend_java.model.Tag;
import com.notes.backend_java.repository.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TagService {

  private final TagRepository tagRepository;

  public TagService(TagRepository tagRepository) {
    this.tagRepository = tagRepository;
  }

  public List<Tag> getAll() {
    return tagRepository.findAll();
  }

  public Tag getOne(Long id) {
    return tagRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tag not found"));
  }

  public List<Tag> getByLabel(String label) {
    return tagRepository.findByLabel(label);
  }

  public List<Tag> getTagByLabelContaining(String label) {
    return tagRepository.findByLabelContaining(label);
  }

  public Tag createTag(Tag tag) {
    return tagRepository.save(tag);
  }

  public int updateTag(Long id, String label) {
    Tag tag = tagRepository.findById(id)
              .orElseThrow(() -> new RuntimeException("Tag not found"));

    if(label != null) tag.setLabel(label);
    tagRepository.save(tag);

    return 1;
  }

  @Transactional
  public int updateTags(List<Long> ids, String label) {
    if(ids == null || ids.isEmpty()) {
      return 0;
    }

    return tagRepository.updateTagsLabelsByIds(ids, label);
  }

  public void deleteTag(Long id) {
    tagRepository.deleteById(id);
  }

  public int deleteTags(List<Long> ids) {
    if(ids == null || ids.isEmpty()) {
      return 0;
    }

    return tagRepository.deleteTagsByIds(ids);
  }
}