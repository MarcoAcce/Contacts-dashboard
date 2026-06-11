package com.contacts.controller;

import com.contacts.dto.ContactDto;
import com.contacts.dto.ContactRequest;
import com.contacts.model.Contact;
import com.contacts.repository.ContactRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @GetMapping
    public List<ContactDto> getAllContacts(@AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return contactRepository.findByUserId(userId).stream()
                .map(this::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactDto> getContact(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return contactRepository.findByIdAndUserId(id, userId)
                .map(this::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ContactDto> createContact(@Valid @RequestBody ContactRequest request,
                                                     @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        Contact contact = new Contact();
        contact.setUserId(userId);
        applyRequest(contact, request);
        Contact saved = contactRepository.save(contact);
        return ResponseEntity.status(HttpStatus.CREATED).body(toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactDto> updateContact(@PathVariable Long id,
                                                     @Valid @RequestBody ContactRequest request,
                                                     @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return contactRepository.findByIdAndUserId(id, userId)
                .map(contact -> {
                    applyRequest(contact, request);
                    Contact saved = contactRepository.save(contact);
                    return ResponseEntity.ok(toDto(saved));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        return contactRepository.findByIdAndUserId(id, userId)
                .map(contact -> {
                    contactRepository.delete(contact);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private void applyRequest(Contact contact, ContactRequest request) {
        contact.setName(request.name());
        contact.setAddress(request.address());
        contact.setPhoneNumber(request.phoneNumber());
        contact.setBirthday(request.birthday());
        contact.setEmail(request.email());
    }

    private ContactDto toDto(Contact contact) {
        return new ContactDto(
                contact.getId(),
                contact.getName(),
                contact.getAddress(),
                contact.getPhoneNumber(),
                contact.getBirthday(),
                contact.getEmail()
        );
    }
}
