<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.text" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="mt-4 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
        <v-list>
          <v-list-item v-for="item in items2" :key="item.text" link>
            <v-list-item-avatar>
              <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt="">
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text" />
          </v-list-item>
        </v-list>
        <v-list-item class="mt-4" link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Browse Channels</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">
            Manage Subscriptions
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="red" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Research Center for Smart Learning</span>
      </v-toolbar-title>
      <v-spacer />
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        />
        <v-tooltip bottom v-for="item in nav_items" :key="item.text">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>{{ item.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ item.text }}</span>
        </v-tooltip>
        <v-menu offset-y>
          <template v-slot:activator="{ on: menu }">
            <v-tooltip bottom :z-index="1">
              <template v-slot:activator="{ on: tooltip }">
                <v-btn icon v-on="{ ...tooltip, ...menu }">
                  <v-icon>person</v-icon>
                </v-btn>
              </template>
              <span>個人資訊</span>
            </v-tooltip>
          </template>
          <v-list>
            <v-list-item v-for="item in user_dropdown.items" :key="item.text">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <BlocklyComponent ref="foo"></BlocklyComponent>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import BlocklyJS from 'blockly/javascript';
import BlocklyComponent from './components/BlocklyComponent.vue';
import './prompt';
import './blocks';


export default {
  name: 'app',
  components: { BlocklyComponent },
  props: { source: String },
  data: () => ({
    drawer: null,
    items: [
      { icon: 'subscriptions', text: '腳本集' },
      { icon: 'chrome_reader_mode', text: '腳本編輯' },
      { icon: 'device_hub', text: '我的設備' },
      { icon: 'featured_play_list', text: '使用手冊' },
      { icon: 'language', text: '語言' },
      { icon: 'info', text: '系統資訊' },
    ],
    nav_items: [
      { icon: 'subscriptions', text: '腳本集' },
      { icon: 'chrome_reader_mode', text: '腳本編輯' },
    ],
    user_dropdown: {
      menu_icon: 'person',
      items: [
        { icon: 'person', text: '個人資訊' },
        { icon: 'recent_actors', text: '我的腳本' },
        { icon: 'exit_to_app', text: '登入' },
      ],
    },
    items2: [
      { picture: 28, text: 'Joseph' },
      { picture: 38, text: 'Apple' },
      { picture: 48, text: 'Xbox Ahoy' },
      { picture: 58, text: 'Nokia' },
      { picture: 78, text: 'MKBHD' },
    ],
    code: '',
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    showCode() {
      this.code = BlocklyJS.workspaceToCode(this.$refs.foo.workspace);
    },
  },
};
</script>

<style lang="css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html, body {
  margin: 0;
}

</style>
