package com.contacts.dto;

import java.time.LocalDate;

public record ContactDto(
    Long id,
    String name,
    String address,
    String phoneNumber,
    LocalDate birthday,
    String email
) {}
