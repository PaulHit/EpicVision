package com.example.backendjava.service;

import com.example.backendjava.domain.LocalBusiness;
import com.example.backendjava.domain.User;
import com.example.backendjava.dto.LocalBusinessCreateDTO;
import com.example.backendjava.dto.LocalBusinessResponseDTO;
import com.example.backendjava.repository.LocalBusinessRepository;
import com.example.backendjava.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class LocalBusinessService {
    private final LocalBusinessRepository businessRepository;
    private final UserRepository userRepository;
    private final LocalBusinessRepository localBusinessRepository;

    public List<LocalBusinessResponseDTO> getAll() {
        return businessRepository.findAll().stream()
            .map(b -> new LocalBusinessResponseDTO(
                b.getId(), b.getName(), b.getDescription(),
                b.getCategory().name(), b.getLocation(), b.getContactInfo(),
                b.getAddedBy().getUsername()
            )).collect(Collectors.toList());
    }

    public LocalBusinessResponseDTO create(LocalBusinessCreateDTO dto) {
        User dummyUser = userRepository.findById(1).orElseThrow();
        LocalBusiness business = LocalBusiness.builder()
                .name(dto.name())
                .description(dto.description())
                .category(LocalBusiness.Category.valueOf(dto.category()))
                .location(dto.location())
                .contactInfo(dto.contactInfo())
                .addedBy(dummyUser)
                .build();
        LocalBusiness saved = businessRepository.save(business);
        return new LocalBusinessResponseDTO(saved.getId(), saved.getName(), saved.getDescription(), saved.getCategory().name(), saved.getLocation(), saved.getContactInfo(), dummyUser.getUsername());
    }

    public List<LocalBusinessResponseDTO> getByCategory(String category) {
        try {
            LocalBusiness.Category enumCategory = LocalBusiness.Category.valueOf(category.toUpperCase());
            return businessRepository.findByCategory(enumCategory).stream()
                    .map(b -> new LocalBusinessResponseDTO(
                            b.getId(),
                            b.getName(),
                            b.getDescription(),
                            b.getCategory().name(),
                            b.getLocation(),
                            b.getContactInfo(),
                            b.getAddedBy().getUsername()
                    ))
                    .collect(Collectors.toList());
        }catch (IllegalArgumentException e){
            return Collections.emptyList();}
    }

    public List<LocalBusinessResponseDTO> search(String keyword) {
        LocalBusiness.Category matchedCategory = null;
        try {
            matchedCategory = LocalBusiness.Category.valueOf(keyword.toUpperCase());
        } catch (IllegalArgumentException ignored) {
            // not a valid category, treat it as just a name search
        }

        List<LocalBusiness> results;
        if (matchedCategory != null) {
            results = businessRepository.findByNameContainingIgnoreCaseOrCategory(keyword, matchedCategory);
        } else {
            results = businessRepository.findByNameContainingIgnoreCase(keyword);
        }

        return results.stream()
                .map(b -> new LocalBusinessResponseDTO(
                        b.getId(),
                        b.getName(),
                        b.getDescription(),
                        b.getCategory().name(),
                        b.getLocation(),
                        b.getContactInfo(),
                        b.getAddedBy().getUsername()
                ))
                .collect(Collectors.toList());
    }

} 