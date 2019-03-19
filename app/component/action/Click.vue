<template>
<tr @dblclick="openSnapshot()">
	<datetime :time="behavior.time"></datetime>

	<timeline :interval="behavior.interval" :color="'click'">
		<div class="behavior-type-node"
			:title="$t(behavior.label)">
			<span class="glyphicon"
				:class="isSnapshotOpened? 'glyphicon-new-window' : 'glyphicon-record'"></span>
		</div>
	</timeline>

	<td>
		<div class="panel panel-default behavior-summary-block">
			<div class="panel-heading clearfix">
				<div>
					<span>{{$t(behavior.label)}}</span>
					<div class="behavior-summary">
						<input type="text"
							v-model="behavior.data.text"
							:placeholder="text(behavior.data)">
					</div>
				</div>
				<a class="pull-right"
					@click="isDetailShow = !isDetailShow"><span class="glyphicon glyphicon-menu-down"
						:class="{'glyphicon-menu-up': isDetailShow}"></span></a>
			</div>

			<ul class="list-group" v-if="isDetailShow">
				<li class="list-group-item">
					<strong>{{$t('action.element')}}: </strong><code>{{behavior.data.abstract}}</code>
				</li>
				<li class="list-group-item">
					<strong>{{$t('action.path')}}: </strong><div class="well well-small">{{behavior.data.path}}</div>
				</li>
				<li class="list-group-item">
					<strong>{{$t('action.text')}}: </strong>{{behavior.data.text}}
				</li>
			</ul>

		</div>
		
	</td>
</tr>


</template>

<script>
import mixin from './mixin.js';

export default {
	name: 'action-click',
	mixins: [mixin],
}
</script>
