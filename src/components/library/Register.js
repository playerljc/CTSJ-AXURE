import Rect1Tool from './base/Rect1/Rect1Tool';
import Rect2Tool from './base/Rect2/Rect2Tool';
import Rect3Tool from './base/Rect3/Rect3Tool';
import Rect1Component from './base/Rect1/Rect1Component';
import Rect2Component from './base/Rect2/Rect2Component';
import Rect3Component from './base/Rect3/Rect3Component';

import TextFieldTool from './form/TextField/TextFieldTool';
import TextAreaTool from './form/TextArea/TextAreaTool';
import SelectTool from './form/Select/SelectTool';
import TextFieldComponent from './form/TextField/TextFieldComponent';
import TextAreaComponent from './form/TextArea/TextAreaComponent';
import SelectComponent from './form/Select/SelectComponent';

export default new Map([
  ['base', new Map([
    ['Rect1', {
      Tool: Rect1Tool,
      Component: Rect1Component,
    }],
    ['Rect2', {
      Tool: Rect2Tool,
      Component: Rect2Component,
    }],
    ['Rect3', {
      Tool: Rect3Tool,
      Component: Rect3Component,
    }],
  ])],
  ['form', new Map([
    ['TextField', {
      Tool: TextFieldTool,
      Component: TextFieldComponent,
    }],
    ['TextArea', {
      Tool: TextAreaTool,
      Component: TextAreaComponent,
    }],
    ['Select', {
      Tool: SelectTool,
      Component: SelectComponent,
    }],
  ])],
]);
