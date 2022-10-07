import React from 'react';
import styled, { css } from 'styled-components';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var _excluded = ["size", "status", "disabled", "onClick", "children"];

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;

var generateStatusStyle = function generateStatusStyle(status) {
  switch (status) {
    case "primary":
      return css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        color: #ffffff;\n        background: #12d4ff;\n\n        &:hover:enabled {\n          background: #6be4ff;\n        }\n\n        &:active:enabled {\n          background: #00b1e9;\n        }\n      "])));

    case "secondary":
      return css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        color: #444444;\n        background: #ffffff;\n        border: 1px solid #d9d9d9;\n\n        &:hover:enabled {\n          color: #6be4ff;\n          background: #ffffff;\n          border: 1px solid #6be4ff;\n        }\n\n        &:active:enabled {\n          font-weight: 500;\n          color: #00b1e9;\n          background: #ffffff;\n          border: 1px solid #00b1e9;\n        }\n      "])));

    case "danger":
      return css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        color: #ffffff;\n        background: #ff3d3d;\n\n        &:hover:enabled {\n          background: #ff8383;\n        }\n\n        &:active:enabled {\n          background: #ea2222;\n        }\n      "])));

    case "basic":
    default:
      return css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n        color: #444444;\n        background: none;\n\n        &:hover:enabled {\n          background: #fafafa;\n        }\n\n        &:active:enabled {\n          background: #d9d9d9;\n        }\n      "])));
  }
};

var generateSizedStyle = function generateSizedStyle(size) {
  switch (size) {
    case "large":
      return css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n        height: 38px;\n        padding: 12px 24px;\n      "])));

    case "medium":
    default:
      return css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n        height: 30px;\n        padding: 8px 16px;\n      "])));
  }
};

var Button = function Button(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? "medium" : _ref$size,
      _ref$status = _ref.status,
      status = _ref$status === void 0 ? "basic" : _ref$status,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      onClick = _ref.onClick,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement(StyledButton, Object.assign({
    size: size,
    status: status,
    disabled: disabled,
    onClick: onClick
  }, rest), children);
};
var StyledButton = styled.button(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  height: 30px;\n  padding: 8px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n\n  &:disabled {\n    color: #ffffff;\n    background: #e5e5e5;\n  }\n\n  ", ";\n  ", "\n"])), function (_ref2) {
  var size = _ref2.size;
  return generateSizedStyle(size);
}, function (_ref3) {
  var status = _ref3.status;
  return generateStatusStyle(status);
});

export { Button, Button as ButtonProps };
