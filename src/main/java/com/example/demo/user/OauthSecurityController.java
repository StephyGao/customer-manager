// package com.example.demo.user;


// import java.util.HashMap;
// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.core.ResolvableType;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.oauth2.client.registration.ClientRegistration;
// import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
// import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// @RestController
// @RequestMapping(path = "/")

// public class OauthSecurityController {
    // private static String authorizationRequestBaseUri = "oauth2/authorization";
    // Map<String, String> oauth2AuthenticationUrls = new HashMap<>();
    
    // @Autowired
    // private ClientRegistrationRepository clientRegistrationRepository;

    // @GetMapping(value="/auth_login")
    // public String getLoginPage(Model model) {
    //         Iterable<ClientRegistration> clientRegistrations = null;
    //         ResolvableType type = ResolvableType.forInstance(clientRegistrationRepository)
    //           .as(Iterable.class);
    //         if (type != ResolvableType.NONE && 
    //           ClientRegistration.class.isAssignableFrom(type.resolveGenerics()[0])) {
    //             clientRegistrations = (Iterable<ClientRegistration>) clientRegistrationRepository;
    //         }
        
    //         clientRegistrations.forEach(registration -> 
    //           oauth2AuthenticationUrls.put(registration.getClientName(), 
    //           authorizationRequestBaseUri + "/" + registration.getRegistrationId()));
    //         model.addAttribute("urls", oauth2AuthenticationUrls);

    //     return "/auth_login";
    // }
    // @GetMapping(value="/auth_logout")
    // public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     if(authentication!=null) {
    //         new SecurityContextLogoutHandler().logout(request,response,authentication);
    //     }
    //     return "redirect:/";
    // }
// }