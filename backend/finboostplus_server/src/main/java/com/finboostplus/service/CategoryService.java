package com.finboostplus.service;

import com.finboostplus.exception.ResourceNotFoundException;
import com.finboostplus.model.Category;
import com.finboostplus.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public Category getCategory(Long idCategory){
        Category cat = new Category();
        cat = categoryRepository.findById(idCategory)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada"));
        return cat;
    }
}
