import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public credenciales: any = {};

  	constructor(private httpService: HttpService,
  				private router: Router) { }

  	ngOnInit() { }

  	login(){
  		console.log(this.credenciales);
  		this.httpService.buildPostRequest('login', this.credenciales)
  			.subscribe((data) => {
  				console.log(data);
  				if(data.results.length > 0){
  					console.log(data.results[0].role);
  					sessionStorage.setItem('username', data.results[0].nickname);
  					sessionStorage.setItem('role', data.results[0].role);
  					this.router.navigate(['home']);
  				}
  			},(error) => {
  				alert(error);
  			});
  	}
}
