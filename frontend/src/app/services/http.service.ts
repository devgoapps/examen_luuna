import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
	private urlServices = 'http://localhost:3001/api/';

	constructor(private http: Http) { }

	buildGetRequest(uri, values){
		let headers = new Headers();
		let params = new URLSearchParams(values);

		let options = new RequestOptions({ headers: headers, search: params });
		
		return this.http.get(this.urlServices + uri, options)
			.map((data) => {
  				return data.json();
  			})
  			.catch(this.handlerErrors);
	}

	buildPostRequest(uri, data) {
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers });
		
		return this.http.post(this.urlServices + uri, data, options)
			.map((data) => {
				return data.json();
			})
			.catch(this.handlerErrors);
	}

	buildDeleteRequest(uri, tag, value){
		let headers = new Headers();
		let params = new URLSearchParams();
		params.append(tag, value);
		let options = new RequestOptions({ headers: headers, search: params });
		
		return this.http.delete(this.urlServices + uri, options)
			.map((data) => {
  				return data.json();
  			})
  			.catch(this.handlerErrors);
	}

	handlerErrors(error){
		let err = error.json();
		console.error(err.error);
  		return Observable.throw(err.error);
	}
}
