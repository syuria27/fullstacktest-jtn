package com.syukron.test.jtn.api.model.entity;

import com.syukron.test.jtn.api.util.EncryptionUtils;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * @author Syukron R. Ardhi
 * @created 01/03/22
 */
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "contact")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "no_hp", nullable = false, length = 50)
    private String noHp;

    @Column(name = "provider", nullable = false, length = 50)
    private String provider;

    /*@PostLoad
    public void decryptNoHp() {
        // decrypts nohp during DATABASE READ
        this.noHp = EncryptionUtils.decrypt(noHp);
    }

    @PrePersist
    @PreUpdate
    public void encryptNoHp() {
        // encrypts nohp during INSERT/UPDATE
        this.noHp = EncryptionUtils.encrypt(noHp);
    }*/
}
