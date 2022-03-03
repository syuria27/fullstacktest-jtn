package com.syukron.test.jtn.api.model.dto;

import com.syukron.test.jtn.api.model.entity.Contact;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Syukron R. Ardhi
 * @created 01/03/22
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OutputContact {

    private boolean error;
    private String message;
    private int evenCount;
    private List<Contact> evenContacts;
    private int oddCount;
    private List<Contact> oddContacts;
}
