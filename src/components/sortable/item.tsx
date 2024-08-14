import React, {ForwardedRef, forwardRef} from 'react';

interface ItemProps {
    id:string,
    children: React.ReactNode
}
export const Item = forwardRef(function Item({id,children, ...props}:ItemProps, ref:ForwardedRef<HTMLDivElement>) {
  return (
    <div id={id} {...props} ref={ref}>{children}</div>
  )
});

