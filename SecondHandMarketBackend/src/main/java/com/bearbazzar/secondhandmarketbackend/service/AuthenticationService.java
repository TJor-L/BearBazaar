package com.bearbazzar.secondhandmarketbackend.service;

import com.bearbazzar.secondhandmarketbackend.exception.UserNotExistException;
import com.bearbazzar.secondhandmarketbackend.model.Token;
import com.bearbazzar.secondhandmarketbackend.model.User;
import com.bearbazzar.secondhandmarketbackend.repository.UserRepository;
import com.bearbazzar.secondhandmarketbackend.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;
    public AuthenticationService(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }


    public Token authenticate(User user) throws UserNotExistException {
        Authentication auth = null;
        //UserRepository.findByUsername(user.getUsername());
        try {
            auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        } catch (AuthenticationException exception) {
            throw new UserNotExistException("Username or password incorrect");
        }

        if (auth == null || !auth.isAuthenticated()) {
            throw new UserNotExistException("Username or password incorrect");
        }

        return new Token(jwtUtil.generateToken(user.getUsername()));
    }
}

