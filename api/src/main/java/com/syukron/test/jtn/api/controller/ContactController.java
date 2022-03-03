package com.syukron.test.jtn.api.controller;

import com.syukron.test.jtn.api.model.dto.EditContact;
import com.syukron.test.jtn.api.model.dto.SaveContact;
import com.syukron.test.jtn.api.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.ok;

/**
 * @author Syukron R. Ardhi
 * @created 01/03/22
 */
@CrossOrigin
@RestController
@RequestMapping
public class ContactController {

    @Value("${server.port}")
    private String port;

    @Autowired
    private ContactService contactService;

    @GetMapping("status")
    public ResponseEntity<?> status(){
        return ok().body("api service start on port "+port);
    }

    @GetMapping("contacts")
    public ResponseEntity<?> contacts(){
        return ok().body(contactService.getContactList());
    }

    @GetMapping("contact")
    public ResponseEntity<?> contact(@RequestParam Long id){
        return ok().body(contactService.getContact(id));
    }

    @PostMapping("contact")
    public ResponseEntity<?> contact(@RequestBody SaveContact.Request request){
        return ok().body(contactService.saveContact(request));
    }

    @PutMapping("contact")
    public ResponseEntity<?> editContact(@RequestBody EditContact.Request request){
        return ok().body(contactService.editContact(request));
    }

    @DeleteMapping("contact")
    public ResponseEntity<?> deleteContact(@RequestParam Long id){
        return ok().body(contactService.deleteContact(id));
    }

    @GetMapping("auto")
    public ResponseEntity<?> auto(){
        return ok().body(contactService.saveRandomContacts());
    }

    @GetMapping("output")
    public ResponseEntity<?> output(){
        return ok().body(contactService.getOutputContact());
    }

}
