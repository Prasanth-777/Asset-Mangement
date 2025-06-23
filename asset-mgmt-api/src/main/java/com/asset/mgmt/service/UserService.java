package com.asset.mgmt.service;

import com.asset.mgmt.entity.Users;

public interface UserService {
	
	Users getUserByEmail(String email);

	boolean updateUser(Users user);
}
