import { FontAwesoneFreeCategories } from '../../global/CT-UI-FontAwesomeFree/FontAwesomeFree';

/**
 * getIconsGroupsConfig
 * @return {Array}
 */
function getIconsGroupsConfig() {
  return Object.getOwnPropertyNames(FontAwesoneFreeCategories).map((c, index) => {
    const { icons, label } = FontAwesoneFreeCategories[c];
    return {
      groupName: `Icons > ${label}`,
      key: 'icons',
      components: icons.map(t => {
        return {
          name: t,
          key: 'Icon',
          attribute: {
            value: t,
          },
        };
      }),
    };
  });
}

export default
[
  {
    groupName: 'Base Component',
    key: 'base',
    components: [
      {
        name: 'Rect1',
        key: 'Rect1',
      },
      {
        name: 'Rect2',
        key: 'Rect2',
      },
      {
        name: 'Rect3',
        key: 'Rect3',
      },
      {
        name: 'Ellipse',
        key: 'Ellipse',
      },
      {
        name: 'Image',
        key: 'Image',
      },
      {
        name: 'Button',
        key: 'Button',
      },
      {
        name: 'PrimaryButton',
        key: 'PrimaryButton',
      },
      {
        name: 'LinkButton',
        key: 'LinkButton',
      },
      {
        name: 'First level heading',
        key: 'H1',
      },
      {
        name: 'Secondary title',
        key: 'H2',
      },
      {
        name: 'Tertiary title',
        key: 'H3',
      },
      {
        name: 'Text',
        key: 'Text',
      },
      {
        name: 'Section',
        key: 'Section',
      },
      {
        name: 'Horizontal line',
        key: 'Hline',
      },
      {
        name: 'Vertical line',
        key: 'Vline',
      },
      {
        name: 'Hot Area',
        key: 'HotArea',
      },
      {
        name: 'Inline Frame',
        key: 'InlineFrame',
      },
    ],
  },
  {
    groupName: 'Form',
    key: 'form',
    components: [
      {
        name: 'TextField',
        key: 'TextField',
      },
      {
        name: 'TextArea',
        key: 'TextArea',
      },
      {
        name: 'Select',
        key: 'Select',
      },
      {
        name: 'List',
        key: 'List',
      },
      {
        name: 'Checkbox',
        key: 'Checkbox',
      },
      {
        name: 'Radio',
        key: 'Radio',
      },
      {
        name: 'Submit',
        key: 'Submit',
      },
    ],
  },
  {
    groupName: 'Menu Table',
    key: 'menutable',
    components: [
      {
        name: 'Tree',
        key: 'Tree',
      },
      {
        name: 'Table',
        key: 'Table',
      },
      {
        name: 'Horizontal Menu',
        key: 'HMenu',
      },
      {
        name: 'Vertical Menu',
        key: 'VMenu',
      },
    ],
  },
].concat(
  getIconsGroupsConfig(),
);
