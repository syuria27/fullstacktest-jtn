package com.syukron.test.jtn.api.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * @author Syukron R. Ardhi
 * @created 04/03/22
 */
@Slf4j
@CrossOrigin
@Controller
public class NotificationController {

    @MessageMapping("/notification")
    @SendTo("/topic/notification")
    public String notification(String message) throws Exception {
        log.info("Notification in = "+message);
        Thread.sleep(2000);
        return "Notification "+message;
    }
}
