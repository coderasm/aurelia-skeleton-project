import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {UserState} from './vmstate/UserState';
import {computedFrom} from 'aurelia-framework';
import {ObserverLocator} from 'aurelia-binding';
import 'fetch';

@inject(HttpClient, UserState, ObserverLocator)
export class Users {
  heading = 'Github Users';
  checked = false;

  constructor(http, userState, observerLocator) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });
	this.state = userState;
	this.observerLocator = observerLocator;
    this.http = http;
	this.watchChecked();
  }
  
  watchChecked() {
	  this.observerLocator
                .getObserver(this.state, "checked")
                .subscribe(this.onChange);
	}

    onChange(newValue, oldValue) {
		var newValuePredicate = newValue === false || newValue === true;
		var oldValuePredicate = oldValue === false || oldValue === true;
		console.log("newValuePredicate: " + newValuePredicate + " oldValuePredicate: " + oldValuePredicate);
    }
	
    get showChecked()
    {
        return this.state.checked;
    }
	
	@computedFrom("checked")
    get showCheckedOnVM()
    {
        return this.checked;
    }

  activate() {
    return this.http.fetch('users')
      .then(response => response.json())
      .then(users => this.state.users = users);
  }
}
