import React from 'react';
import AccordionItem from './AccordionItem';
import './CardAccordionItem.less';

export default function (props) {
  return <AccordionItem {...props} triggerClassName="Card" />;
}
