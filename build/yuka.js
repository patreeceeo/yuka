(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.YUKA = global.YUKA || {})));
}(this, (function (exports) { 'use strict';

class EntityManager {

	constructor () {

		this.entities = [];

	}

	add ( entity ) {

		this.entities.push( entity );

		return this;

	}

	remove ( entity ) {

		const index = this.entities.indexOf( entity );

		this.entities.splice( index, 1 );

		return this;

	}

	update ( delta ) {

		for ( let entity of this.entities ) {

			entity.update( delta );

		}

		return this;

	}

}

class GameEntity {

	constructor () {

		this.id = GameEntity.__nextId ++;

	}

	update () {

	}

}

GameEntity.__nextId = 0;

class State {

	enter () {

		console.warn( 'YUKA.State: .enter() must be implemented in derived class.' );

	}

	execute () {

		console.warn( 'YUKA.State: .execute() must be implemented in derived class.' );

	}

	exit () {

		console.warn( 'YUKA.State: .exit() must be implemented in derived class.' );

	}

}

class StateMachine {

	constructor ( owner ) {

		this.owner = owner; // a reference to the agent that owns this instance
		this.currentState = null; // the current state of the agent
		this.previousState = null; // a reference to the last state the agent was in
		this.globalState = null; // this state logic is called every time the FSM is updated

	}

	update () {

		if ( this.globalState !== null ) {

			this.globalState.execute( this.owner );

		}

		if ( this.currentState !== null ) {

			this.currentState.execute( this.owner );

		}

	}

	changeState ( newState ) {

		this.previousState = this.currentState;

		this.currentState.exit( this.owner );

		this.currentState = newState;

		this.currentState.enter( this.owner );

	}

	revertToPrevoiusState () {

		this.changeState( this.previousState );

	}

	inState ( state ) {

		return ( state === this.currentState );

	}

}

exports.EntityManager = EntityManager;
exports.GameEntity = GameEntity;
exports.State = State;
exports.StateMachine = StateMachine;

Object.defineProperty(exports, '__esModule', { value: true });

})));
