package com.notes.backend_java.repository;

import com.notes.backend_java.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

  List<Tag> findByLabel(String label);

  // For partial searches of a tag,
  // ex: findByLabelContaining("wor") => ["work"]
  List<Tag> findByLabelContaining(String label);

  // Update many tags
  @Modifying
  @Query("UPDATE Tag t SET t.label = :label WHERE t.id IN :ids")
  int updateTagsLabelsByIds(@Param("ids") List<Long> ids, @Param("label") String label);

  // Delete many tags
  @Modifying
  @Query("DELETE FROM Tag t WHERE t.id IN :ids")
  int deleteTagsByIds(@Param("ids") List<Long> ids);
}