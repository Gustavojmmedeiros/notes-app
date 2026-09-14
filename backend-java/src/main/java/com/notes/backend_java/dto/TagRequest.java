package com.notes.backend_java.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TagRequest {
  // Only ids, but not id, because id comes from the URL - ids comes from the body
  @JsonProperty("ids")
  private List<Long> ids;
  
  @JsonProperty("label")
  private String label;

  public TagRequest() {}

  public List<Long> getIds() {
    return ids;
  }

  public void setId(List<Long> ids) {
    this.ids = ids;
  }

  public String getLabel() {
    return label;
  }

  public void setLabel(String label) {
    this.label = label;
  }
}