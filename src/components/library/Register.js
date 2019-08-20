import Rect1Tool from './base/Rect1/Rect1Tool';
import Rect2Tool from './base/Rect2/Rect2Tool';
import Rect3Tool from './base/Rect3/Rect3Tool';
import Rect1Component from './base/Rect1/Rect1Component';
import Rect2Component from './base/Rect2/Rect2Component';
import Rect3Component from './base/Rect3/Rect3Component';
import Rect1Property from './base/Rect1/Rect1Property';
import Rect2Property from './base/Rect2/Rect2Property';
import Rect3Property from './base/Rect3/Rect3Property';

import TextFieldTool from './form/TextField/TextFieldTool';
import TextAreaTool from './form/TextArea/TextAreaTool';
import SelectTool from './form/Select/SelectTool';
import TextFieldComponent from './form/TextField/TextFieldComponent';
import TextAreaComponent from './form/TextArea/TextAreaComponent';
import SelectComponent from './form/Select/SelectComponent';
import TextFieldProperty from './form/TextField/TextFieldProperty';
import TextAreaProperty from './form/TextArea/TextAreaProperty';
import SelectProperty from './form/Select/SelectProperty';

export default new Map([
  ['base', new Map([
    ['Rect1', {
      Tool: Rect1Tool,
      Component: Rect1Component,
      Property: Rect1Property,
    }],
    ['Rect2', {
      Tool: Rect2Tool,
      Component: Rect2Component,
      Property: Rect2Property,
    }],
    ['Rect3', {
      Tool: Rect3Tool,
      Component: Rect3Component,
      Property: Rect3Property,
    }],
  ])],
  ['form', new Map([
    ['TextField', {
      Tool: TextFieldTool,
      Component: TextFieldComponent,
      Property: TextFieldProperty,
    }],
    ['TextArea', {
      Tool: TextAreaTool,
      Component: TextAreaComponent,
      Property: TextAreaProperty,
    }],
    ['Select', {
      Tool: SelectTool,
      Component: SelectComponent,
      Property: SelectProperty,
    }],
  ])],
]);
