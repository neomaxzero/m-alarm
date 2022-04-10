import cumbia from "cumbia";

const alarmConfig = ({ emit }) => {
  const emitValue = (val) => emit("SET_TIMER", val);

  const actions = {
    set15: () => emitValue(900000),
    set10: () => emitValue(600000),
    set5: () => emitValue(300000),
    set3: () => emitValue(180000),
    set1: () => emitValue(60000),
  };

  return {
    actions,
  };
};

cumbia({ alarmConfig }, { globalInitialisers: [] });
