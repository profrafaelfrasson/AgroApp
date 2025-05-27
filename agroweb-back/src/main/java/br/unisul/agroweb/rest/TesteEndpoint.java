package br.unisul.agroweb.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/teste")
public class TesteEndpoint {

    private static final String helloFormat = "Hello, %s";

    @GetMapping
    public String teste(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format(helloFormat, name);
    }

}
