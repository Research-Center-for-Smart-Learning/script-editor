import * as Blockly from 'blockly/core';

Blockly.Blocks.stock_buy_prog = {
  init() {
    this.appendValueInput('Number')
      .setCheck('Number')
      .appendField('Buy Stock ID');
    this.appendValueInput('NAME')
      .setCheck('Number')
      .appendField('For amount');
    this.appendValueInput('NAME')
      .setCheck('Number')
      .appendField('At Price');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, 'String');
    this.setColour(230);
    this.setTooltip('buy id');
    this.setHelpUrl('https://example.com');
  },
};
