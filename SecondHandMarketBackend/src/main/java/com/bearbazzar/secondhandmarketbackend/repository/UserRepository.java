package com.bearbazzar.secondhandmarketbackend.repository;

import com.bearbazzar.secondhandmarketbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

}
