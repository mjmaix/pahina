import React, { HTMLAttributes } from 'react';
import { cx, css } from 'emotion';

export const Icon = React.forwardRef<HTMLSpanElement, HTMLAttributes<any>>(
  ({ className, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        'material-icons',
        className,
        css`
          font-size: 18px;
          vertical-align: text-bottom;
        `,
      )}
    />
  ),
);
