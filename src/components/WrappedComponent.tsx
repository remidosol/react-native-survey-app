import { StackComponentProps, TabComponentProps } from "../types/navigator";

export const WrappedComponent = (
  Component: (props: any) => React.JSX.Element,
  props: StackComponentProps<any> | TabComponentProps<any>
) => {
  return <Component {...props} />;
};
