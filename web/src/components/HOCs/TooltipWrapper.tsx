import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import './TooltipWrapper.css';

interface Props {
  children: React.ReactElement<{ id: string }>; // FIXME: id not showing as mandatory in editor
  tooltipMessage: string;
}

export const TooltipWrapper = ({
  children,
  tooltipMessage,
  ...props2
}: Props) => {
  const childProps = children.props;
  const { id } = childProps;

  return (
    <div>
      {React.cloneElement(children, props2)}
      <UncontrolledTooltip target={id}>{tooltipMessage}</UncontrolledTooltip>
    </div>
  );
};
