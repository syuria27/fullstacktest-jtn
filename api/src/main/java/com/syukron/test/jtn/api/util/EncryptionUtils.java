package com.syukron.test.jtn.api.util;

import org.jasypt.util.text.BasicTextEncryptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author Syukron R. Ardhi
 * @created 01/03/22
 */
@Component
public class EncryptionUtils {

    //attribute from jasypt library
    private static BasicTextEncryptor textEncryptor;

    /* constructor */
    public EncryptionUtils(){
        textEncryptor = new BasicTextEncryptor();
        textEncryptor.setPassword("sayaadalahmanusiasuper");
    }


    public static String encrypt(String data){
        return textEncryptor.encrypt(data);
    }

    public static String decrypt(String encriptedData){
        return textEncryptor.decrypt(encriptedData);
    }
}
