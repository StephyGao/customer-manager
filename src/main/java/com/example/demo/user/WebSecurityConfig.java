package com.example.demo.user;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
 public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable();
        http
                //google login
                .authorizeHttpRequests()
                .requestMatchers("/home").authenticated() //request authentication for everyone
                .anyRequest().permitAll()
                .and()
                .oauth2Login(login -> login
                        .defaultSuccessUrl("/home").permitAll())
                .logout(logout -> logout
                        .logoutSuccessUrl("/login").permitAll());
        return http.build();
    }
 }