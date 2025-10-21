package com.finboostplus.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

import com.finboostplus.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "expenses")
@AllArgsConstructor
@NoArgsConstructor
@Data
@SequenceGenerator(name = "seq_expense", sequenceName = "seq_expense", allocationSize = 1, initialValue = 1)
public class Expense {
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_expense")
        private Long id;

        private BigDecimal value;

        private String title;

        private String description;

        @Column(name = "deadline_date")
        private LocalDate deadlineDate;

        @Column(name = "created_at")
        private Instant createdAt;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "category_id")
        private Category category;

        @ManyToOne
        @JoinColumn(name = "group_id")
        private Group group;

        @Enumerated(EnumType.STRING)
        @Column(name = "status", nullable = false)
        private Status status;

        public Expense(String title, String description, BigDecimal value, Category category, Group group,
                        LocalDate deadlineDate, Status status) {
                this.title = title;
                this.description = description;
                this.value = value;
                this.category = category;
                this.group = group;
                this.deadlineDate = deadlineDate;
                this.createdAt = Instant.now();
                this.status = status;
        }

        @Override
        public boolean equals(Object o) {
                if (this == o)
                        return true;
                if (!(o instanceof Expense))
                        return false;
                Expense that = (Expense) o;
                return id != null && id.equals(that.getId());
        }

        @Override
        public int hashCode() {
                return id != null ? id.hashCode() : 0;
        }
}
