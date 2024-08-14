import { toast } from "sonner";

/**
 * Function to load a toast that wait for a promise and it is display to the user
 * @param {Promise} promiseParam Promise variable
 * @param {string} successFullMsg Message when it gets succesfull
 * @param {string} failureMsg  Message when it gets no succesfull
 */
export function promiseToast(promiseParam, successFullMsg, failureMsg) {
  toast.promise(promiseParam, {
    loading: "Cargando...",
    success: () => {
      return toast.success(successFullMsg);
    },
    error: () => {
      return toast.warning(failureMsg);
    },
  });
}
