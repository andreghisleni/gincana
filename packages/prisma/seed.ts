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

  const hashedPassword = await hash('GC@Andre4321', 10)

  // const user =
  await prisma.user.create({
    data: {
      id: '8fe74579-01c3-4c98-bd24-9e86aebe507b',
      name: 'André Ghisleni Raimann',
      userName: 'andre',
      image: 'https:github.com/andreghisleni.png',
      passwordHash: hashedPassword,
    },
  })

  await prisma.activity.createMany({
    data: [
      {
        id: '0bcc3e1a-d3f3-4b4d-af6c-592156da74a1',
        title: 'Escoteiro Suspenso',
        description:
          'A tarefa consiste em erguer um membro da equipe acima de uma altura delimitada por uma corda pelo maior tempo possível.',
        scoreType: 'TIME',
        scoreOrdination: 'BIGGER',
        scoreDescription: 'Tempo que deixará o membro suspenso.',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-07T18:31:45.787Z',
        updatedAt: '2024-06-07T18:31:45.787Z',
      },
      {
        id: 'cf06c16a-46f0-4965-8c92-e573a7a3fc41',
        title: 'Cabo de guerra',
        description:
          'As pessoas selecionadas por cada equipe devem participar de um cabo de guerra.',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'a equipe ganhadora, ganha um numero x de pontos',
        defaultScore: 10,
        numberOfTeams: 2,
        createdAt: '2024-06-08T04:46:35.181Z',
        updatedAt: '2024-06-08T04:46:35.181Z',
      },
      {
        id: '5492f256-be99-45d6-bf61-ba34bfde8db1',
        title: 'Corrida maluca',
        description:
          'É uma corrida com várias atividades durante o trajeto  Lobinho sai até primeira tarefa: abrir cadeado com várias chaves Vai até outra base e troca com o Escoteiro que corre até a próxima atividade e tem que colocar a linha nas agulhas, corre, vai até a outra base.',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'a equipe que fizer mais rapido ganha mais pontos',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T04:47:50.638Z',
        updatedAt: '2024-06-08T04:47:50.638Z',
      },
      {
        id: '4f37d914-c9c4-451b-89f0-2f26220e2682',
        title: 'Torta na cara',
        description:
          'Os participantes vao se posicionar em duas filas, em cada rodada será feita uma pergunta, quem precionar o botao antes temque responder a pergunta corretamente, caso erre, leva uma tortada.',
        scoreType: 'NUMBER',
        scoreOrdination: 'SMALLER',
        scoreDescription:
          'Gravar numero de tortadas de cada equipe, e contabilizar a pontuacao da equipe que levar menos tortadas para a que levar mais',
        defaultScore: null,
        numberOfTeams: 2,
        createdAt: '2024-06-08T04:49:06.500Z',
        updatedAt: '2024-06-08T04:49:06.500Z',
      },
      {
        id: '43e9f06a-be2f-42cd-a57e-2eb300195d26',
        title: 'Desafio da garrafa',
        description:
          'O participante joga a garrafa, se ela cair de pé, avança uma casa no tabuleiro humano, a equipe que chegar primeiro até o final vence.',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'a equipe ganhadora, ganha um numero x de pontos',
        defaultScore: 10,
        numberOfTeams: 0,
        createdAt: '2024-06-08T04:49:53.333Z',
        updatedAt: '2024-06-08T04:49:53.333Z',
      },
      {
        id: 'cb6eb7a3-ab53-4fce-87e3-270e7e33cb3f',
        title: 'Corrida de biga',
        description:
          'Construir uma biga com taquaras, levar um participante até o local determinado e voltar com outro. Quem fizer em menos tempo ganha. Se desmontar, no meio do trajeto, será eliminada.',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'a que chegar primeiro ganha um numero x de pontos',
        defaultScore: 10,
        numberOfTeams: 0,
        createdAt: '2024-06-08T04:51:10.826Z',
        updatedAt: '2024-06-08T04:51:10.826Z',
      },
      {
        id: 'e151f702-9228-49fe-ab69-bf5c953169f6',
        title: 'Tiro ao alvo com zarabatana',
        description:
          'Acertar o alvo e fazer a maior pontuacao possivel, cada participante vai lancar duas vezes o dardo.',
        scoreType: 'NUMBER',
        scoreOrdination: 'BIGGER',
        scoreDescription:
          'somatoria de pontos da equipe, a equipe que fizer mais pontos ganha 10, a segunda 9.....',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T04:52:23.248Z',
        updatedAt: '2024-06-08T04:52:23.248Z',
      },
      {
        id: '032e642e-b254-4abc-b3ef-5cc9210df082',
        title: 'Corrida dos barcos',
        description:
          'A tarefa consiste em chegar até o local delimitado sem pisar no chão. A equipe irá ganhar 2 pedaços de papelão e usando apenas isso precisam chegar do outro lado',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'a equipe ganhadora, ganha um numero x de pontos',
        defaultScore: 10,
        numberOfTeams: 0,
        createdAt: '2024-06-08T05:05:24.828Z',
        updatedAt: '2024-06-08T05:05:24.828Z',
      },
      {
        id: '8f549f9f-83eb-4095-9505-9da9e2a13fc9',
        title: 'Acender uma fogueira com pederneira',
        description:
          'A equipe temque montar o ninho para o fogo com cizal e tentar acender no menor tempo possivel',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription:
          'pontuar conforme o tempo, a equipe que levar menos tempo 20 pontos ...',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T05:06:12.669Z',
        updatedAt: '2024-06-08T05:06:12.669Z',
      },
      {
        id: '1e9aa766-880e-4a7d-bf08-ceab686e9f0a',
        title: 'Corrida com pés amarrados',
        description:
          'Os participantes da equipe ficam todos lado a lado, com os pés encostados amarrados. O objetivo é realizar o persurso no menor tempo possível, caminhando todos juntos.',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription:
          'se for para todas as equipes, a que chegar com o menor tempo ganha x pontos',
        defaultScore: 10,
        numberOfTeams: 0,
        createdAt: '2024-06-08T05:07:08.745Z',
        updatedAt: '2024-06-08T05:07:08.745Z',
      },
      {
        id: '65dcbe58-5f39-45f0-a596-0d6a4bf9e8b0',
        title: 'Chute ao alvo com camera de caminhao',
        description:
          'Devem acertar o chute em uma das camaras penduradas, cada um pode chutar uma bola',
        scoreType: 'NUMBER',
        scoreOrdination: 'BIGGER',
        scoreDescription:
          'somatoria de pontos, que depois sarao convertidos na pontuacao, para nao ser uma base que de muitos pontos, a que tiver a maior pontuacao vair ficar com 10, a segunda 9 ..... ',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T05:08:31.210Z',
        updatedAt: '2024-06-08T05:08:31.210Z',
      },
      {
        id: 'c8696ca1-fa13-4034-90eb-a12555cc3fd3',
        title: 'Balao com copo',
        description:
          'Cada participante vai pegar os copos que estao em uma mesa com uma bechiga de ar e levar até a outra mesa',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'o menor tempo vai ganhar a maior pontuacao',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T05:09:34.434Z',
        updatedAt: '2024-06-08T05:09:34.434Z',
      },
      {
        id: '346436a9-d0e3-40b9-a45d-201096280e2a',
        title: 'Quick pong',
        description:
          'Cada membro da equipe deve faz a bolinha de ping pong quicar na mesa e cair dentro do copo. A equipe que fizer com que todos os membros tenham acertado e acabar primeiro, ganha.',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'a equipe ganhadora, ganha um numero x de pontos',
        defaultScore: 10,
        numberOfTeams: 0,
        createdAt: '2024-06-08T05:10:33.108Z',
        updatedAt: '2024-06-08T05:10:33.108Z',
      },
      {
        id: 'f04f40db-5549-400d-8d1f-e9ff3d693535',
        title: 'Espoja com agua',
        description:
          'Um participante por vez enche a esponja no primeiro balde e leva até a garrafa',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'encher a garrafa no menor tempo',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T05:11:44.172Z',
        updatedAt: '2024-06-08T05:11:44.172Z',
      },
      {
        id: 'c2cc21e4-ee02-44a9-9b21-f877f960fa21',
        title: 'Torre de porca/pouca',
        description:
          'Cada equipe escolhe 1 membro para fazer 3 torres de porcas, a torre deve ser montada utilizando um palito de churrasco e não as mãos. Cada torre deve coner 10 porcas e as 3 torres devem ser montadas uma no lado da outra sem deixare cai-las. Caso caia deve montar novamente a torre.',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'Menor tempo possível.',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T05:12:27.007Z',
        updatedAt: '2024-06-08T05:12:27.007Z',
      },
      {
        id: '8d0bfe25-05d0-498a-9ae0-d2344d80a7e7',
        title: 'Ping sopro',
        description:
          'Terá 5 copos plásticos vazios em cima de uma mesa com uma bolinha de ping pong dentro do primeiro copo. A atividade consiste em cada membro da equipe encher o primeiro copo e com um sopro passar a bolinha de ping pong no próximo copo, dessa forma enche de água o segundo copo, assopra a bolinha até passar para o terceiro copo, assim sucessivamente até chegar ao último copo e assoprar a bolinha para fora.',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'Menor tempo possível.',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T05:13:00.484Z',
        updatedAt: '2024-06-08T05:13:00.484Z',
      },
      {
        id: 'af74bb59-75ff-45ed-9e64-1fed2573a376',
        title: 'Sequencia de dados',
        description:
          'Cada participante vai jogar um dado e tentar montar a sequencia 1, 2, 3... até 6',
        scoreType: 'TIME',
        scoreOrdination: 'SMALLER',
        scoreDescription: 'Menor tempo possível.',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T05:13:37.728Z',
        updatedAt: '2024-06-08T05:13:37.728Z',
      },
      {
        id: 'cd2b090f-197d-4426-b973-1780386cde8c',
        title: 'Testando o Tato',
        description:
          'Uma mesa com diversos objetos nao perfurantes, cobertos por uma toalha, cada membro da equipe vai sentir os objetos com as maos, apos isso os membros se reunem por 30 segundos para discutir quais objetos eles acham que tem em baixo da toalha.',
        scoreType: 'NUMBER',
        scoreOrdination: 'BIGGER',
        scoreDescription:
          'numero de objetos achados, ganha 10 pontos, o segundo 9....',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T05:14:14.555Z',
        updatedAt: '2024-06-08T05:14:14.555Z',
      },
      {
        id: 'bf8fae0e-3be1-43cf-a6b5-325dc70f6eee',
        title: 'Aeromodelismo',
        description:
          'Cada um da equipe vai montar um aviao de papel e vao ser lancados em uma pista demarcada com bamboos, conforme a linha que o aviao passar vai somando a pontuacao.',
        scoreType: 'NUMBER',
        scoreOrdination: 'BIGGER',
        scoreDescription:
          'somatoria dos pontos alcancados pelos avioes, conforme a ordem de maior para menor de potos será gerado os pontos, 10, 9 ....',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T05:15:02.960Z',
        updatedAt: '2024-06-08T05:15:02.960Z',
      },
      {
        id: '0c9e4406-574a-4115-b238-e5c6582f5680',
        title: 'Show do milhão',
        description:
          'Perguntas de conhecimentos gerais, em todas as áreas. Cada equipe escolhe um participante para respnder as perguntas. A equipe que tiver mais perguntas respondidas corretamente, ganha.',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription: 'a equipe ganhadora, ganha um numero x de pontos',
        defaultScore: 10,
        numberOfTeams: 0,
        createdAt: '2024-06-08T05:16:05.189Z',
        updatedAt: '2024-06-08T05:16:05.189Z',
      },
      {
        id: '44dc8fd7-b13a-4c60-9d5a-610b5fc923ce',
        title: 'Distancia entre dois pontos',
        description: 'Cada equipe chuta a distancia entre dois cones',
        scoreType: 'DISTANCE',
        scoreOrdination: 'CLOSER',
        scoreDescription:
          'Distancia mais aproximada, a equipe chegmar mais proximo ganha 10, a segunda 9 ....',
        defaultScore: null,
        numberOfTeams: 0,
        createdAt: '2024-06-08T05:17:24.147Z',
        updatedAt: '2024-06-08T05:17:24.147Z',
      },
      {
        id: '4a66882d-df7c-405b-8b42-512116143da3',
        title: 'Corrida do saco de batata',
        description:
          'Cada equipe escolhe 1 membro para participar da corrida do saco. Vence a equipe que ir e voltar primeiro ',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription:
          'Primeiro a chegar no local de ínicio ganha x de pontos',
        defaultScore: 10,
        numberOfTeams: 0,
        createdAt: '2024-06-08T05:18:14.498Z',
        updatedAt: '2024-06-08T05:18:14.498Z',
      },
      {
        id: 'c54919a6-2e8f-4ec1-b753-2c481e7d0672',
        title: 'O assogueiro',
        description:
          'A equipe que separar 1,5 kg mais proximo, a equipe temque separar 1,5kg em um balde, de um monte de areia, a quipe que chegar com o peso mais proximo vai ter a maior pontuação',
        scoreType: 'WEIGHT',
        scoreOrdination: 'CLOSER',
        scoreDescription: 'peso mais proximo',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T05:18:54.584Z',
        updatedAt: '2024-06-08T05:18:54.584Z',
      },
      {
        id: 'a4e66dbe-f2f8-4b49-b700-705491f654f8',
        title: 'Precos dos objetos',
        description:
          'A equipe temque colocar os precos nos obejtos, pontua quem acertar os precos mais proximos',
        scoreType: 'NUMBER',
        scoreOrdination: 'NONE',
        scoreDescription:
          'preço mais proximopontua quem colocar os precos mais proximos de cada produto ganha mais ponto',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T05:20:30.983Z',
        updatedAt: '2024-06-08T05:20:30.983Z',
      },
      {
        id: 'a9d986b8-626c-40a2-b17a-db5ddfd44939',
        title: 'Telefone sem fio',
        description:
          'Escolha 5 membros da equipe para formar uma equipe indiana. Nas costas de cada membro terá uma folha sulfite em branco, onde o membro que estive no fim da fila começa desenhando e os outros apenas sentindo devem tentar desenhar o mesmo desenho nas costas da pessoa dasua frente. Vence a equipe que tiver o desenho mais parecido com o original.',
        scoreType: 'POINTS',
        scoreOrdination: 'NONE',
        scoreDescription:
          'O desenho que ficar mais parecido com o original, o avalhador da uma nota de 0 a 10 conforme a igualdade, pontua os que ficarem acima de 5, ou esse vai ser o valor x de pontos',
        defaultScore: null,
        numberOfTeams: 1,
        createdAt: '2024-06-08T05:21:23.550Z',
        updatedAt: '2024-06-08T05:21:23.550Z',
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
