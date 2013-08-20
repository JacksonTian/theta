var getTop = function (stack) {
  return stack[stack.length - 1];
};

exports.parse = function (exp) {
  var stack = [];
  var cursor = null;
  var token = [];
  for (var i = 0; i < exp.length; i++) {
    var char = exp.charAt(i);
    if (char === '(') { // 入栈
      var node = {symbol: '', nodes: []};
      // 检查父节点
      var parent = getTop(stack);
      if (parent) {
        parent.nodes.push(node);
      }
      stack.push(node);
    } else if (char === ')') { // 出栈
      if (token.length) {
        var node = getTop(stack);
        node.nodes.push(token.join(''));
      }
      token = []; // 清空token
      cursor = stack.pop();
    } else if (char === ' ') {
      if (token.length) {
        var node = getTop(stack);
        if (node.symbol) {
          node.nodes.push(token.join(''));
        } else {
          node.symbol = token.join('');
        }
      }
      token = []; // 清空token
    } else {
      token.push(char);
    }
  }
  return cursor;
};

var isTree = function (tree) {
  return !!(tree && tree.symbol);
};

var print = function (tree, depth) {
  depth = (typeof depth === 'undefined') ? 0 : depth;
  var str = '';
  for (var j = 0; j < depth; j++) {
    str += '  ';
  }
  str += '(' + tree.symbol;
  for (var i = 0; i < tree.nodes.length; i++) {
    var node = tree.nodes[i];
    if (isTree(node)) {
      str += '\n';
      str += print(node, depth + 1);
    } else {
      if (isTree(tree.nodes[i - 1])) {
        str += '\n';
        for (var k = 0; k < depth; k++) {
          str += '  ';
        }
        str += '  ' + node;
      } else {
        str += ' ' + node;
      }
    }
  }
  str += ')';
  return str;
};
exports.print = print;
