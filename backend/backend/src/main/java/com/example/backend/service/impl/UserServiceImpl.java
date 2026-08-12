package com.example.backend.service.impl;

import com.example.backend.dto.UserDto;
import com.example.backend.entity.User;
import com.example.backend.exception.NotFoundException;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final UserMapper mapper;

    public UserServiceImpl(UserRepository repository, UserMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<UserDto> findAll() {
        return repository.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public UserDto findById(Long id) {
        return repository.findById(id).map(mapper::toDto).orElseThrow(() -> new NotFoundException("User not found"));
    }

    @Override
    public UserDto create(UserDto dto) {
        if (dto.getEmail() != null && repository.existsByEmail(dto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        if (dto.getPhone() != null && repository.existsByPhone(dto.getPhone())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Phone already exists");
        }
        User user = mapper.fromDto(dto);
        User saved = repository.save(user);
        return mapper.toDto(saved);
    }

    @Override
    public UserDto update(Long id, UserDto dto) {
        User existing = repository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        if (dto.getEmail() != null && !dto.getEmail().equals(existing.getEmail()) && repository.existsByEmail(dto.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        if (dto.getPhone() != null && !dto.getPhone().equals(existing.getPhone()) && repository.existsByPhone(dto.getPhone())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Phone already exists");
        }
        existing.setEmail(dto.getEmail());
        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setPhone(dto.getPhone());
        User saved = repository.save(existing);
        return mapper.toDto(saved);
    }

    @Override
    public void delete(Long id) {
        User existing = repository.findById(id).orElseThrow(() -> new NotFoundException("User not found"));
        repository.delete(existing);
    }
}
