import Ember from 'ember';

export default Ember.Component.extend({
	name: '',
	phone: '',	
	validfields: 0, 
	inputError: Ember.computed('name', 'phone', function() {
		if(this.get('name') ==='' || this.get('phone') === ''){
			this.set('validfields', 0);
			return 'Name and Phone Number can not be empty!';
		}else{
			if(this.isValidPhoneNumer(this.get('phone'))){
				this.set('validfields', 1);
				return '';
			}else{
				this.set('validfields', 0);
				return 'Invalid Phone Number!';
			}
		}
	}),	
	didReceiveAttrs: function() { 
	 	this._super(...arguments);	
		let event = this.get('event');
		
		if(event !== undefined){
			this.set('start', event.start);
			this.set('end', event.end);
			this.set('name', (event.name!==undefined?event.name:'') );
			this.set('phone', (event.phone!==undefined?event.phone:''));	
		}
	},	
	isValidPhoneNumer: function (inputext){
		/***
			To valid a phone number like 
			XXX-XXX-XXXX
			XXX.XXX.XXXX
			XXX XXX XXXX 
		***/
		
		let phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
	    if(inputext.match(phonePattern)) {
			return true;  
		}  
		else {
			return false;
		}  
	},
	actions:{
		saveEvent: function (){  	
			let event = this.get('event');
			let saveEvent = {
				name: this.get('name'),
				phone: this.get('phone'),
				start: event.start,
				end: event.end
			};		
			this.router.send("saveEvent", saveEvent );
			this.router.send("closeDialog");		
		},
		closeDialog: function (){  
			this.router.send("closeDialog");			
		},
		cancel: function (){
			this.router.send("closeDialog");		
		},
		clearEnter: function (){
			this.set('name','');			
			this.set('phone','');
		}		
	}
});
