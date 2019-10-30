/* Tool */
import Rect1Tool from './toolbox/base/Rect1/Rect1Tool';
import Rect2Tool from './toolbox/base/Rect2/Rect2Tool';
import Rect3Tool from './toolbox/base/Rect3/Rect3Tool';

import TextFieldTool from './toolbox/form/TextField/TextFieldTool';
import TextAreaTool from './toolbox/form/TextArea/TextAreaTool';
import SelectTool from './toolbox/form/Select/SelectTool';

/* SummaryTool */
import Rect1SummaryTool from './summarytoolbox/base/Rect1/Rect1Tool';
import Rect2SummaryTool from './summarytoolbox/base/Rect2/Rect2Tool';
import Rect3SummaryTool from './summarytoolbox/base/Rect3/Rect3Tool';

import TextFieldSummaryTool from './summarytoolbox/form/TextField/TextFieldTool';
import TextAreaSummaryTool from './summarytoolbox/form/TextArea/TextAreaTool';
import SelectSummaryTool from './summarytoolbox/form/Select/SelectTool';

/* Component */
import Rect1Component from './component/base/Rect1/Rect1Component';
import Rect2Component from './component/base/Rect2/Rect2Component';
import Rect3Component from './component/base/Rect3/Rect3Component';

import TextFieldComponent from './component/form/TextField/TextFieldComponent';
import TextAreaComponent from './component/form/TextArea/TextAreaComponent';
import SelectComponent from './component/form/Select/SelectComponent';

/* Property */
import Rect1Property from './property/base/Rect1/Rect1Property';
import Rect2Property from './property/base/Rect2/Rect2Property';
import Rect3Property from './property/base/Rect3/Rect3Property';

import TextFieldProperty from './property/form/TextField/TextFieldProperty';
import TextAreaProperty from './property/form/TextArea/TextAreaProperty';
import SelectProperty from './property/form/Select/SelectProperty';

/* propertyDefaultConfig */
import Rect1PropertyDefaultConfig from './property/base/Rect1/Property';
import Rect2PropertyDefaultConfig from './property/base/Rect2/Property';
import Rect3PropertyDefaultConfig from './property/base/Rect3/Property';

import TextFieldPropertyDefaultConfig from './property/form/TextField/Property';
import TextAreaPropertyDefaultConfig from './property/form/TextArea/Property';
import SelectPropertyDefaultConfig from './property/form/Select/Property';

export default new Map([
  [
    'base',
    new Map([
      [
        'Rect1', {
          Tool: Rect1Tool,
          SummaryTool: Rect1SummaryTool,
          Component: Rect1Component,
          Property: Rect1Property,
          propertyDefaultConfig: Rect1PropertyDefaultConfig,
        }],
      [
        'Rect2',
        {
          Tool: Rect2Tool,
          SummaryTool: Rect2SummaryTool,
          Component: Rect2Component,
          Property: Rect2Property,
          propertyDefaultConfig: Rect2PropertyDefaultConfig,
        }],
      [
        'Rect3',
        {
          Tool: Rect3Tool,
          SummaryTool: Rect3SummaryTool,
          Component: Rect3Component,
          Property: Rect3Property,
          propertyDefaultConfig: Rect3PropertyDefaultConfig,
        }],
    ])],
  [
    'form',
    new Map([
      [
        'TextField',
        {
          Tool: TextFieldTool,
          SummaryTool: TextFieldSummaryTool,
          Component: TextFieldComponent,
          Property: TextFieldProperty,
          propertyDefaultConfig: TextFieldPropertyDefaultConfig,
        }],
      [
        'TextArea',
        {
          Tool: TextAreaTool,
          SummaryTool: TextAreaSummaryTool,
          Component: TextAreaComponent,
          Property: TextAreaProperty,
          propertyDefaultConfig: TextAreaPropertyDefaultConfig,
        }],
      [
        'Select',
        {
          Tool: SelectTool,
          SummaryTool: SelectSummaryTool,
          Component: SelectComponent,
          Property: SelectProperty,
          propertyDefaultConfig: SelectPropertyDefaultConfig,
        }],
    ])],
]);
