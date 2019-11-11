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
        <BlocklyComponent id="blockly2" :options="options" ref="foo"></BlocklyComponent>
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
    // person, recent_actors, exit_to_app
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
    options: {
      grid: {
        spacing: 25,
        length: 3,
        colour: '#ccc',
        snap: true,
      },
      toolbox:
      `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
        <category name="Logic" colour="%{BKY_LOGIC_HUE}">
          <block type="controls_if"></block>
          <block type="logic_compare"></block>
          <block type="logic_operation"></block>
          <block type="logic_negate"></block>
          <block type="logic_boolean"></block>
          <block type="logic_null"></block>
          <block type="logic_ternary"></block>
        </category>
        <category name="Loops" colour="%{BKY_LOOPS_HUE}">
          <block type="controls_repeat_ext">
            <value name="TIMES">
              <shadow type="math_number">
                <field name="NUM">10</field>
              </shadow>
            </value>
          </block>
          <block type="controls_whileUntil"></block>
          <block type="controls_for">
            <value name="FROM">
              <shadow type="math_number">
                <field name="NUM">1</field>
              </shadow>
            </value>
            <value name="TO">
              <shadow type="math_number">
                <field name="NUM">10</field>
              </shadow>
            </value>
            <value name="BY">
              <shadow type="math_number">
                <field name="NUM">1</field>
              </shadow>
            </value>
          </block>
          <block type="controls_forEach"></block>
          <block type="controls_flow_statements"></block>
        </category>
        <category name="Math" colour="%{BKY_MATH_HUE}">
          <block type="math_number">
            <field name="NUM">123</field>
          </block>
          <block type="math_arithmetic">
            <value name="A">
              <shadow type="math_number">
                <field name="NUM">1</field>
              </shadow>
            </value>
            <value name="B">
              <shadow type="math_number">
                <field name="NUM">1</field>
              </shadow>
            </value>
          </block>
          <block type="math_single">
            <value name="NUM">
              <shadow type="math_number">
                <field name="NUM">9</field>
              </shadow>
            </value>
          </block>
          <block type="math_trig">
            <value name="NUM">
              <shadow type="math_number">
                <field name="NUM">45</field>
              </shadow>
            </value>
          </block>
          <block type="math_constant"></block>
          <block type="math_number_property">
            <value name="NUMBER_TO_CHECK">
              <shadow type="math_number">
                <field name="NUM">0</field>
              </shadow>
            </value>
          </block>
          <block type="math_round">
            <value name="NUM">
              <shadow type="math_number">
                <field name="NUM">3.1</field>
              </shadow>
            </value>
          </block>
          <block type="math_on_list"></block>
          <block type="math_modulo">
            <value name="DIVIDEND">
              <shadow type="math_number">
                <field name="NUM">64</field>
              </shadow>
            </value>
            <value name="DIVISOR">
              <shadow type="math_number">
                <field name="NUM">10</field>
              </shadow>
            </value>
          </block>
          <block type="math_constrain">
            <value name="VALUE">
              <shadow type="math_number">
                <field name="NUM">50</field>
              </shadow>
            </value>
            <value name="LOW">
              <shadow type="math_number">
                <field name="NUM">1</field>
              </shadow>
            </value>
            <value name="HIGH">
              <shadow type="math_number">
                <field name="NUM">100</field>
              </shadow>
            </value>
          </block>
          <block type="math_random_int">
            <value name="FROM">
              <shadow type="math_number">
                <field name="NUM">1</field>
              </shadow>
            </value>
            <value name="TO">
              <shadow type="math_number">
                <field name="NUM">100</field>
              </shadow>
            </value>
          </block>
          <block type="math_random_float"></block>
          <block type="math_atan2">
            <value name="X">
              <shadow type="math_number">
                <field name="NUM">1</field>
              </shadow>
            </value>
            <value name="Y">
              <shadow type="math_number">
                <field name="NUM">1</field>
              </shadow>
            </value>
          </block>
        </category>
        <category name="Text" colour="%{BKY_TEXTS_HUE}">
          <block type="text"></block>
          <block type="text_join"></block>
          <block type="text_append">
            <value name="TEXT">
              <shadow type="text"></shadow>
            </value>
          </block>
          <block type="text_length">
            <value name="VALUE">
              <shadow type="text">
                <field name="TEXT">abc</field>
              </shadow>
            </value>
          </block>
          <block type="text_isEmpty">
            <value name="VALUE">
              <shadow type="text">
                <field name="TEXT"></field>
              </shadow>
            </value>
          </block>
          <block type="text_indexOf">
            <value name="VALUE">
              <block type="variables_get">
                <field name="VAR">{textVariable}</field>
              </block>
            </value>
            <value name="FIND">
              <shadow type="text">
                <field name="TEXT">abc</field>
              </shadow>
            </value>
          </block>
          <block type="text_charAt">
            <value name="VALUE">
              <block type="variables_get">
                <field name="VAR">{textVariable}</field>
              </block>
            </value>
          </block>
          <block type="text_getSubstring">
            <value name="STRING">
              <block type="variables_get">
                <field name="VAR">{textVariable}</field>
              </block>
            </value>
          </block>
          <block type="text_changeCase">
            <value name="TEXT">
              <shadow type="text">
                <field name="TEXT">abc</field>
              </shadow>
            </value>
          </block>
          <block type="text_trim">
            <value name="TEXT">
              <shadow type="text">
                <field name="TEXT">abc</field>
              </shadow>
            </value>
          </block>
          <block type="text_print">
            <value name="TEXT">
              <shadow type="text">
                <field name="TEXT">abc</field>
              </shadow>
            </value>
          </block>
          <block type="text_prompt_ext">
            <value name="TEXT">
              <shadow type="text">
                <field name="TEXT">abc</field>
              </shadow>
            </value>
          </block>
        </category>
        <category name="Lists" colour="%{BKY_LISTS_HUE}">
          <block type="lists_create_with">
            <mutation items="0"></mutation>
          </block>
          <block type="lists_create_with"></block>
          <block type="lists_repeat">
            <value name="NUM">
              <shadow type="math_number">
                <field name="NUM">5</field>
              </shadow>
            </value>
          </block>
          <block type="lists_length"></block>
          <block type="lists_isEmpty"></block>
          <block type="lists_indexOf">
            <value name="VALUE">
              <block type="variables_get">
                <field name="VAR">{listVariable}</field>
              </block>
            </value>
          </block>
          <block type="lists_getIndex">
            <value name="VALUE">
              <block type="variables_get">
                <field name="VAR">{listVariable}</field>
              </block>
            </value>
          </block>
          <block type="lists_setIndex">
            <value name="LIST">
              <block type="variables_get">
                <field name="VAR">{listVariable}</field>
              </block>
            </value>
          </block>
          <block type="lists_getSublist">
            <value name="LIST">
              <block type="variables_get">
                <field name="VAR">{listVariable}</field>
              </block>
            </value>
          </block>
          <block type="lists_split">
            <value name="DELIM">
              <shadow type="text">
                <field name="TEXT">,</field>
              </shadow>
            </value>
          </block>
          <block type="lists_sort"></block>
        </category>
        <category name="Colour" colour="%{BKY_COLOUR_HUE}">
          <block type="colour_picker"></block>
          <block type="colour_random"></block>
          <block type="colour_rgb">
            <value name="RED">
              <shadow type="math_number">
                <field name="NUM">100</field>
              </shadow>
            </value>
            <value name="GREEN">
              <shadow type="math_number">
                <field name="NUM">50</field>
              </shadow>
            </value>
            <value name="BLUE">
              <shadow type="math_number">
                <field name="NUM">0</field>
              </shadow>
            </value>
          </block>
          <block type="colour_blend">
            <value name="COLOUR1">
              <shadow type="colour_picker">
                <field name="COLOUR">#ff0000</field>
              </shadow>
            </value>
            <value name="COLOUR2">
              <shadow type="colour_picker">
                <field name="COLOUR">#3333ff</field>
              </shadow>
            </value>
            <value name="RATIO">
              <shadow type="math_number">
                <field name="NUM">0.5</field>
              </shadow>
            </value>
          </block>
        </category>
        <sep></sep>
        <category name="Variables" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE"></category>
        <category name="Functions" colour="%{BKY_PROCEDURES_HUE}" custom="PROCEDURE"></category>
        <sep></sep>
        <category name="Stocks" colour="%{BKY_LOOPS_HUE}">
          <block type="stock_buy_simple"></block>
          <block type="stock_buy_prog"></block>
          <block type="stock_fetch_price"></block>
        </category>
      </xml>`,
    },
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

#code {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 50%;
  margin: 0;
  background-color: beige;
}

#blockly1 {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 50%;
}

#blockly2 {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 50%;
}
</style>
