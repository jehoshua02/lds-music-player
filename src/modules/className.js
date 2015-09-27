module.exports = function (/* className[, className, [...]]*/) {
  var classNames = Array.slice(arguments);
  return classNames.filter(function (className) {
    return !!className;
  }).join(' ');
};
