import React, { useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Address.module.scss";

const Modal = ({
  children,
  handleClose,
  show,
  closeHidden,
  image,
  locked,
  ...props
}) => {
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", stopProgagation);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", stopProgagation);
    };
  });

//   useEffect(() => {
//     handleBodyClass();
//   }, [props.show]);

//   const handleBodyClass = () => {
//     if (document.querySelectorAll(".modal.is-active").length) {
//       document.body.classList.add("modal-is-active");
//     } else {
//       document.body.classList.remove("modal-is-active");
//     }
//   };

  const keyPress = (e) => {
    if (!locked) {
      e.keyCode === 27 && handleClose(e);
    }
  };

  const stopProgagation = (e) => {
    e.stopPropagation();
  };

  const backgroundСlick = () => {
    if (!locked) {
      handleClose();
    }
  };

    const outerClasses = "modal";
//         classNames(
//     "modal",
//     show && "is-active",
//     image && "modal-image",
//     className
//   );
  const innerClasses = "modal-inner";
  const contentClasses = "modal-content";

  return (
    <>
      {show && (
        <div {...props} className={styles.modal} onClick={backgroundСlick}>
          <div className={styles.modal_content} onClick={stopProgagation}>
            {image ? (
              <div className="">
                <Image src={image} alt="cheshire image" />
              </div>
            ) : (
              <>
                {!closeHidden && (
                  <button
                    className="modal-close"
                    aria-label="close"
                    onClick={handleClose}
                  ></button>
                )}
                <div className={contentClasses}>{children}</div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
