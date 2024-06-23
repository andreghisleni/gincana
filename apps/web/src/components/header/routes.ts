export const routes = ({ activityId }: { activityId: string | null }) => ({
  ADMIN: [
    { href: '/dashboard', title: 'Dashboard' },
    { href: '/scores', shouldMatchExact: true, title: 'Scores' },
    { href: '/scores/all', title: 'Scores all' },
    { href: '/scores/one-two', title: 'Scores one-two' },
  ],
  ACTIVITY: [
    { href: `/activity/${activityId}`, title: 'Atividade' },
    { href: '/point-discount', title: 'Denunciar' },
  ],
  DEFAULT: [],
})
