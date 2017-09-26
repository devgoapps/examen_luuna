import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../../services/http.service';
import $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
	public users: any = [];
	public user: any = {};
	public isUpdateUser = false;
	public emailPattern: any = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;

	public userRole = sessionStorage.getItem('role');
	public userName = sessionStorage.getItem('username');

	public addresses: any = [];
	public address: any = {};
	public isUpdateAddress = false;

  	constructor(private httpService: HttpService,
  				private router: Router) { }
  	ngOnInit() {
  		this.getUsers();
  		this.getAddress();
  	}

  	getUsers(){
  		this.httpService.buildGetRequest('get/users', undefined)
  			.subscribe((data) => {
  				console.log(data);
  				this.users = data.results;
  			}, (error) => {
  				alert(error);
  			})
  	}

  	newUser(){
  		this.user = {};
  		this.isUpdateUser = false;
  		$('#form1')[0].reset();
  	}

  	setUser(user){
  		this.isUpdateUser = true;
  		this.user = user;
  	}

  	createUser(){
  		this.httpService.buildPostRequest('create/user', this.user)
  			.subscribe((data) => {
  				console.log(data);
  				this.getUsers();
  				alert(data.message);
  			}, (error) => {
  				alert(error);
  			});
  	}

  	updateUser(){
  		this.httpService.buildPostRequest('update/user', this.user)
  			.subscribe((data) => {
  				console.log(data);
  				this.getUsers();
  				alert(data.message);
  			}, (error) => {
  				alert(error);
  			});
  	}

  	deleteUser(user_id){
  		if(confirm('¿Desea eliminar el usuario?')){
  		this.httpService.buildDeleteRequest('delete/user', 'user_id', user_id)
  			.subscribe((data) => {
  				console.log(data);
  				this.newUser()
  				this.getUsers();
  				alert(data.message);
  			}, (error) => {
  				alert(error);
  			});
  		}
  	}


  	getAddress(){
  		this.httpService.buildGetRequest('get/address', undefined)
  			.subscribe((data) => {
  				console.log(data);
  				this.addresses = data.results;
  			}, (error) => {
  				alert(error);
  			})
  	}

  	newAddress(){
  		this.address = {};
  		this.isUpdateAddress = false;
  		$('#form2')[0].reset();
  	}

  	setAddress(address){
  		this.isUpdateAddress = true;
  		this.address = address;
  	}

  	createAddress(){
  		this.httpService.buildPostRequest('create/address', this.address)
  			.subscribe((data) => {
  				console.log(data);
  				this.getAddress();
  				alert(data.message);
  			}, (error) => {
  				alert(error);
  			});
  	}

  	updateAddress(){
  		this.httpService.buildPostRequest('update/address', this.address)
  			.subscribe((data) => {
  				console.log(data);
  				this.getAddress();
  				alert(data.message);
  			}, (error) => {
  				alert(error);
  			});
  	}

  	deleteAddress(address_id){
  		if(confirm('¿Desea eliminar la dirección?')){
  		this.httpService.buildDeleteRequest('delete/address', 'address_id', address_id)
  			.subscribe((data) => {
  				console.log(data);
  				this.newAddress();
  				this.getAddress();
  				alert(data.message);
  			}, (error) => {
  				alert(error);
  			});
  		}
  	}

  	logout(){
  		this.router.navigate(['login']);
  	}
}
