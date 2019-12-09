<template>
  <div class="blockly-editor">
    <v-row cols="4" class="offset-1">
      {{ projectPath }}
    </v-row>
    <v-row>
      <v-col>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon x-large v-on="{ ...tooltip }" @click="newProject();">
              <v-icon x-large>add_circle</v-icon>
            </v-btn>
          </template>
          <span>新增專案</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon x-large
              v-on="{ ...tooltip }"
              :disabled="changed === false"
              @click="saveProject();">
              <v-icon x-large>save</v-icon>
            </v-btn>
          </template>
          <span>儲存專案</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon x-large v-on="{ ...tooltip }" @click="openProject();">
              <v-icon x-large>folder_open</v-icon>
            </v-btn>
          </template>
          <span>開啟專案</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon x-large v-on="{ ...tooltip }" @click="saveProjectAs();">
              <v-icon x-large>save_alt</v-icon>
            </v-btn>
          </template>
          <span>另存新專案</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon x-large v-on="{ ...tooltip }" @click="importProject();">
              <v-icon x-large>perm_media</v-icon>
            </v-btn>
          </template>
          <span>匯入專案</span>
        </v-tooltip>
        |
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon x-large v-on="{ ...tooltip }" @click="workspace.undo(false);">
              <v-icon x-large>undo</v-icon>
            </v-btn>
          </template>
          <span>上一步</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon x-large v-on="{ ...tooltip }" @click="workspace.undo(true);">
              <v-icon x-large>redo</v-icon>
            </v-btn>
          </template>
          <span>下一步</span>
        </v-tooltip>
        |
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon x-large v-on="{ ...tooltip }" @click="run();">
              <v-icon x-large>play_circle_filled</v-icon>
            </v-btn>
          </template>
          <span>運行</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn icon x-large v-on="{ ...tooltip }" @click="debug();">
              <v-icon x-large>bug_report</v-icon>
            </v-btn>
          </template>
          <span>偵錯</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <div ref="blocklyDiv" id="blocklyDiv"></div>
    <xml ref="blocklyToolboxXml" style="display: none">
      <slot>
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
      </slot>
    </xml>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import Blockly from 'blockly';
import BlocklyPy from 'blockly/python';
import { promises as fs } from 'fs';

@Component
export default class BlocklyComponent extends Vue {
  private workspace!: Blockly.WorkspaceSvg;

  private projectPath: string = '';

  private changed: boolean = false;

  @Prop() private options!: object;

  mounted() {
    this.workspace = Blockly.inject(this.$refs.blocklyDiv as HTMLElement, this.$props.options || {
      grid: {
        spacing: 25,
        length: 3,
        colour: '#ccc',
        snap: true,
      },
      toolbox: this.$refs.blocklyToolboxXml as HTMLElement,
      zoom: {
        controls: true,
        wheel: true,
      },
      trashcan: true,
    }) as Blockly.WorkspaceSvg;
    this.workspace.addChangeListener(this.changesMonitor);
  }

  async load(path: string) {
    try {
      const data = await fs.readFile(`${path}/script/script.xml`);
      const dom = Blockly.Xml.textToDom(data as any);
      this.workspace.clear();
      Blockly.Xml.domToWorkspace(dom, this.workspace);
    } catch (e) {
      console.error(e);
    }
  }

  async save(path) {
    try {
      await this.$createIfNotExists(`${path}`);
      await this.$createIfNotExists(`${path}/script`);
      await this.$createIfNotExists(`${path}/media`);

      const dom = Blockly.Xml.workspaceToDom(this.workspace);
      const data = Blockly.Xml.domToText(dom);
      await fs.writeFile(`${path}/script/script.xml`, data);
      const pythonData = BlocklyPy.workspaceToCode(this.workspace);
      await fs.writeFile(`${path}/script/script.py`, pythonData);
      this.changed = false;
    } catch (e) {
      console.error(e);
    }
  }

  changesMonitor(event) {
    if (event.blockId !== null && this.changed === false) {
      this.changed = true;
    }

    if (event.type === 'finished_loading') {
      this.changed = false;
    }
  }

  run() {
    console.log('run', this.$el);
  }

  debug() {
    console.log('debug', this.$el);
  }

  async newProject() {
    await this.savePath({
      defaultPath: this.$projectRoot,
      properties: [
        'openDirectory',
        'promptToCreate', // Windows only
      ],
      filters: [
        { name: 'Script Editor Project (*.seprj)', extensions: ['seprj'] },
      ],
    }).then((path: string) => {
      this.workspace.clear();
      if (path.endsWith('.seprj') === false) {
        this.projectPath = `${path}.seprj`;
      }
    });
  }

  async openProject() {
    await this.openPath({
      defaultPath: this.$projectRoot,
      properties: [
        'openDirectory',
        'promptToCreate', // Windows only
      ],
      filters: [
        { name: 'Script Editor Project (*.seprj)', extensions: ['seprj'] },
      ],
    }).then((path: string) => {
      this.projectPath = path;
      this.load(path);
    });
  }

  async saveProject() {
    if (this.projectPath === '') {
      await this.savePath({
        defaultPath: this.$projectRoot,
        properties: [
          'openDirectory',
          'promptToCreate', // Windows only
        ],
        filters: [
          { name: 'Script Editor Project (*.seprj)', extensions: ['seprj'] },
        ],
      }).then((path: string) => {
        this.projectPath = path;
      });
    } else {
      if (this.projectPath.endsWith('.seprj') === false) {
        this.projectPath = `${this.projectPath}.seprj`;
      }
      this.save(this.projectPath);
    }
  }

  async saveProjectAs() {
    await this.savePath({
      defaultPath: this.$projectRoot,
      properties: [
        'openDirectory',
        'promptToCreate', // Windows only
      ],
      filters: [
        { name: 'Script Editor Project (*.seprj)', extensions: ['seprj'] },
      ],
    }).then((path: string) => {
      if (path.endsWith('.seprj') === false) {
        this.projectPath = `${path}.seprj`;
      }
      this.save(this.projectPath);
    });
  }

  async importProject() {
    await this.openPath({
      defaultPath: this.$projectRoot,
      properties: [
        'openDirectory',
        'promptToCreate', // Windows only
      ],
      filters: [
        { name: 'Script Editor Project (*.seprj)', extensions: ['seprj'] },
      ],
    }).then((path: string) => {
      this.load(path);
    });
  }

  savePath(options: object | null): Promise<string> {
    return new Promise((resolve, reject) => this.$electron.remote.dialog.showSaveDialog(options)
      .then(result => (
        result.canceled === false ? resolve(result.filePath) : reject(result))));
  }

  openPath(options: object | null): Promise<string> {
    return new Promise((resolve, reject) => this.$electron.remote.dialog.showOpenDialog(options)
      .then(result => (
        result.canceled === false ? resolve(result.filePaths.shift()) : reject(result))));
  }
}
</script>

<style lang="css" scoped>
.blockly-editor {
  z-index: 1;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

#blocklyDiv {
  color: rgba(0, 0, 0, 1);
  height: 88vh;
  width: 100%;
  text-align: left;
}
</style>
