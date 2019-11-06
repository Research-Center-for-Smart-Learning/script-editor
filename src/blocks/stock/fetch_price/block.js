import * as Blockly from 'blockly/core';

Blockly.Blocks.stock_fetch_price = {
  init() {
    this.appendValueInput('Fetch')
      .setCheck('Number')
      .appendField('Fetch Price of Stock ID:');
    this.appendDummyInput()
      .appendField('And set to:')
      .appendField(new Blockly.FieldVariable('item'), 'variable');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('fetch stock price');
    this.setHelpUrl('https://example.com');
  },
};
