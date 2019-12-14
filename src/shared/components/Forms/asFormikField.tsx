import React from 'react';
import { useField } from 'formik';

const asFormikField = <P extends { id: string }>(Component: React.ComponentType<P>): React.FC<P> => props => {
  const [field, meta] = useField(props.id);
  const marginBottom = meta.touched && meta.error ? '1.2rem' : '3.6rem';
  const style: React.CSSProperties = { marginBottom: marginBottom };

  return (
    <div style={style}>
      <Component
        {...props}
        {...field}
        error={
          meta.touched && meta.error
            ? {
                label: 'Error',
                messages: [meta.error],
              }
            : undefined
        }
      />
    </div>
  );
};

export default asFormikField;
