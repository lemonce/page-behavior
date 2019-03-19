<template>
<tr @dblclick="openSnapshot()">

	<datetime :time="behavior.time"></datetime>

	<timeline :interval="behavior.interval" :color="'enter'">
		<div class="behavior-type-node enter-node"
			:title="$t(behavior.label)">
			<span class="glyphicon glyphicon-log-in"></span>
			<span>Enter</span>
		</div>
	</timeline>

	<td >
		<div class="panel panel-default behavior-summary-block">
			<div class="panel-heading clearfix">
				<div>
					<span>{{$t(behavior.label)}}</span>
					<div class="behavior-summary">
						<input type="text" v-model="behavior.data.href" readonly>
					</div>
				</div>
				<a class="pull-right"
					@click="isDetailShow = !isDetailShow"><span class="glyphicon glyphicon-menu-down"
						:class="{'glyphicon-menu-up': isDetailShow}"></span></a>
			</div>

			<ul class="list-group" v-if="isDetailShow">
				<li class="list-group-item">
					<strong>{{$t('action.href')}}: </strong><a
						:href="behavior.href"
						target="_blank">{{behavior.data.href}}</a>
				</li>
				<li class="list-group-item">
					<strong>{{$t('action.referrer')}}: </strong>{{behavior.data.referrer}}
				</li>
				<li class="list-group-item">
					<strong>{{$t('action.title')}}: </strong>{{behavior.data.title}}
				</li>

			</ul>
		</div>

	</td>
</tr>
</template>

<script>
import mixin from './mixin.js';

export default {
	name: 'action-enter',
	mixins: [mixin],
}
</script>

