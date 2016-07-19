import definitions from "./definitions";

export default function ({ types: t }) {
  const RUNTIME_MODULE_NAME = "babel-runtime";

  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  return {
    visitor: {
      // Array.from -> _core.Array.from
      MemberExpression: {
        enter(path, state) {
          if (state.opts.polyfill === false) return;
          if (!path.isReferenced()) return;

          let { node } = path;
          let obj = node.object;
          let prop = node.property;

          if (!t.isReferenced(obj, node)) return;
          if (node.computed) return;
          if (!has(definitions.methods, obj.name)) return;

          let methods = definitions.methods[obj.name];
          if (!has(methods, prop.name)) return;

          // doesn't reference the global
          if (path.scope.getBindingIdentifier(obj.name)) return;

          path.replaceWith(state.addImport(
            `${RUNTIME_MODULE_NAME}/core-js/${methods[prop.name]}`,
            "default",
            `${obj.name}$${prop.name}`
          ));
        }
      }
    }
  };
}

export { definitions };
