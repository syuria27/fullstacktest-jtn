package com.syukron.test.jtn.api.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.syukron.test.jtn.api.model.entity.Contact;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Syukron R. Ardhi
 * @created 01/03/22
 */
public class EditContact {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private Long id;
        @JsonProperty("no_hp")
        private String noHp;
        private String provider;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Response {
        private boolean error;
        private String message;
        private Contact contact;
    }
}
