import { Ref, ref } from "vue";

export function useShow(
  init = false
  // eslint-disable-next-line no-unused-vars
): [Ref<boolean>, (value?: boolean) => void] {
  const show = ref(init);
  function toggleShow(value?: boolean) {
    if (value != null) {
      show.value == value;
      return;
    }
    show.value = !show.value;
  }
  return [show, toggleShow];
}
