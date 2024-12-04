package org.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/client")
    public String client() {
        return "client";
    }

    @GetMapping("/server")
    public String server() {
        return "server";
    }
}