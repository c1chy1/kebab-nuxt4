const _introComplete = ref(false)

export const useIntroState = () => {
  return { introComplete: _introComplete }
}
