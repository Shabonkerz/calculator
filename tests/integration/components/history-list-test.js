/* jshint expr:true */
import {
	expect
} from 'chai';
import {
	describeComponent,
	it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
	'history-list',
	'Integration: HistoryListComponent', {
		integration: true
	},
	() => {
		it('renders', function () {
			// Set any properties with this.set('myProperty', 'value');
			// Handle any actions with this.on('myAction', function(val) { ... });
			// Template block usage:
			// this.render(hbs`
			//   {{#history-list}}
			//	 template content
			//   {{/history-list}}
			// `);

			this.render(hbs `{{history-list}}`);
			expect(this.$()).to.have.length(1);
		});
	}
);
