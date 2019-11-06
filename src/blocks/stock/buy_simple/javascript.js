import * as Blockly from 'blockly/core';

Blockly.JavaScript.stock_buy_simple = (block) => {
  const numberId = block.getFieldValue('ID');
  const numberAmount = block.getFieldValue('Amount');
  const numberPrice = block.getFieldValue('Price');
  const valueNumber = Blockly.JavaScript.valueToCode(
    block,
    'Number',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  return `buy(${numberId},${numberAmount},${numberPrice},${valueNumber});\n`;
};
