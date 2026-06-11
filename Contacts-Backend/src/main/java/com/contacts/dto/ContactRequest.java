package com.contacts.dto;

import jakarta.validation.constraints.AssertTrue;
import java.time.LocalDate;

public record ContactRequest(
    String name,
    String address,
    String phoneNumber,
    LocalDate birthday,
    String email
) {
    @AssertTrue(message = "At least one field must be provided")
    public boolean isAtLeastOneFieldPresent() {
        return (name != null && !name.isBlank()) ||
               (address != null && !address.isBlank()) ||
               (phoneNumber != null && !phoneNumber.isBlank()) ||
               birthday != null ||
               (email != null && !email.isBlank());
    }
}
