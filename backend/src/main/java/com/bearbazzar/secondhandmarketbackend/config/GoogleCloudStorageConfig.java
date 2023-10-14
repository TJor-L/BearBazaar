package com.bearbazzar.secondhandmarketbackend.config;

import com.google.auth.Credentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;



@Configuration
public class GoogleCloudStorageConfig {
    @Bean
    public Storage storage() throws IOException {
        Credentials credentials = ServiceAccountCredentials.fromStream(getClass().getClassLoader().getResourceAsStream("credential.json"));
        return StorageOptions.newBuilder().setCredentials(credentials).build().getService();
    }
}


