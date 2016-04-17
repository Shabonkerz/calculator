import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
	'pocket-calculator',
	'Integration: PocketCalculatorComponent', {
		integration: true
	},
	() => {
		it('renders', function () {
			// Set any properties with this.set('myProperty', 'value');
			// Handle any actions with this.on('myAction', function(val) { ... });
			// Template block usage:
			// this.render(hbs`
			//   {{#pocket-calculator}}
			//	 template content
			//   {{/pocket-calculator}}
			// `);

			this.render(hbs `{{pocket-calculator}}`);
			expect(this.$()).to.have.length(1);
		});
	}
);
