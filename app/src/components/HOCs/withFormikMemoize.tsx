import { FormikProps } from 'formik';
import React from 'react';

type FuncCompProps<T> = (p: FormikProps<T>) => JSX.Element;

/**
 * Helper HOC to prevent frequent re-render of Formik fields.
 * @param Comp Compnent to be wrapped
 * @param dataKey bind to kthis key
 * @param freezeUntilSubmit do not rerender until form is submitted.
 * Useful for keeping error (TODO: but will not reflect new errors, for improvement ).
 */
export function withFormikMemoize(
  Comp: FuncCompProps<any>,
  dataKey: string,
  freezeUntilSubmit = false,
) {
  const areEqual = (prev: FormikProps<any>, next: FormikProps<any>) => {
    const valueSame = prev.values[dataKey] === next.values[dataKey];
    const errorSame = prev.errors[dataKey] === next.errors[dataKey];
    // FIXME: NOTE:  Allow isSubmitting to be reflected on render but briefly flahes the component
    const submittingSame = prev.isSubmitting === next.isSubmitting;

    let equal = false;
    if (freezeUntilSubmit) {
      equal = !next.isSubmitting;
    } else {
      equal = valueSame && errorSame && submittingSame;
    }
    return equal;
  };

  return React.memo(Comp, areEqual);
}
