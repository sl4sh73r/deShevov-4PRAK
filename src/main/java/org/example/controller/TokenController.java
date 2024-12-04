package org.example.controller;

import org.example.util.JwtParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/token")
public class TokenController {

    @Autowired
    private JwtParser jwtParser;

    @PostMapping("/parse")
    public String parseToken(@RequestBody TokenRequest tokenRequest) {
        try {
            return jwtParser.parseToken(tokenRequest.getToken());
        } catch (Exception e) {
            return "Error parsing token: " + e.getMessage();
        }
    }
}

class TokenRequest {
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}