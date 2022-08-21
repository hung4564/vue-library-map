import ErrorState from "./error-state";
import LoadingState from "./loading-state";
export const asyncComponent = (
  component,
  { disableLoading = false, type = "", delayGet = 0 } = {}
) => ({
  component:
    delayGet > 0
      ? new Promise((resolve) => {
          setTimeout(() => {
            resolve(component);
          }, delayGet);
        })
      : component,
  loading: disableLoading
    ? null
    : {
        render: (h) => h(LoadingState, { props: { type } })
      },
  error: ErrorState,
  delay: 0
});
export default asyncComponent;
