function classesToStyles(/*className, [className, ...]*/) {
  var args = Array.slice(arguments);
  var styles = [];
  for (var i = 0; i < args.length; i++) {
    if (this[args[i]]) {
      styles.push(this[args[i]]);
    }
  }
  return styles;
}

function factory(styles) {
  return classesToStyles.bind(styles);
}

module.exports = factory;
