package com.meetictac.meetictac;

import java.util.ArrayList;
import java.util.List;

public class MatchMapper {

    public static List<UserModel> map(List<MatchDTO> weaponDTOList) {
        List<UserModel> weaponList = new ArrayList<>();
        for (MatchDTO weaponDTO : weaponDTOList) {
            //weaponList.add(map(weaponDTO));
        }
        return weaponList;
    }
}
