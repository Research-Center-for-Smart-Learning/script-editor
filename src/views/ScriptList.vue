<template>
  <v-layout row style="margin: 0 100px;">
    <v-flex xs3 v-for="script in scripts" :key="script.name" style="margin: 20px 0;">
      <script-element>
        <template v-slot:top-title>{{ script.topTitle }}</template>
        <template v-slot:title>{{ script.name }}</template>
        <template v-slot:content>{{ script.content }}</template>
      </script-element>
    </v-flex>
    <v-spacer />
  </v-layout>
</template>

<script lang="ts">
import {
  Vue, Component, Prop,
} from 'vue-property-decorator';
import ScriptElement from '@/components/ScriptElement.vue';

@Component({
  components: { ScriptElement },
})
export default class ScriptList extends Vue {
  private scripts: Array<Object> = [
    {
      topTitle: '', icon: 'shopping_car', name: 'script_1', content: 'content1',
    },
    {
      topTitle: '', icon: 'shopping_car', name: 'script_2', content: 'content2',
    },
    {
      topTitle: '', icon: 'shopping_car', name: 'script_3', content: 'content3',
    },
    {
      topTitle: '', icon: 'shopping_car', name: 'script_4', content: 'content4',
    },
    {
      topTitle: '', icon: 'shopping_car', name: 'script_5', content: 'content5',
    },
    {
      topTitle: '', icon: 'shopping_car', name: 'script_6', content: 'content6',
    },
    {
      topTitle: '', icon: 'shopping_car', name: 'script_7', content: 'content7',
    },
  ];
}
</script>
