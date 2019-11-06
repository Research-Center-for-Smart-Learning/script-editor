import * as Blockly from 'blockly/core';

Blockly.Blocks.stock_buy_simple = {
  init() {
    this.appendValueInput('Number')
      .setCheck('Number')
      .appendField('Buy Stock ID')
      .appendField(new Blockly.FieldNumber(0), 'ID')
      .appendField('For amount')
      .appendField(new Blockly.FieldNumber(0), 'Amount')
      .appendField('At Price')
      .appendField(new Blockly.FieldNumber(0), 'Price');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, 'String');
    this.setColour(230);
    this.setTooltip('buy id');
    this.setHelpUrl('https://example.com');
  },
};
