import ToolBoxConfig from './toolbox/Toolbox.config';

const map = new Map();

ToolBoxConfig.forEach(({
  key: groupKey,
  components,
}) => {
  const group = new Map();

  components.forEach(({ key: componentKey }) => {
    const config = {
      Tool: require(`./toolbox/${groupKey}/${componentKey}/${componentKey}Tool`).default,
      SummaryTool: require(`./summarytoolbox/${groupKey}/${componentKey}/${componentKey}Tool`).default,
      Component: require(`./component/${groupKey}/${componentKey}/${componentKey}Component`).default,
      Property: require(`./property/${groupKey}/${componentKey}/${componentKey}Property`).default,
      propertyDefaultConfig: require(`./property/${groupKey}/${componentKey}/Property`).default,
    };

    group.set(
      componentKey,
      config
    );
  });

  map.set(groupKey, group);
});

export default map;
