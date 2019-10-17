package com.meetictac.meetictac;

import java.util.ArrayList;
import java.util.List;

public class UserMapper {
    public static List<UserModel> map(List<UserDTO> weaponDTOList) {
        List<UserModel> weaponList = new ArrayList<>();
        for (UserDTO weaponDTO : weaponDTOList) {
            //weaponList.add(map(weaponDTO));
        }
        return weaponList;
    }
/*
    private static UserModel map(UserDTO weaponDTO) {
        UserModel weapon = new UserModel();
        weapon.setFirstname(weaponDTO.getFirstname());
        weapon.setLastname(weaponDTO.getLastname());
        weapon.setEmail(weaponDTO.getEmail());
        weapon.setPassword(weaponDTO.getPassword());
        return weapon;
    }
 */
}
