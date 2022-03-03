package com.syukron.test.jtn.api.util;

import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author Syukron R. Ardhi
 * @created 01/03/22
 */
public class NumberUtils {

    public static boolean isValidMobileNo(String str) {
        Pattern ptrn = Pattern.compile("^(\\+62|62|0)8[1-9][0-9]{6,9}$");
        Matcher match = ptrn.matcher(str);
        return (match.find() && match.group().equals(str));
    }

    public static String get9DigitRandom() {
        Random rnd = new Random();
        return String.format("%09d", rnd.nextInt(1000000000));
    }

    public static String getOddNumber() {
        Random rnd = new Random();
        int n = rnd.nextInt();
        String r = String.valueOf(2 * n + 1);
        return r.substring(r.length()-1);
    }
}
