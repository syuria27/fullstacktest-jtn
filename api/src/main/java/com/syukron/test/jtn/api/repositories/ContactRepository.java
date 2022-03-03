package com.syukron.test.jtn.api.repositories;

import com.syukron.test.jtn.api.model.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Syukron R. Ardhi
 * @created 01/03/22
 */
@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    @Query(value = "select * from contact where mod(cast(right(no_hp,1) as integer), 2) = 0", nativeQuery = true)
    List<Contact> getEvenNoHp();

    @Query(value = "select * from contact where mod(cast(right(no_hp,1) as integer), 2) <> 0", nativeQuery = true)
    List<Contact> getOddNoHp();
}
