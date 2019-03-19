<template>
	<td>
		<div class="timeline" :class="color">
			<slot></slot>
			<div class="behavior-interval"
				:title="$t('behavior.interval')"
				v-if="interval"><small>+{{interval|time}} s</small></div>

		</div>
	</td>
</template>

<script>
export default {
	name: 'behavior-timeline',
	props: [ 'interval', 'color' ],
	filters: {
		time(interval) {
			return (interval / 1000).toFixed(1);
		}
	},
}
</script>

<style lang="less">
@white: #FFF;
@table-base-color: #DDD;
@interval-color: #7394B2;

@enter-color: #8BC34A;
@click-color: #FF9800;
@check-color: #F0E04C;
@select-color: #9C27B0;
@input-color: #03A9F4;

@base: 10px;
@type-node-size: 28px;
@timeline-width: 6px;
@interval-width: 4.5em;
@interval-height: 1.2em;

.interval-arrow() {
	border-top: @interval-height / 2 solid transparent;
	border-bottom: @interval-height / 2 solid transparent;
	border-right: @interval-height / 2 solid @interval-color;
}

#user-behavior-list {
	.timeline {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 50%;
			margin-left: -@timeline-width / 2;
			width: @timeline-width;
			height: 100%;
			background-color: @table-base-color;
		}

		.behavior-type-node {
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -@type-node-size / 2;
			margin-top: -@type-node-size / 2;
			width: @type-node-size;
			height: @type-node-size;
			line-height: @type-node-size;
			border-radius: 50%;
			background-color: @interval-color;
			color: @white;
		}
		.enter-node {
			border-radius: @base / 2;
			width: @base * 8;
			margin-left: -@base * 4;
			background-color: @enter-color;
		}

		.behavior-interval {
			position: absolute;
			left: 50%;
			top: -@interval-height / 2;
			margin-left: @base;
			padding-right: @interval-width / 9;
			width: @interval-width;
			height: @interval-height;
			line-height: @interval-height;
			background-color: @interval-color;
			text-align: right;
			color: @white;

			&::before {
				content: '';
				width: 0;
				height: 0;
				position: absolute;
				right: 100%;
				.interval-arrow();
			}
		}

	}
	.timeline.enter::before {
		background-color: @enter-color;
	}
	.timeline.click {
		&::before,
		.behavior-type-node {
			background-color: @click-color;
		}
	}
	.timeline.check {
		&::before,
		.behavior-type-node {
			background-color: @check-color;
		}
	}
	.timeline.select {
		&::before,
		.behavior-type-node {
			background-color: @select-color;
		}
	}
	.timeline.input {
		&::before,
		.behavior-type-node {
			background-color: @input-color;
		}
	}
}
</style>
