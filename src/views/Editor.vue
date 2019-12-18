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
    <BlocklyComponent ref="blockly"
        :projectPath="projectPath" :changed="changed"
        v-on:changed="onChanged"></BlocklyComponent>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import { promises as fs } from 'fs';
import BlocklyComponent from '@/components/BlocklyComponent.vue';

@Component({
  components: { BlocklyComponent },
})
export default class Editor extends Vue {
  private projectPath: string = '';

  private changed: boolean = false;

  onChanged(value: boolean) {
    this.changed = value;
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
      (this.$refs.blockly as BlocklyComponent).workspace.clear();
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
      this.loadData(path);
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
      this.saveData(this.projectPath);
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
      this.saveData(this.projectPath);
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
      this.loadData(path);
    });
  }

  async saveData(path: string) {
    const blocklyData = (this.$refs.blockly as BlocklyComponent).saveData();
    await this.$createIfNotExists(`${path}`);
    await this.$createIfNotExists(`${path}/script`);
    await this.$createIfNotExists(`${path}/media`);

    await fs.writeFile(`${path}/script/script.xml`, blocklyData.dom);
    await fs.writeFile(`${path}/script/script.py`, blocklyData.py);
  }

  async loadData(path: string) {
    const data = await fs.readFile(`${path}/script/script.xml`);
    (this.$refs.blockly as BlocklyComponent).loadData(data.toString());
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
