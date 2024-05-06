package com.rezero.rotto.repository;

import com.rezero.rotto.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByPhoneNumAndPassword(String phoneNum, String password);

    Optional<User> findByPhoneNum(String phoneNum);

    User findByUserCode(int userCode);

    Boolean existsByPhoneNum(String phoneNum);

}