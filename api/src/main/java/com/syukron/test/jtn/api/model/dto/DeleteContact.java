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
public class DeleteContact {

    private boolean error;
    private String message;
}