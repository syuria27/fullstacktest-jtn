package com.syukron.test.jtn.api.service;

import com.syukron.test.jtn.api.model.dto.*;
import com.syukron.test.jtn.api.model.entity.Contact;
import com.syukron.test.jtn.api.repositories.ContactRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.syukron.test.jtn.api.util.NumberUtils.*;

/**
 * @author Syukron R. Ardhi
 * @created 01/03/22
 */
@Slf4j
@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public GetContact getContact(Long id) {
        Optional<Contact> contact = contactRepository.findById(id);
        boolean error = !contact.isPresent();
        String message = error ? "Contact not found" : "Success";
        if (error)
            return GetContact.builder().error(error).message(message).contact(null).build();
        return GetContact.builder().error(error).message(message).contact(contact.get()).build();
    }

    public GetContactList getContactList() {
        List<Contact> contactList = contactRepository.findAll();
        boolean error = contactList.isEmpty();
        String message = error ? "Contact not found" : "Success";
        return GetContactList.builder().error(error).message(message).count(contactList.size()).contacts(contactList).build();
    }

    public SaveContact.Response saveContact(SaveContact.Request request) {
        try {
            if (!isValidMobileNo(request.getNoHp())) {
                return SaveContact.Response.builder().error(true).message("Phone number is not valid").build();
            }
            Contact contact = contactRepository.save(Contact.builder().noHp(request.getNoHp()).provider(request.getProvider()).build());
            return SaveContact.Response.builder().error(false).message("Sucess").contact(contact).build();
        } catch (Exception e) {
            return SaveContact.Response.builder().error(true).message(e.getMessage()).build();
        }
    }

    public EditContact.Response editContact(EditContact.Request request) {
        try {
            if (!isValidMobileNo(request.getNoHp())) {
                return EditContact.Response.builder().error(true).message("Phone number is not valid").build();
            }

            Optional<Contact> contactOptional = contactRepository.findById(request.getId());
            if (!contactOptional.isPresent()) {
                return EditContact.Response.builder().error(true).message("Id phone number is not found").build();
            }

            Contact contact = contactRepository.save(Contact.builder().id(request.getId()).noHp(request.getNoHp()).provider(request.getProvider()).build());
            return EditContact.Response.builder().error(false).message("Sucess").contact(contact).build();
        } catch (Exception e) {
            return EditContact.Response.builder().error(true).message(e.getMessage()).build();
        }
    }

    public DeleteContact deleteContact(Long id) {
        try {
            contactRepository.deleteById(id);
            return DeleteContact.builder().error(false).message("Success").build();
        } catch (Exception e) {
            return DeleteContact.builder().error(true).message(e.getMessage()).build();
        }
    }

    public GetContactList saveRandomContacts() {
        List<Contact> contactList = new ArrayList<>();
        for (int i = 0; i < 25; i++) {
            String kodeProvider = getOddNumber();
            String provider = getProviderName(kodeProvider);
            String noHp = "08"+kodeProvider+get9DigitRandom();
            Contact contact = Contact.builder().noHp(noHp).provider(provider).build();
            contactList.add(contact);
        }

        try {
            contactList = contactRepository.saveAll(contactList);
        } catch (Exception e) {
            e.printStackTrace();
        }

        boolean error = contactList.isEmpty();
        String message = error ? "Contact not found" : "Success";
        return GetContactList.builder().error(error).message(message).count(contactList.size()).contacts(contactList).build();
    }

    public OutputContact getOutputContact() {
        try {
            List<Contact> evenContacts = contactRepository.getEvenNoHp();
            List<Contact> oddContacts = contactRepository.getOddNoHp();
            return OutputContact.builder().error(false).message("Success").evenCount(evenContacts.size()).evenContacts(evenContacts).oddCount(oddContacts.size()).oddContacts(oddContacts).build();
        } catch (Exception e) {
            return OutputContact.builder().error(true).message(e.getMessage()).evenContacts(new ArrayList<>()).oddContacts(new ArrayList<>()).build();
        }

    }

    private String getProviderName(String kode) {
        switch (kode) {
            case "1":
                return "Telkomsel";
            case "3":
                return "Axis";
            case "5":
                return "Indosat";
            case "7":
                return "XL";
            case "9":
                return "Three";
            default:
                return "NONE";
        }
    }
}
