package com.finboostplus.model;

import java.time.Instant;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

        @CreatedDate
        @Column(name = "created_at")
        private Instant createdAt;

        @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
        public Set<Expense> expenses;
}
