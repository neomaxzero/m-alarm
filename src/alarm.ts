import cumbia from "cumbia";

const alarm = ({ on, el }) => {
  let alarmInterval;
  let switcher = false;
  const init = () => {
    on("START_TIMER", () => {
      el.classList.add("ring");
    });

    on("RING", () => {
      console.log("reing");
      alarmInterval = setInterval(() => {
        console.log("wott");
        if (switcher) {
          el.classList.add("ring");
          el.classList.remove("ring-2");
        } else {
          el.classList.add("ring-2");
          el.classList.remove("ring");
        }
        switcher = !switcher;
      }, 500);
    });

    on("STOP_TIMER", () => {
      clearInterval(alarmInterval);
      switcher = false;
    });
  };

  return {
    init,
  };
};

cumbia({ alarm }, { globalInitialisers: [] });
