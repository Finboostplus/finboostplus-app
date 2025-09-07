package com.finboostplus.DTO;


import com.finboostplus.model.Group;
import com.finboostplus.model.User;

import java.util.Optional;

public record SwitchAuthorityRequestDTO(String setAuthority, String authority) {

    /*
    *
     groupControler
        @PostMapping("/{groupId}/members/{newAuthId}/transfer-ownership")
    public ResponseEntity<Object>switchAuthority( @PathVariable Long groupId,
                                                 @PathVariable Long newAuthId,
                                                 @RequestBody SwitchAuthorityRequestDTO authDTO
                                                ){

          String setAuthority = authDTO.setAuthority();
          String authority = authDTO.authority();
        if(userService.switchAuthority(newAuthId,groupId,authDTO)){

            return ResponseEntity.ok("Posse transferida com sucesso");
        }

            return ResponseEntity.badRequest().body("Não foi possivel realiazar a transferência");
    }



    *  public boolean switchAuthority(Long newOwnerId , Long groupId , SwitchAuthorityRequestDTO authDTO  ){
        List<String> authLevels = List.of("OWNER","ADMIN","USER");
       /*UPPERCASE E VERIFICAR SE A STRING ESTA CORRETA*

    String userName = authenticated();
    User user = getUser(userName);

    Optional<User> newUseAuthorityOp = userRepository.findById(newOwnerId);
    User newUseAuthority = newUseAuthorityOp.get();

    Group group = groupService.getGroup(groupId);

        if((group != null) &&
            (userRepository.isUserAndGroupAndAuthorityValidToUpdateGroup(user.getId(), group.getId()) > 0) &&
            (groupMemberService.isUserMemberOfGroup(newUseAuthority.getId(),group.getId()) > 0))
            if(groupMemberService.switchAuthGroup(newUseAuthority,group,authLevels.indexOf(authDTO.setAuthority()))  &&
            groupMemberService.switchAuthGroup(user,group,authLevels.indexOf(authDTO.authority()))){

        return true;
    }


        return false;
}
    *
    *
    * */
}
