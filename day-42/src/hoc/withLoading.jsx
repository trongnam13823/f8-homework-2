const withLoading = (WrappedComponent) => {
  return (props) => {
    const { isLoading, ...restProps } = props;

    if (isLoading) {
      return <div>Đang tải...</div>;
    }

    return WrappedComponent({ ...restProps });
  };
};
export default withLoading;
