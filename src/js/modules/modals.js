const modals = (state) => {
  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    closeClickOverlay = true,
    requiredInputs = []
  ) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]"),
      scroll = calcScroll();

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        let requieredChecked = requieredCheck(requiredInputs, state);

        if (requieredChecked) {
          windows.forEach((item) => {
            item.style.display = "none";
          });

          modal.style.display = "block";
          document.body.style.overflow = "hidden";
          document.body.style.marginRight = `${scroll}px`;
          //   document.body.classList.add("modal-open");
        }
      });
    });

    //close on cross
    close.addEventListener("click", () => {
      windows.forEach((item) => {
        item.style.display = "none";
      });

      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = "0px";
      //   document.body.classList.remove("modal-open");
    });

    //close on background
    modal.addEventListener("click", (e) => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach((item) => {
          item.style.display = "none";
        });
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = "0px";
        // document.body.classList.remove("modal-open");
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(() => {
      document.querySelector(selector).style.display = "block";
      document.body.style.overflow = "hidden";
    }, time);
  }

  function requieredCheck(requiredInputs, state) {
    if (requiredInputs.length === 0) {
      return true;
    } else {
      for (let key of requiredInputs) {
        if (!(key in state)) {
          return false;
        }
      }
      return true;
    }
  }

  function calcScroll() {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  bindModal(
    ".popup_engineer_btn",
    ".popup_engineer",
    ".popup_engineer .popup_close"
  );
  bindModal(".phone_link", ".popup", ".popup .popup_close");
  bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
  bindModal(
    ".popup_calc_button",
    ".popup_calc_profile",
    ".popup_calc_profile_close",
    false,
    ["form"]
  );
  bindModal(
    ".popup_calc_profile_button",
    ".popup_calc_end",
    ".popup_calc_end_close",
    false,
    ["profile"]
  );

  // showModalByTime(".popup", 60000);
};

export default modals;
