import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await Promise.all(
    ['activities', 'teams'].map(
      async (name) =>
        await prisma.$queryRawUnsafe(
          `Truncate "${name}" restart identity cascade;`,
        ),
    ),
  )

  const hashedPassword = await hash('GAX@Andre4321', 10)

  // const user =
  await prisma.user.create({
    data: {
      id: '8fe74579-01c3-4c98-bd24-9e86aebe507b',
      name: 'André Ghisleni Raimann',
      userName: 'andre',
      image: 'https://github.com/andreghisleni.png',
      passwordHash: hashedPassword,
    },
  })

  await prisma.activity.createMany({
    data: [
      {
        id: '96a9eefa-6b36-4ac6-bccd-c962b668e6a7',
        title: 'Escoteiro Suspenso',
        description:
          'A tarefa consiste em erguer um membro da equipe acima de uma altura delimitada por uma corda pelo maior tempo possível.',
        scoreType: 'TIME',
        scoreOrdination: 'BIGGER',
        scoreDescription: 'Tempo que deixará o membro suspenso',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:17:44.338Z',
        updatedAt: '2024-06-11T02:17:44.338Z',
      },
      {
        id: 'dab01913-6571-47ee-ab06-c6a5bcdbb6ea',
        title: 'Cabo de guerra',
        description:
          'As pessoas selecionadas por cada equipe devem participar de um cabo de guerra.',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'a equipe ganhadora, ganha um numero x de pontos',
        defaultScore: 10,
        numberOfTeams: 2,
        createdAt: '2024-06-11T02:45:39.036Z',
        updatedAt: '2024-06-11T02:45:39.036Z',
      },
      {
        id: '8ef781eb-7902-41e0-83db-37bdf44782e8',
        title: 'Corrida maluca',
        description:
          'É uma corrida com várias atividades durante o trajeto \nLobinho sai até primeira tarefa: abrir cadeado com várias chaves, Vai até outra base e troca com o Escoteiro que corre até a próxima atividade e tem que colocar a linha nas agulhas, corre, vai até a outra base...',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription:
          'por tempo, a equipe que fizer mais rápido ganha mais pontos',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:47:56.177Z',
        updatedAt: '2024-06-11T02:47:56.177Z',
      },
      {
        id: 'f82e06e4-1960-4a92-866e-66bc496102a4',
        title: 'Torta na cara',
        description:
          'Os participantes vao se posicionar em duas filas, em cada rodada será feita uma pergunta, quem pressionar o botão antes tem que responder a pergunta corretamente, caso erre, leva uma tortada.',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'a equipe que ganhar ganhou',
        defaultScore: 10,
        numberOfTeams: 2,
        createdAt: '2024-06-11T02:48:26.468Z',
        updatedAt: '2024-06-11T02:48:26.468Z',
      },
      {
        id: '512eeac6-1032-42a7-823b-ff6f95b7e45f',
        title: 'Desafio da garrafa',
        description:
          'O participante joga a garrafa, se ela cair de pé, avança uma casa no tabuleiro humano, a pontuação será pelo menor tempo',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'o menor tempo vai ganhar a maior pontuação.',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:48:36.117Z',
        updatedAt: '2024-06-11T02:48:36.117Z',
      },
      {
        id: 'ec12fcc6-4ded-4f84-8def-1612fe7969cf',
        title: 'Quebra cabeça ',
        description:
          'O objetivo será montar o quebra cabeça no menor tempo possível',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'o menor tempo possível',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:49:14.351Z',
        updatedAt: '2024-06-11T02:49:14.351Z',
      },
      {
        id: 'cfe70aec-3ec1-4a6d-bba9-0c0ea1061f38',
        title: 'Tiro ao alvo com zarabatana',
        description:
          'Acertar o alvo e fazer a maior pontuação possível, cada participante vai lançar duas vezes o dardo',
        scoreType: 'NUMBER',
        scoreOrdination: 'BIGGER',
        scoreDescription: 'somatória de pontos da equipe',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:49:37.088Z',
        updatedAt: '2024-06-11T02:49:37.088Z',
      },
      {
        id: 'ef66ff16-7055-4485-b171-c598042e6008',
        title: 'Corrida dos barcos ',
        description:
          'A tarefa consiste em chegar até o local delimitado sem pisar no chão. A equipe irá ganhar 2 pedaços de papelão e usando apenas isso precisam chegar do outro lado',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'as 5 primeiras equipes vao pontar',
        defaultScore: 0,
        numberOfTeams: 0,
        createdAt: '2024-06-11T02:50:23.906Z',
        updatedAt: '2024-06-11T02:50:23.906Z',
      },
      {
        id: '6e61edd4-19e3-41f6-9289-6ab7b0813183',
        title: 'Corrida de Cadeira humana',
        description:
          'Fazer a cadeirinha com os braços para transportar até uma linha - uma por vez - 2 pessoas ida e volta',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'pontua os 5 primeiros',
        defaultScore: 0,
        numberOfTeams: 0,
        createdAt: '2024-06-11T02:49:04.890Z',
        updatedAt: '2024-06-11T02:50:31.135Z',
      },
      {
        id: '51a1f98b-2365-4a7f-ad15-89ce9ff6b5f4',
        title: 'Acender uma fogueira com pederneira',
        description:
          'A equipe tem que montar o ninho para o fogo com sisal e tentar acender no menor tempo possível',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription:
          'pontuar conforme o tempo, a equipe que levar menos tempo 20 pontos ...',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:51:15.469Z',
        updatedAt: '2024-06-11T02:51:15.469Z',
      },
      {
        id: '5d69fb2b-84a0-423c-be84-4f638e6d363a',
        title: 'Corrida com pés amarrados ',
        description:
          'Os participantes da equipe ficam todos lado a lado, com os pés encostados amarrados. O objetivo é realizar o percurso no menor tempo possível, caminhando todos juntos.',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'os 5 primeiros pontuam',
        defaultScore: 0,
        numberOfTeams: 0,
        createdAt: '2024-06-11T02:51:28.638Z',
        updatedAt: '2024-06-11T02:51:28.638Z',
      },
      {
        id: 'f32e1614-a963-40d3-bb41-153051926114',
        title: 'Chute ao alvo com camera de caminhão',
        description:
          'Devem acertar o chute em uma das câmaras penduradas. A equipe terá o tempo de 5 minutos revezando os participantes nas tentativas, a equipe deve se organizar para buscar a bola.',
        scoreType: 'NUMBER',
        scoreOrdination: 'BIGGER',
        scoreDescription:
          'somatória de pontos, que depois sarão convertidos na pontuação, para nao ser uma base que de muitos pontos, a que tiver a maior pontuação vair ficar com 10, a segunda 9 ..... ',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:51:51.780Z',
        updatedAt: '2024-06-11T02:51:51.780Z',
      },
      {
        id: 'a3f11047-09d1-4b43-8617-e67ce3c03356',
        title: 'Balão com copo',
        description:
          'Cada participante vai pegar os copos (20 unidade) que estão em uma mesa com uma bexiga de ar e levar até a outra mesa, revezando entre os participantes',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription:
          'o menor tempo vai ganhar a maior pontuação e vai diminuindo na ordem que aumente o tempo',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:52:03.560Z',
        updatedAt: '2024-06-11T02:52:03.560Z',
      },
      {
        id: '56d89b63-64aa-4e26-9487-2a2f431c60d2',
        title: 'Quick pong',
        description:
          'Cada membro da equipe deve faz a bolinha de ping pong quicar na mesa e cair dentro do copo. A equipe que fizer com que todos os membros tenham acertado e acabar mais rápido, ganha.',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'a equipe que fizer em menor tempo ganha',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:52:15.703Z',
        updatedAt: '2024-06-11T02:52:15.703Z',
      },
      {
        id: '4bbf0d9c-2492-478f-be3c-067cea3742ff',
        title: 'Espoja com água',
        description:
          'Um participante por vez enche a esponja no primeiro balde e leva até a garrafa',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'encher a garrafa no menor tempo',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:52:33.879Z',
        updatedAt: '2024-06-11T02:52:33.879Z',
      },
      {
        id: '60739d3b-d301-46e1-b2ca-1969c81afda4',
        title: 'Ping sopro',
        description:
          'Terá 5 copos plásticos vazios em cima de uma mesa com uma bolinha de ping pong dentro do primeiro copo. A atividade consiste em cada membro da equipe encher o primeiro copo e com um sopro passar a bolinha de ping pong no próximo copo, dessa forma enche de água o segundo copo, assopra a bolinha até passar para o terceiro copo, assim sucessivamente até chegar ao último copo e assoprar a bolinha para fora.',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'Menor tempo possível ',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:52:47.829Z',
        updatedAt: '2024-06-11T02:52:47.829Z',
      },
      {
        id: '92954442-1875-4855-9859-c97861c678de',
        title: 'Sequencia de dados',
        description:
          'Cada participante vai jogar um dado e tentar montar a sequencia 1, 2, 3... até 6',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'Menor tempo possível',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:53:17.919Z',
        updatedAt: '2024-06-11T02:53:17.919Z',
      },
      {
        id: '8700992e-3417-4788-a111-fe7527505628',
        title: 'Testando o Tato',
        description:
          'Uma mesa com diversos objetos nao perfurantes, cobertos por uma toalha, cada membro da equipe vai sentir os objetos com as mãos, apos isso os membros se reúnem por 30 segundos para discutir quais objetos eles acham que tem em baixo da toalha',
        scoreType: 'NUMBER',
        scoreOrdination: 'BIGGER',
        scoreDescription:
          'numero de objetos achados, ganha 10 pontos, o segundo 9....',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:53:54.581Z',
        updatedAt: '2024-06-11T02:53:54.581Z',
      },
      {
        id: '4fde50be-d680-4ba3-8c13-db093bd5e60d',
        title: 'Aeromodelismo',
        description:
          'Cada um da equipe vai montar um avião de papel e vao ser lançados em uma pista demarcada com bamboos, conforme a linha que o avião passar vai somando a pontuação',
        scoreType: 'NUMBER',
        scoreOrdination: 'BIGGER',
        scoreDescription:
          'somatória dos pontos alcançados pelos aviões, conforme a ordem de maior para menor de potos será gerado os pontos, 10, 9 ....',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T02:54:05.307Z',
        updatedAt: '2024-06-11T02:54:05.307Z',
      },
      {
        id: 'a4a54065-cc27-46a5-9f06-261e96d52d85',
        title: 'Show do milhão',
        description:
          'Perguntas de conhecimentos gerais, em todas as áreas. Utilizaremos o Kahoot',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'a ordem da pontuação do kahoot (os 5 primeiros)',
        defaultScore: 0,
        numberOfTeams: 0,
        createdAt: '2024-06-11T02:54:35.496Z',
        updatedAt: '2024-06-11T02:54:35.496Z',
      },
      {
        id: 'cbbb4b39-ec74-4294-8b0d-df68a577a408',
        title: 'Distancia entre dois pontos',
        description:
          'Cada equipe chuta a distancia entre dois cones (uma distancia de 3,5 metros)',
        scoreType: 'DISTANCE',
        scoreOrdination: 'SMALLER',
        scoreDescription:
          'Distancia mais aproximada, a equipe chegar mais proximo.',
        defaultScore: null,
        numberOfTeams: 0,
        createdAt: '2024-06-11T02:56:18.289Z',
        updatedAt: '2024-06-11T02:56:18.289Z',
      },
      {
        id: 'b4283ca8-0115-4569-8c7d-da522427a8d7',
        title: 'Corrida do saco de batata',
        description:
          'Cada equipe escolhe 1 membro para participar da corrida do saco. Vence a equipe que ir e voltar primeiro ',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'os 5 primeiros pontuam',
        defaultScore: 0,
        numberOfTeams: 0,
        createdAt: '2024-06-11T03:00:37.366Z',
        updatedAt: '2024-06-11T03:00:37.366Z',
      },
      {
        id: '17468a09-3e23-4c09-8bb0-f11480db3195',
        title: 'O açougueiro',
        description:
          'A equipe que separar 1,5 kg mais proximo, a equipe tem que separar 1,5kg em um balde, de um monte de areia, a equipe que chegar com o peso mais proximo vai ter a maior pontuação',
        scoreType: 'WEIGHT',
        scoreOrdination: 'CLOSER',
        scoreDescription: 'peso mais proximo',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T03:01:07.423Z',
        updatedAt: '2024-06-11T03:01:07.423Z',
      },
      {
        id: 'b1f3e1e7-9694-46e6-871c-d4c85190bbce',
        title: 'Tomar Refrigerante',
        description:
          'Escolher um lobinho (200), um escoteiro (latinha)  e um sênior (600ml) membro da equipe que vai tomar mais rápido',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'a equipe que tomar mais rápido',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-11T03:02:34.326Z',
        updatedAt: '2024-06-11T03:02:34.326Z',
      },
    ],
  })

  await prisma.team.createMany({
    data: [
      {
        id: '9831730e-c4fe-4153-bfc7-87c42cea6974',
        name: 'Equipe 1',
        createdAt: '2024-06-08T04:46:35.181Z',
        updatedAt: '2024-06-08T04:46:35.181Z',
      },
      {
        id: 'a4e31651-aaee-4d7a-87e6-8591c86a2746',
        name: 'Equipe 2',
        createdAt: '2024-06-08T04:46:35.181Z',
        updatedAt: '2024-06-08T04:46:35.181Z',
      },
      {
        id: '5ab5c373-f89f-40be-8e9b-7aa233007567',
        name: 'Equipe 3',
        createdAt: '2024-06-08T04:46:35.181Z',
        updatedAt: '2024-06-08T04:46:35.181Z',
      },
    ],
  })
}

seed().then(() => {
  console.log('Seed finished')
})
