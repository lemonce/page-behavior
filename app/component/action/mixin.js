'use strict';

import Timeline from './utils/Timeline.vue';
import Datetime from './utils/Datetime.vue';
import { openWindow } from './open';

export default {
	props: [ 'behavior', 'session' ],
	data() {
		return {
			isDetailShow: false,
			isSnapshotOpened: false 
		}
	},
	components: {
		Timeline,
		Datetime
	},
	methods: {
		openSnapshot() {
			const url = `/api/session/${this.session}/snapshot/${this.behavior.time}/root`;

			openWindow(url, {
				path: this.behavior.data.path
			});
		}
	},
	computed: {
		text() {
			return (data) => {
				const elementName = data.element.localName;
				const elementType = data.element.type;

				if (elementName === 'div' ||
				elementName === 'span') {
					return '空白区域';
				}
				
				if (elementName === 'input') {
					return this.$t(`input.type.${elementType}`);
				}
				
				return this.$t(`element.${elementName}`);
			}
		}
	}
}