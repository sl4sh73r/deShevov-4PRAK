package org.example.util;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.util.Base64URL;
import org.springframework.stereotype.Component;

import java.text.ParseException;

@Component
public class JwtParser {

    public String parseToken(String token) throws ParseException, JOSEException {
        JWSObject jwsObject = JWSObject.parse(token);
        Payload payload = jwsObject.getPayload();
        return payload.toString();
    }

    public String getHeader(String token) throws ParseException {
        JWSObject jwsObject = JWSObject.parse(token);
        Base64URL header = jwsObject.getHeader().toBase64URL();
        return header.toString();
    }
}