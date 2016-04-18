import Ember from 'ember';
import Calculator from '../lib/Calculator';

const MAX_DISPLAY_WIDTH = 8;
const DEFAULT_DISPLAY_FONT_SIZE = 2;
const DOWN_SCALE_COEFFICIENT = 0.095;

export default Ember.Component.extend(Ember.Evented, {

	// Ember component specific properties for css/html.
	tagName: 'div',
	classNames: 'calculator',
	attributeBindings: [ 'tabindex' ],
	tabindex: 0,

	display: '0',
	calculator: new Calculator(),
	history: null,

	keyPress (e) {
		this.trigger('keypress:' + e.charCode, e);
	},

	didInsertElement () {
		this.get('calculator.display')
			.on('change', (value) => {
				this.set('display', value);
			});
	},

	init () {
		this.set('calculator.history', Ember.A(this.get('calculator.history')));

		// HACK: Find a way to not use monkeypatching.
		this.get('calculator.history').push = this.get('calculator.history').pushObject;

		const binding = Ember.Binding.from('calculator.history').to('history');

		binding.connect(this);
		this._super();
	},

	onDisplayValueChange: function () {
		const count = this.get('display').length;

		if (count > MAX_DISPLAY_WIDTH) {
			const newFontSize = DEFAULT_DISPLAY_FONT_SIZE - ((count - MAX_DISPLAY_WIDTH) * DOWN_SCALE_COEFFICIENT);

			Ember.$(this.get('element'))
				.find('.display')
				.css('font-size', newFontSize + 'em');
		}
		else {

			// Reset.
			Ember.$(this.get('element'))
				.find('.display')
				.css('font-size', DEFAULT_DISPLAY_FONT_SIZE + 'em');
		}

	}.observes('display'),


	actions: {
		backspace () {
			this.get('calculator.display').backspace();
		},
		transform (op) {
			this.get('calculator.display').transform(op);
		},

		clear () {
			this.get('calculator').clear();
		},

		evaluate () {
			this.get('calculator').evaluate();
		},

		append (char) {
			this.get('calculator.display').append(char);
		}
	}
});
