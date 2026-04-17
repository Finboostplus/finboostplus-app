package com.finboostplus.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "categories")
@SequenceGenerator(name = "seq_category", sequenceName = "seq_category", allocationSize = 1, initialValue = 1)
@AllArgsConstructor
@NoArgsConstructor
public class Category {
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_category")
        private Long id;

        @Column(unique = true)
        private String name;

        @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
        private Set<Expense> expenses;

        @Override
        public boolean equals(Object o) {
                if (this == o)
                        return true;
                if (!(o instanceof Category))
                        return false;
                Category category = (Category) o;
                return id != null && id.equals(category.id);
        }

        @Override
        public int hashCode() {
                return id != null ? id.hashCode() : 0;
        }
}
