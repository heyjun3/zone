import { Button, Box } from "@mantine/core";

export type TimerButtonProps = {
  timerState: "active" | "disable";
  isResetButtonEnabled: boolean;
  resetCount: () => void;
  handleTimer: (state: "active" | "disable") => void;
};

export function TimerButton({
  timerState,
  isResetButtonEnabled,
  handleTimer,
  resetCount,
}: TimerButtonProps) {
  const reset = () => {
    handleTimer("disable");
    resetCount();
  };
  return (
    <Box>
      <Button disabled={timerState == "active"} onClick={() => handleTimer("active")}>
        Start
      </Button>
      <Button disabled={timerState == "disable"} onClick={() => handleTimer("disable")} color="red">
        Stop
      </Button>
      <Button disabled={isResetButtonEnabled} onClick={reset} color="red">
        Reset
      </Button>
    </Box>
  );
}
