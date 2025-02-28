import { Center, Group, Paper, RingProgress, SimpleGrid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

const POMODORO = 60 * 25

export function StatsRing() {
  const [count, setCount] = useState(POMODORO)
  const [timerState, setTimerState] = useState<'disable' | 'active'>('active')
  const ref: { current: null | NodeJS.Timeout } = { current: null }
  const color = 'teal'

  useEffect(() => {
    if (timerState != 'active') {
      return;
    }
    if (count > 0) {
      ref.current = setInterval(() => {
        setCount((prev) => prev - 1)
      }, 1000)
    } else {
      if (ref.current) {
        clearInterval(ref.current)
      }
    }
    return () => {
      if (ref.current) {
        clearInterval(ref.current)
      }
    }
  }, [timerState, count])

  const minutes = Math.floor(count / 60)
  const seconds = count % 60
  const timer = (<Paper withBorder radius="md" p="xs" styles={{ root: { width: '1000px' } }} >
    <Group>
      <RingProgress
        size={800}
        roundCaps
        thickness={8}
        sections={[{ value: count / POMODORO * 100, color: color }]}
        label={
          <Center>
            <Text fw={700} size="60">
              {minutes}:{seconds == 0 ? '00' : seconds}
            </Text>
          </Center>
        }
      />
    </Group>
  </Paper>)

  return <SimpleGrid cols={{ base: 1, sm: 3 }}>{timer}</SimpleGrid>;
}
