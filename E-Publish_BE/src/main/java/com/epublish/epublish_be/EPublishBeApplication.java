package com.epublish.epublish_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class EPublishBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(EPublishBeApplication.class, args);
    }

}
