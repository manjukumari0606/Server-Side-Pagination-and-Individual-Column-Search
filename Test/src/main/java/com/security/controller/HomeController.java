package com.security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@Controller
public class HomeController {
		
		@GetMapping("/get")
		public String goHome(){
			return "index";
		}
		
		@GetMapping("/msg")
		public String msg() {
			return "Hello welcome to my page";
		}

	}