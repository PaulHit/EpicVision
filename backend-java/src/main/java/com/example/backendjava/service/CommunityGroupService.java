package com.example.backendjava.service;

import com.example.backendjava.domain.CommunityGroup;
import com.example.backendjava.dto.CommunityGroupCreateDTO;
import com.example.backendjava.dto.CommunityGroupResponseDTO;
import com.example.backendjava.repository.CommunityGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityGroupService {
    private final CommunityGroupRepository groupRepository;

    public List<CommunityGroupResponseDTO> getAll() {
        return groupRepository.findAll().stream()
                .map(g -> new CommunityGroupResponseDTO(g.getId(), g.getName(), g.getDescription(), g.getWhatsappUrl()))
                .collect(Collectors.toList());
    }

    public CommunityGroupResponseDTO create(CommunityGroupCreateDTO dto) {
        CommunityGroup group = CommunityGroup.builder()
                .name(dto.name())
                .description(dto.description())
                .build();
        CommunityGroup saved = groupRepository.save(group);
        return new CommunityGroupResponseDTO(saved.getId(), saved.getName(), saved.getDescription(), saved.getWhatsappUrl());
    }
}
