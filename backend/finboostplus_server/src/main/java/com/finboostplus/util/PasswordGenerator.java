package com.finboostplus.util;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PasswordGenerator {
        private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
        private static final String DIGITS = "0123456789";
        private static final String SPECIAL = "!@#$%&*";
        private static final SecureRandom random = new SecureRandom();

        public static String generateRandomPassword() {
                final int LENGTH = 12;
                List<Character> passwordChars = new ArrayList<>();
                passwordChars.add(UPPERCASE.charAt(random.nextInt(UPPERCASE.length())));
                passwordChars.add(LOWERCASE.charAt(random.nextInt(LOWERCASE.length())));
                passwordChars.add(DIGITS.charAt(random.nextInt(DIGITS.length())));
                passwordChars.add(SPECIAL.charAt(random.nextInt(SPECIAL.length())));
                String allCharacters = UPPERCASE + LOWERCASE + DIGITS + SPECIAL;
                for (int i = 4; i < LENGTH; i++) {
                        passwordChars.add(allCharacters.charAt(random.nextInt(allCharacters.length())));
                }
                Collections.shuffle(passwordChars, random);
                StringBuilder password = new StringBuilder(LENGTH);
                for (Character ch : passwordChars) {
                        password.append(ch);
                }
                return password.toString();
        }
}
