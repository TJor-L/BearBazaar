package com.bearbazzar.secondhandmarketbackend.config;

import com.neverbounce.api.client.NeverbounceClient;
import com.neverbounce.api.client.NeverbounceClientFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class NeverbounceClientConfig {

    @Value("${neverbounce.api.key}")
    private String apiKey;

    @Bean
    public NeverbounceClient neverbounceClient() {
        return NeverbounceClientFactory.create(apiKey);
    }
}

