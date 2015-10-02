module.exports = function safeGet(value, keys, fallback) {
  fallback = fallback || null;
  keys = keys.split('.');
  for (var i = 0; i < keys.length; i++) {
    if (!value[keys[i]]) { return fallback; }
    value = value[keys[i]];
  }
  return value;
};
