import * as Blockly from 'blockly/core';

Blockly.JavaScript.stock_fetch_price = (block) => {
  const valueFetch = Blockly.JavaScript.valueToCode(
    block,
    'Fetch',
    Blockly.JavaScript.ORDER_ATOMIC,
  );
  // eslint-disable-next-line no-underscore-dangle
  const variableVariable = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue('variable'),
    Blockly.Variables.NAME_TYPE,
  );
  return `fetch_price(${valueFetch},${variableVariable});\n`;
};
