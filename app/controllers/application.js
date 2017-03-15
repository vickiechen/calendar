import Ember from 'ember';

export default Ember.Controller.extend({
	accessToFullCalendar: null,
	isShowingModal: false,
	selectedevent:{},
	events: [
		{title: "My Default Event", start: Date.now(), name: "Vickie Chen", phone: "470-285-5688", backgroundColor:'red'}
	],
	actions: {
		prev: function() {
		  this.get('accessToFullCalendar').send('prev');
		},
		eventClick(event, jsEvent, view){
			Ember.Logger.log('${event.title} was clicked!');
			this.set('selectedevent', {event:event});
			this.toggleProperty('isShowingModal');					
		},
		dayClick(event, jsEvent, view){ 
			let selectedEvent = {
				start: moment(event).format('MMM Do h:mm A'),
				end: moment(event).add(30,'m').format('MMM Do h:mm A'),
			};	
			
			this.set('selectedevent', selectedEvent);
			this.toggleProperty('isShowingModal');			
		}
	}
});
