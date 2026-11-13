package com.pastryshop.business_service;

import com.pastryshop.business_service.enums.ProductFeature;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_id", nullable = false)
    private Business business;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(length = 2000)
    private String ingredients;

    @Column(length = 1000)
    private String allergens;

    @Column(length = 1000)
    private String imageUrl;

    @ElementCollection
    @CollectionTable(
            name = "product_features",
            joinColumns = @JoinColumn(name = "product_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "feature", nullable = false)
    @Builder.Default
    private Set<ProductFeature> productFeatures = new HashSet<>();

    @Column(nullable = false)
    @Builder.Default
    private boolean available = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}