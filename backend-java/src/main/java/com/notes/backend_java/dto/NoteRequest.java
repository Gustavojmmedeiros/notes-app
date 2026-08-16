package com.notes.backend_java.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NoteRequest {
  @JsonProperty("ids")
  private List<Long> ids;
  @JsonProperty("content")
  private String content;
  @JsonProperty("tags")
  private List<String> tags;
  @JsonProperty("title")
  private String title;

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
  public List<String> getTags() {
    return tags;
  }
  public void setTags(List<String> tags) {
    this.tags = tags;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  
}
