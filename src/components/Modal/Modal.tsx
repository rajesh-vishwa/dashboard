import { FC, useRef, useEffect } from "react";
import Portal from "@reach/portal";
import s from "./Modal.module.css";
import Cross from "../Icons/Cross";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

interface Props {
  className?: string;
  children?: any;
  open?: boolean;
  onClose: () => void;
}

const Modal: FC<Props> = ({ children, open, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [open]);

  return (
    <Portal>
      {open ? (
        <div
          className="fixed bg-white text-primary flex items-center inset-0 z-50 justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
          ref={ref}
        >
          <div className={"bg-white p-12 border border-accents-2 rounded-md"}>
            <div className="h-7 flex items-center justify-end w-full">
              <button
                onClick={() => onClose()}
                aria-label="Close panel"
                className="hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none"
              >
                <Cross className="h-6 w-6" />
              </button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </Portal>
  );
};

export default Modal;
