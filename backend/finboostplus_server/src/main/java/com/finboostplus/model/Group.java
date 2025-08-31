package com.finboostplus.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.Set;

@Entity
@Table(name = "groups")
@SequenceGenerator(name = "seq_group", sequenceName = "seq_group", allocationSize = 1, initialValue = 1)
@AllArgsConstructor
@NoArgsConstructor
@Data
@EntityListeners(AuditingEntityListener.class)
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_group")
    private Long id;

    private String name;

    private String description;

    @Column(name = "created_at")
    @CreatedDate
    private Instant createdAt;

    // @OneToMany(mappedBy = "group" , cascade = CascadeType.ALL, orphanRemoval =
    // true)
    // private Set<MemberGroup> memberGroups = new HashSet<>();

    // public Set<MemberGroup> getMemberGroups() {
    // return memberGroups;
    // }
    //
    // public void setMemberGroups(HashSet<MemberGroup> memberGroups) {
    // this.memberGroups = memberGroups;
    // }

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)

    public Set<Expense> expenses;

}
