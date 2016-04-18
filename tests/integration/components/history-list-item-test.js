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
	'history-list-item',
	'Integration: HistoryListItemComponent', {
		integration: true
	},
	() => {
		it('renders', function () {
			// Set any properties with this.set('myProperty', 'value');
			// Handle any actions with this.on('myAction', function(val) { ... });
			// Template block usage:
			// this.render(hbs`
			//   {{#history-list-item}}
			//	 template content
			//   {{/history-list-item}}
			// `);

			this.render(hbs `{{history-list-item}}`);
			expect(this.$()).to.have.length(1);
		});
	}
);
