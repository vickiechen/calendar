import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
	isShowingModal: false,
	selectedevent:{},
	events: [],
	eventID: 1, 
	actions: {
		
		//pop modal to edit the selected event
		eventClick(event){			
			this.set('selectedevent', event );
			this.toggleProperty('isShowingModal');					
		},
		
		//pop modal to add a new event
		dayClick(event){ 
			let minutes = moment(event).minute();
			let start = '';
			let end = '';
			
			if(minutes >0){ //round down to hour
				start = moment(event).subtract(minutes, 'm').format();
				end = moment(start).add(1,'h').format();
			}else{
				start = moment(event).format();
				end = moment(event).add(1,'h').format();
			}
			
			let eventID = this.get('eventID');
			let selectedEvent = {
				id: eventID,
				start: start,
				end: end
			};	
			
			this.set('selectedevent', selectedEvent);
			this.toggleProperty('isShowingModal');			
		},
		
		//close event dialog
		closeDialog(){ 
			this.toggleProperty('isShowingModal');
		},
		
		 //save event into events objectArray
		saveEvent(event){
			let events = this.get('events');
			let found = events.some(function (el) {
				return el.id === event.id;
			});
					
			if(!found){ //add a new event
				events.push(event);
				this.set('eventID', (this.get('eventID') +1) );
			}else{  //update the selected event 
				events.forEach(function(e, index, events){ 
					if(e.id === event.id){ 
						events[index] = event;		
					}
				});			
			}	
			
			//set events and call reRenderEvents to re-render events into the calendar
			this.set('events', events);	
			this.reRenderEvents();
		},
		
		 //remove event from events objectArray
		removeEvent(eventID){
			let events = this.get('events');
			if(eventID !==''){ 				
				events.forEach(function(e, index, events){  
					if(e.id === eventID){ 
						events.splice(index,1);
						return false;
					}
				});		
			}
			
			//set events and call reRenderEvents to re-render events into the calendar
			this.set('events', events);	
			this.reRenderEvents();
		}		
	},
	reRenderEvents (){
		this.$('.full-calendar').fullCalendar('removeEvents');
		this.$('.full-calendar').fullCalendar('addEventSource', this.get('events') );
		this.$('.full-calendar').fullCalendar('rerenderEvents');
	}
});
