package com.finboostplus.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tb_group")
@SequenceGenerator(name = "seq_group", sequenceName = "seq_group", allocationSize = 1, initialValue = 1)
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Group {

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    public Set<Expense> expenses;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_group")
    private Long id;
    private String name;
    private String description;
    @Column(name = "created_at")
    @CreatedDate
    private LocalDateTime createdAt;

//   @OneToMany(mappedBy = "group" , cascade = CascadeType.ALL, orphanRemoval = true)
//    private Set<MemberGroup> memberGroups = new HashSet<>();
    @Column(name = "group_creator_id")
    private Long GroupCreatorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

//    public Set<MemberGroup> getMemberGroups() {
//        return memberGroups;
//    }
//
//    public void setMemberGroups(HashSet<MemberGroup> memberGroups) {
//        this.memberGroups = memberGroups;
//    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
