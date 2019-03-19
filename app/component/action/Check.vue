<template>
<tr @dblclick="openSnapshot()">
    <datetime :time="behavior.time"></datetime>

    <timeline :interval="behavior.interval" :color="'check'">
        <div class="behavior-type-node"
            :title="$t(behavior.label)">
            <span class="glyphicon"
                :class="behavior.type === 'check'?'glyphicon-check':'glyphicon-unchecked'"></span>
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
                    @click="isDetailShow = !isDetailShow"><span class="glyphicon"
                        :class="isDetailShow?'glyphicon-menu-up':'glyphicon-menu-down'"></span></a>
            </div>

            <ul class="list-group" v-if="isDetailShow">
                <li class="list-group-item">
                    <strong>{{$t('action.element')}}: </strong><code>{{behavior.data.abstract}}</code>
                </li>
                <li class="list-group-item">
                    <strong>{{$t('action.path')}}: </strong>{{behavior.data.path}}
                </li>
            </ul>
        </div>

    </td>

</tr>
</template>

<script>
import mixin from './mixin.js';

export default {
    name: 'action-check',
    mixins: [mixin]
}
</script>
