<template>
	<div>
		<div class="row">
			<div class="col-sm-4">
				<div class="input-group" id="session-choice">
					<div class="input-group-btn">
						<button type="button"
							:title="$t('session.delete')"
							:disabled="!session"
							class="btn btn-danger"
							@click="deleteSession(session)"><span
								class="glyphicon glyphicon-trash"></span></button>
					</div>

					<input type="text"
						readonly
						class="form-control"
						:placeholder="$t('session.select')"
						v-model="session">
					<div class="input-group-btn">
						<button type="button"
							:title="$t('session.select')"
							class="btn btn-default dropdown-toggle"
							@click="isSessionPoolShow = !isSessionPoolShow"
							><span class="caret"></span></button>
						<ul class="dropdown-menu dropdown-menu-right"
							v-if="isSessionPoolShow">
							<li v-for="(session, code) in sessionPool"
								:key="code">
								<a @click="chooseSession(code)">{{code}}</a>
							</li>
						</ul>
					</div>
				</div>

			</div>

			<div class="col-sm-8">
				<button class="btn btn-danger pull-right"
					:title="$t('session.remove')"
					@click="deleteAllSession()">{{$t('session.remove')}}</button>
				<button type="button"
					class="btn btn-primary"
					:title="$t('session.generalCode')"
					@click="isLogShow = !isLogShow"><span
						class="glyphicon glyphicon-console"></span>&nbsp;Generate LC2</button>
                <!-- test case -->
				<input type="checkbox" name="" id="abcd">
				<select name="" id="erew">
					<option value="1">a</option>
					<option value="2">b</option>
					<option value="3">c</option>
				</select>
				<input type="password" placeholder="test">

			</div>

		</div>
		
		<hr>

		<div class="jumbotron" v-if="!isUserShow">
			<p>{{$t('session.noData')}}</p>
		</div>

		<metric-panel v-if="isLogShow" title="Generate LC2">
			<pre></pre>
		</metric-panel>

		<div class="row">
			<div class="col-lg-4 pull-right col-xs-12">

				<metric-panel
					:title="$t('session.info')"
					style="height: auto;"
					v-if="isUserShow">
					<table class="table" id="user-info-list">
						<tbody>
							<tr>
								<th>{{$t('info.ip')}}</th>
								<td>{{userInfo.ip}}</td>
							</tr>
							<tr>
								<th>{{$t('info.terminal')}}</th>
								<td>Web</td>
							</tr>
							<tr>
								<th style="width: 8em"><abbr
									title="Last Vist Time"
									class="initalism">{{$t('info.lastVisitTime')}}</abbr></th>
								<td>{{userInfo.lastVisitTime|date}}
									{{userInfo.lastVisitTime|time}}</td>
							</tr>
							<tr>
								<th>{{$t('info.session')}}</th>
								<td>{{userInfo.code}}</td>
							</tr>
							<tr>
								<th>{{$t('info.ua')}}</th>
								<td>{{userInfo.ua}}</td>
							</tr>
						</tbody>
					</table>
				</metric-panel>

			</div>

			<div class="col-lg-8 pull-left col-xs-12">

				<metric-panel
					:title="$t('session.behavior')"
					style="height:auto"
					v-if="isUserShow">
					<table class="table table-hover" id="user-behavior-list">
						<thead>
							<tr>
								<th style="width: 7em">{{$t('behavior.time')}}</th>
								<th style="width: 120px">{{$t('behavior.line')}}</th>
								<th style="">{{$t('behavior.action')}}</th>
							</tr>
						</thead>
						<tbody>
							<component v-for="(action, index) in behaviorList"
								:key="index"
								:is="behavior[action.type]"
								:session="session"
								:behavior="action">
							</component>
						</tbody>
					</table>

				</metric-panel>
			</div>

		</div>
		
	</div>
</template>

<script>
import axios from 'axios';
import dateFormat from 'dateformat';

import Enter from './action/Enter.vue';
import Click from './action/Click.vue';
import Input from './action/Input.vue';
import Check from './action/Check.vue';
import Select from './action/Select.vue';

const sessionURL = 'api/page/behavior/userFlag/';

function ActionDataFactory(raw) {
	const data = [];
	
	raw.forEach((action, index) => {
		if (index > 0) {
			action.interval = action.time - raw[index - 1].time;
		}

		action.label = 'action.type.' + action.type;
		
		data.push(action);
	});
	
	return data;
}

export default {
	name: "behavior-demo",
 	data() {

		return {
			isSessionPoolShow: false,
			isLogShow: false,

			session: null,
			userInfo: {},
			sessionPool: {},
			behaviorList: [],

			behavior: {
				enter: Enter,
				click: Click,
				rightClick: Click,
				doubleClick: Click,
				input: Input,
				check: Check,
				uncheck: Check,
				select: Select
			},
		};
	},
	computed: {
		isUserShow() {
			return this.session;
		}
	},
	
	methods: {
		getSessionPool() {
			return axios.get(sessionURL).then(data => {
				this.sessionPool = data.data;
			});
		},
		getUserInfo(session) {
			return axios.get(sessionURL + session).then(data => {
				this.userInfo = data.data;
			})
		},
		
		getAction(session) {
			if (session === null) {
				return;
			}

			return axios.get(sessionURL + session + '/action').then(data => {
				this.behaviorList = ActionDataFactory(data.data);
			})
		},
		chooseSession(code) {
			this.isSessionPoolShow = false;
			this.session = code;

			this.getUserInfo(code);
			this.getAction(code);
		},
		deleteSession(code) {
			return axios.delete(sessionURL + code).then(data => {
				this.getSessionPool();
				this.session = null;
			})
		},
		deleteAllSession() {
			return axios.delete(sessionURL).then(data => {
				this.getSessionPool();
				this.session = null;

				this.getUserInfo();
				this.getAction();
			})
		},
		showLog() {
			this.isLogShow = !this.isLogShow;
		},
	},
	mounted() {
		this.getSessionPool();
	},
	filters: {
		date(timestamp) {
			return dateFormat(timestamp, 'mm/dd/yyyy');
		},
		time(timestamp) {
			return dateFormat(timestamp, 'HH:MM:ss');
		},
	},
	
};
</script>

<style lang="less">
@table-base-color: #DDD;
@base: 10px;

#session-choice {
	.dropdown-menu {
	  display: block;
	}
}

#user-behavior-list {
	th,
	td {
		text-align: center;
		vertical-align: middle;
		border-top-style: dashed;
		position: relative;
	}
	td:nth-child(3) {
		padding-top: @base * 2;
		padding-left: @base * 2;
		text-align: left;
		word-break: break-all;
	}
	
	.behavior-summary-block {
		position: relative;

		.panel-heading > div {
			white-space: nowrap;
			position: absolute;
			width: 80%;

			.behavior-summary {
				position: absolute;
				top: 0;
				left: @base * 3;
				width: 100%;
				padding-left: @base * 3.2;
				padding-right: @base * 2;
			}
			input {
				background-color: transparent;
				border: none;
				border-bottom: 1px solid @table-base-color;
				width: 100%;
				&:focus {
					outline: none;
				}
			}
		}

		.well {
			margin-bottom: 0;
		}
	}
}

#user-info-list td {
	word-break: break-all;
}
</style>