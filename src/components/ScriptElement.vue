<template>
  <v-hover v-slot:default="{ hover }" style="border-radius: 20px;">
    <v-card class="mx-auto" color="grey lighten-4" max-width="400">
    <v-img :aspect-ratio="16/9" :src="imageURL()">
        <v-expand-transition>
        <!-- eslint-disable max-len -->
        <div
            v-if="hover" style="height: 100%;"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
        >
        <!-- eslint-enable max-len -->
            <slot name="hover-content">{{ 'hover-content' }}</slot>
        </div>
        </v-expand-transition>
    </v-img>
    <v-card-text class="pt-6" style="position: relative;">
        <v-btn absolute color="orange" class="white--text" fab large right top>
        <v-icon><slot name="button">{{ 'icon' }}</slot></v-icon>
        </v-btn>
        <div class="font-weight-light grey--text title mb-2">
        <slot name="top-title">{{ 'top-title' }}</slot>
        </div>
        <h3 class="display-1 font-weight-light orange--text mb-2">
        <slot name="title">{{ 'title' }}</slot>
        </h3>
        <div class="font-weight-light grey--text title mb-2">
        <slot name="content">{{ 'content' }}</slot>
        </div>
    </v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import {
  Vue, Component, Prop,
} from 'vue-property-decorator';

@Component
export default class ScriptElement extends Vue {
  @Prop({
    type: String,
    default: 'https://cdn.vuetifyjs.com/images/cards/kitchen.png',
  }) image!: string;

  imageURL(): string {
    return this.image;
  }
}
</script>

<style scoped>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }
</style>
