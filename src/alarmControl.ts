import cumbia from "cumbia";

const alarmControl = ({ emit, on }) => {
  let started = false;
  let mainTimer;

  const init = ({ qty, start }) => {
    on("SET_TIMER", (value) => {
      qty.el.value = value;
    });
    on("START_TIMER", () => {
      start.el.textContent = "Stop";
      mainTimer = setTimeout(() => {
        emit("RING");
      }, parseInt(qty.value, 10));
      started = true;
    });

    on("STOP_TIMER", () => {
      start.el.textContent = "Start";
      started = false;
      mainTimer && clearTimeout(mainTimer);
    });
  };
  const actions = {
    start: () => {
      if (started) {
        emit("STOP_TIMER");
      } else {
        emit("START_TIMER");
      }
    },
  };

  return {
    init,
    actions,
  };
};

cumbia({ alarmControl }, { globalInitialisers: [] });
