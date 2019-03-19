<template>
	<td class="behavior-time">
		<p>{{time|date}}</p>
        <p>{{time|time}}</p>
	</td>
</template>

<script>
import dateFormat from 'dateformat';

export default {
	name: 'behavior-datetime',
	props: [ 'time' ],
	filters: {
		date(timestamp) {
			return dateFormat(timestamp, 'mm/dd/yyyy');
		},
		time(timestamp) {
			return dateFormat(timestamp, 'HH:MM:ss');
		},
	},
}
</script>

<style lang="less">
#user-behavior-list {
	.behavior-time p {
		margin: 0;
	}
}
</style>
