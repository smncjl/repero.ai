export interface ProductScreen {
  id:
    | 'artifacts'
    | 'active-context'
    | 'search-context'
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
      'Les contenus générés restent reliés à la conversation, aux sources et au projet concerné.',
    image: '/product/fr/artifacts.png',
    alt: "Capture d’écran de Repero AI montrant un artefact ouvert à côté de la liste des artefacts dans la conversation.",
    pageHeading: 'Conserver les sorties générées sans perdre leur origine',
    pageBody: [
      'Dans Repero AI, un artefact ne devient pas un fichier isolé oublié après la conversation.',
      'Il reste rattaché au fil de travail, ce qui facilite la reprise, la vérification et la réutilisation.'
    ]
  },
  {
    id: 'active-context',
    title: 'Gardez le contexte actif sous les yeux',
    description:
      'Documents, web et artefacts restent visibles dans le même espace de travail.',
    image: '/product/fr/active-context.png',
    alt: "Capture d’écran de Repero AI montrant le panneau de contexte actif avec les sections sources et artefacts.",
    pageHeading: 'Garder le contexte actif sous la main',
    pageBody: [
      'Le contexte utile ne doit pas disparaître au fil de la conversation.',
      'Le panneau de contexte actif rend visibles les éléments qui nourrissent le travail en cours.'
    ]
  },
  {
    id: 'search-context',
    title: 'Retrouvez vite une conversation ou une décision',
    description:
      'La recherche de contexte aide à rouvrir le bon fil sans repartir de zéro.',
    image: '/product/fr/search-context.png',
    alt: "Capture d’écran de Repero AI montrant la recherche de contexte avec les sections contexte actif et sources visibles.",
    pageHeading: 'Reprendre une conversation ou une décision plus tard',
    pageBody: [
      'La recherche sert à retrouver le bon point d’entrée dans le travail déjà fait.',
      'Au lieu de reconstruire la mémoire manuellement, vous repartez du contexte déjà conservé.'
    ]
  },
  {
    id: 'sources-documents',
    title: 'Visualisez sources et documents au même endroit',
    description:
      'Les contenus importés et les sources web indexées restent attachés au travail.',
    image: '/product/fr/sources-documents.png',
    alt: "Capture d’écran de Repero AI montrant les sources web et les documents dans le même panneau sources.",
    pageHeading: 'Retrouver documents, web et artefacts',
    pageBody: [
      'Les documents importés et les sources web ne doivent pas vivre dans des outils séparés.',
      'Repero AI les garde dans la même structure que les conversations et les artefacts.'
    ]
  },
  {
    id: 'projects-conversations',
    title: 'Organisez le travail par projet et conversation',
    description:
      'Les projets et les conversations récentes restent visibles dans la même navigation.',
    image: '/product/fr/projects-conversations.png',
    alt: "Capture d’écran de Repero AI montrant les projets et la liste des conversations récentes dans la navigation latérale.",
    pageHeading: 'Centraliser le travail dans un projet',
    pageBody: [
      'Le projet sert de contenant stable pour ce qui compte vraiment.',
      'Vous ne gérez plus une suite de chats isolés, mais un espace de travail organisé.'
    ]
  }
];
