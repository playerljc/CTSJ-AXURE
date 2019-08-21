/* Tool */
import Rect1Tool from './base/Rect1/Rect1Tool';
import Rect2Tool from './base/Rect2/Rect2Tool';
import Rect3Tool from './base/Rect3/Rect3Tool';

import TextFieldTool from './form/TextField/TextFieldTool';
import TextAreaTool from './form/TextArea/TextAreaTool';
import SelectTool from './form/Select/SelectTool';

/* Component */
import Rect1Component from './base/Rect1/Rect1Component';
import Rect2Component from './base/Rect2/Rect2Component';
import Rect3Component from './base/Rect3/Rect3Component';

import TextFieldComponent from './form/TextField/TextFieldComponent';
import TextAreaComponent from './form/TextArea/TextAreaComponent';
import SelectComponent from './form/Select/SelectComponent';

/* Property */
import Rect1Property from './base/Rect1/Rect1Property';
import Rect2Property from './base/Rect2/Rect2Property';
import Rect3Property from './base/Rect3/Rect3Property';

import TextFieldProperty from './form/TextField/TextFieldProperty';
import TextAreaProperty from './form/TextArea/TextAreaProperty';
import SelectProperty from './form/Select/SelectProperty';

/* propertyDefaultConfig */
import Rect1PropertyDefaultConfig from './base/Rect1/Property.json';
import Rect2PropertyDefaultConfig from './base/Rect2/Property.json';
import Rect3PropertyDefaultConfig from './base/Rect3/Property.json';

import TextFieldPropertyDefaultConfig from './form/TextField/Property.json';
import TextAreaPropertyDefaultConfig from './form/TextArea/Property.json';
import SelectPropertyDefaultConfig from './form/Select/Property.json';

export default new Map([
  ['base', new Map([
    ['Rect1', {
      Tool: Rect1Tool,
      Component: Rect1Component,
      Property: Rect1Property,
      propertyDefaultConfig: () => Object.assign({}, Rect1PropertyDefaultConfig),
    }],
    ['Rect2', {
      Tool: Rect2Tool,
      Component: Rect2Component,
      Property: Rect2Property,
      propertyDefaultConfig: () => Object.assign({}, Rect2PropertyDefaultConfig),
    }],
    ['Rect3', {
      Tool: Rect3Tool,
      Component: Rect3Component,
      Property: Rect3Property,
      propertyDefaultConfig: () => Object.assign({}, Rect3PropertyDefaultConfig),
    }],
  ])],
  ['form', new Map([
    ['TextField', {
      Tool: TextFieldTool,
      Component: TextFieldComponent,
      Property: TextFieldProperty,
      propertyDefaultConfig: () => Object.assign({}, TextFieldPropertyDefaultConfig),
    }],
    ['TextArea', {
      Tool: TextAreaTool,
      Component: TextAreaComponent,
      Property: TextAreaProperty,
      propertyDefaultConfig: () => Object.assign({}, TextAreaPropertyDefaultConfig),
    }],
    ['Select', {
      Tool: SelectTool,
      Component: SelectComponent,
      Property: SelectProperty,
      propertyDefaultConfig: () => Object.assign({}, SelectPropertyDefaultConfig),
    }],
  ])],
]);
