package com.finboostplus.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finboostplus.DTO.CategoryDTO;
import com.finboostplus.exception.ResourceNotFoundException;
import com.finboostplus.model.Category;
import com.finboostplus.repository.CategoryRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryService {
	@Autowired
	CategoryRepository categoryRepository;

	public Category getCategory(Long idCategory) {
		Category cat = new Category();
		cat = categoryRepository.findById(idCategory)
				.orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada"));
		return cat;
	}

	@Transactional(readOnly = true)
	public List<CategoryDTO> findAllCategories() {
		return categoryRepository.findAll()
				.stream()
				.map(entity -> new CategoryDTO(entity.getId(), entity.getName()))
				.collect(Collectors.toList());
	}
}
