package com.notes.backend_java.controller;

import com.notes.backend_java.dto.TagRequest;
import com.notes.backend_java.model.Tag;
import com.notes.backend_java.service.TagService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tags")
public class TagController {

  private final TagService tagService;

  public TagController(TagService tagService) {
    this.tagService = tagService;
  }

  // GET /tags/:id - getOne
  @GetMapping("/{id}")
  public Tag getTag(@PathVariable Long id) {
    return tagService.getOne(id);
  }

  // GET /tags/filters - getMany
  @GetMapping
  public List<Tag> getTags(@RequestParam(required = false) String label) {

    if(label != null && !label.isEmpty()) {
      return tagService.getTagByLabelContaining(label);
    }
 
    return tagService.getAll();
  }

  // POST /tags - insert
  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Tag create(@RequestBody Tag tag) {

    //! Think about some verification

    return tagService.createTag(tag);
  }

  // PATCH /tags/:id - update
  @PatchMapping("/{id}")
  public Map<String, Integer> updateOne(@PathVariable Long id, @RequestBody Tag tag) {
    int updatedTag = tagService.updateTag(id, tag.getLabel());

    Map<String, Integer> response = new HashMap<>();
    response.put("updated", updatedTag);

    return response;
  }

  // PATCH /tags - update
  @PatchMapping
  public Map<String, Integer>  updateMany(@RequestBody TagRequest request) {
    int updatedTags = tagService.updateTags(request.getIds(), request.getLabel());

    Map<String, Integer> response = new HashMap<>();
    response.put("updated", updatedTags);

    return response;
  }

  // DELETE /tags:id - delete
  @DeleteMapping("/{id}")
  public Map<String, Boolean> deleteTag(@PathVariable Long id) {

    //! Think about some verification

    tagService.deleteTag(id);

    Map<String, Boolean> response = new HashMap<>();
    response.put("deleted", true);

    return response;
  }

  // Delete /tags - delete
  @DeleteMapping
  public Map<String, Integer> deleteMany(@RequestBody TagRequest request) {

    //! Think about some verification

    int deletedTags = tagService.deleteTags(request.getIds());

    Map<String, Integer> response = new HashMap<>();
    response.put("deleted", deletedTags);

    return response;
  }
}