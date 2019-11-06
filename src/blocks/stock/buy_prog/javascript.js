import * as Blockly from 'blockly/core';

Blockly.JavaScript.stock_buy_prog = (block) => {
  const valueNumber = Blockly.JavaScript.valueToCode(
    block,
    'Number',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  const valueName = Blockly.JavaScript.valueToCode(
    block,
    'NAME',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  return `buy(${valueNumber},${valueName},${valueName});\n`;
};
