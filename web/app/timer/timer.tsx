import { Center, Group, Paper, RingProgress, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import useSound from "use-sound";

import { TimerButton } from "./timerButton";

const POMODORO = 1 * 60;

export function StatsRing() {
  const [count, setCount] = useState(POMODORO);
  const [timerState, setTimerState] = useState<"disable" | "active">("disable");
  const [play] = useSound("../../public/livechat-129007.mp3");
  const ref: { current: null | NodeJS.Timeout } = { current: null };
  const color = "teal";

  useEffect(() => {
    if (timerState != "active") {
      return;
    }
    if (count > 0) {
      ref.current = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    } else {
      if (ref.current) {
        clearInterval(ref.current);
      }
      play();
      setCount(POMODORO);
      setTimerState("disable");
    }
    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, [timerState, count]);

  const handleTimer = (state: "active" | "disable") => {
    setTimerState(state);
  };
  const minutes = Math.floor(count / 60);
  const seconds = count % 60;

  const timer = (
    <Center>
      <Paper radius="md" p="xs" styles={{ root: { height: "auto" } }}>
        <Group>
          <RingProgress
            size={800}
            roundCaps
            thickness={8}
            sections={[{ value: (count / POMODORO) * 100, color: color }]}
            label={
              <>
                <Center>
                  <Text fw={700} size="60" styles={{ root: { lineHeight: "60px" } }}>
                    {minutes}:{seconds < 10 ? "0" + seconds : seconds}
                  </Text>
                </Center>
              </>
            }
          />
        </Group>
        <TimerButton
          isResetButtonEnabled={count == POMODORO}
          resetCount={() => setCount(POMODORO)}
          timerState={timerState}
          handleTimer={handleTimer}
        />
      </Paper>
    </Center>
  );

  return (
    <SimpleGrid cols={{ base: 1 }} styles={{ root: { backgroundColor: "white" } }}>
      {timer}
    </SimpleGrid>
  );
}
