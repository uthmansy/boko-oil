import { useEffect } from "react";
import useDispatchStore from "../store/dispatch";

function useExternalDispatch() {
  const { setFromExternalStock, setToCustomer, nextPage } = useDispatchStore();

  useEffect(() => {
    setFromExternalStock(true);
    setToCustomer(false);
    nextPage();
  }, []);

  return {};
}

export default useExternalDispatch;
