package com.finboostplus.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
@SequenceGenerator(
        name = "seq_expense",
        sequenceName = "seq_expense",
        allocationSize = 1,
        initialValue = 1)
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_expense")
    private Long id;

    private Double value;

    private String tile;

    private String description;

    @Column(name = "deadline_date")
    private LocalDateTime deadlineDate;

    @Column(name = "creat_at")
    private LocalDateTime creatAt;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "id_group")
    private Group group;
}
