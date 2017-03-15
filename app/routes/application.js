import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return {
		  events: [{
			title: "Vickie", start: Date.now(), name: "Vickie Chen", phone: "470-285-5688",  backgroundColor:'red'
		  }]
		};
		//console.log(this.get('events'));
	},
	actions:{
		closeDialog(){ //close event dialog
			this.controller.set('isShowingModal', 0);
		},
		saveEvent(event){ //save event into events
			console.log(event);
		}
	}
});
