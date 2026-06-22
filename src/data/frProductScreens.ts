export interface ProductScreen {
  id:
    | 'artifacts'
    | 'active-context'
    | 'search'
    | 'sources-documents'
    | 'projects-conversations';
  title: string;
  description: string;
  image: string;
  alt: string;
  pageHeading: string;
  pageBody: string[];
}

export const frProductScreens: ProductScreen[] = [
  {
    id: 'artifacts',
    title: 'Retrouvez vos artefacts sans perdre le contexte',
    description:
      'Les contenus generes restent relies a la conversation, aux sources et au projet concerne.',
    image: '/product/fr/artifacts.png',
    alt: "Capture d ecran de Repero AI montrant la liste des artefacts et un artefact ouvert dans la conversation.",
    pageHeading: 'Conserver les sorties generees sans perdre leur origine',
    pageBody: [
      'Dans Repero AI, un artefact ne devient pas un fichier isole oublie apres la conversation.',
      'Il reste rattache au fil de travail, ce qui facilite la reprise, la verification et la reutilisation.'
    ]
  },
  {
    id: 'active-context',
    title: 'Gardez le contexte actif sous les yeux',
    description:
      'Documents, web et artefacts restent visibles dans le meme espace de travail.',
    image: '/product/fr/active-context.png',
    alt: "Capture d ecran de Repero AI montrant le contexte actif avec documents, web et artefacts.",
    pageHeading: 'Garder le contexte actif sous la main',
    pageBody: [
      'Le contexte utile ne doit pas disparaitre au fil de la conversation.',
      'Le panneau de contexte actif rend visibles les elements qui nourrissent le travail en cours.'
    ]
  },
  {
    id: 'search',
    title: 'Retrouvez vite une conversation ou une decision',
    description:
      'La recherche de contexte aide a rouvrir le bon fil sans repartir de zero.',
    image: '/product/fr/search-context.png',
    alt: "Capture d ecran de Repero AI montrant la recherche de contexte et les sources attachees.",
    pageHeading: 'Reprendre une conversation ou une decision plus tard',
    pageBody: [
      'La recherche sert a retrouver le bon point d entree dans le travail deja fait.',
      'Au lieu de reconstruire la memoire manuellement, vous repartez du contexte deja conserve.'
    ]
  },
  {
    id: 'sources-documents',
    title: 'Visualisez sources et documents au meme endroit',
    description:
      'Les contenus importes et les sources web indexees restent attaches au travail.',
    image: '/product/fr/sources-documents.png',
    alt: "Capture d ecran de Repero AI montrant les sources web et les documents indexes dans le meme panneau.",
    pageHeading: 'Retrouver documents, web et artefacts',
    pageBody: [
      'Les documents importes et les sources web ne doivent pas vivre dans des outils separes.',
      'Repero AI les garde dans la meme structure que les conversations et les artefacts.'
    ]
  },
  {
    id: 'projects-conversations',
    title: 'Organisez le travail par projet et conversation',
    description:
      'La structure du workspace rend l historique plus simple a parcourir.',
    image: '/product/fr/projects-conversations.png',
    alt: "Capture d ecran de Repero AI montrant les projets et les conversations dans la navigation laterale.",
    pageHeading: 'Centraliser le travail dans un projet',
    pageBody: [
      'Le projet sert de contenant stable pour ce qui compte vraiment.',
      'Vous ne gerez plus une suite de chats isoles, mais un espace de travail organise.'
    ]
  }
];
