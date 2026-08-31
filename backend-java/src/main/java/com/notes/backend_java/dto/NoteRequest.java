package com.notes.backend_java.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NoteRequest {
  // Only ids, but not id, because id comes from the URL - ids comes from the body
  @JsonProperty("ids")
  private List<Long> ids;

  @JsonProperty("content")
  private String content;

  @JsonProperty("title")
  private String title;

  @JsonProperty("tagIds")
  private List<Long> tagIds;

  public NoteRequest() {}

  public List<Long> getIds() {
    return ids;
  }

  public void setIds(List<Long> ids) {
    this.ids = ids;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public List<Long> getTagIds() {
    return tagIds;
  }

  public void setTagIds(List<Long> tagIds) {
    this.tagIds = tagIds;
  }
  
}
