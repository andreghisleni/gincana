export const routes = ({ activityId }: { activityId: string | null }) => ({
  ADMIN: [
    { href: '/dashboard', title: 'Dashboard' },
    { href: '/scores', shouldMatchExact: true, title: 'Scores' },
    { href: '/scores/all', title: 'Scores all' },
    { href: '/scores/one-two', title: 'Scores one-two' },
    { href: '/score-with-points', title: 'Score points' },
    { href: '/final-votes', title: 'Votos' },
  ],
  ACTIVITY: [
    { href: `/activity/${activityId}`, title: 'Atividade' },
    { href: '/vote', title: 'Votar' },
    { href: '/point-discount', title: 'Denunciar' },
  ],
  DEFAULT: [
    { href: '/point-discount', title: 'Denunciar' },
    { href: '/vote', title: 'Votar' },
  ],
})
