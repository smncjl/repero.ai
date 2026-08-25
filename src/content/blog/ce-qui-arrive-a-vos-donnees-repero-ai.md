---
title: "Ce qui arrive à vos données quand vous les confiez à Repero AI"
description: "Comment Repero AI protège les documents et les données confiés à la plateforme : chiffrement, compartimentation, gestion des clés, sauvegardes et exploitation contrôlée."
pubDate: 2026-08-25
author: "Cédric Simon"
category: "Sécurité"
image: "/blog/repero-ai-securite-donnees.png"
tags:
  - "sécurité"
  - "chiffrement"
  - "confidentialité"
  - "données"
  - "workspaces"
lang: "fr"
draft: false
---

![Illustration : des documents protégés dans une plateforme Repero AI sécurisée.](/blog/repero-ai-securite-donnees.png)

Confier un document à un assistant d’intelligence artificielle est devenu presque banal.

Un PDF. Un contrat. Des notes de réunion. Un document de travail. Une conversation avec des informations personnelles ou professionnelles.

On envoie le fichier, on pose une question, et quelques secondes plus tard, on obtient une réponse.

Mais entre les deux, il se passe beaucoup de choses.

Et surtout, une question reste souvent sans réponse : **qu’est-ce qui arrive réellement à ces informations une fois qu’elles entrent dans la plateforme ?**

Chez Repero AI, je ne pense pas que la bonne réponse soit simplement : « faites-moi confiance ».

La sécurité n’est jamais absolue. Aucun système sérieux ne devrait prétendre le contraire.

En revanche, on peut expliquer les principes utilisés, les risques que l’on cherche à limiter et les choix faits pour protéger les informations confiées à la plateforme.

C’est ce que je vais faire ici.

## Le principe de départ : limiter les dégâts si quelque chose se passe mal

La sécurité ne consiste pas seulement à essayer d’empêcher toute intrusion.

Il faut aussi partir du principe qu’un composant peut un jour être compromis, mal configuré ou exposé par erreur. Dans ce cas, la question devient : **qu’est-ce qu’un accès à ce composant permet réellement de voir ou de faire ?**

C’est pour cette raison que Repero AI sépare autant que possible plusieurs éléments :

- les données ;
- les clés qui permettent de les déchiffrer ;
- les secrets utilisés par les services ;
- les différents workspaces ;
- les composants exposés à Internet et ceux qui restent internes.

L’objectif est assez simple : éviter qu’un seul accès donne automatiquement accès à tout le reste.

Ce n’est pas une garantie magique. C’est une manière de réduire l’impact potentiel d’un problème.

## Les documents sont chiffrés

Les documents déposés dans Repero AI sont chiffrés avant d’être stockés de manière persistante.

Le stockage lui-même n’est donc pas considéré comme une protection suffisante. Autrement dit, si quelqu’un accède au stockage, cela ne devrait pas lui permettre de lire directement les documents qui s’y trouvent.

Le chiffrement est effectué au niveau de l’application, avant l’envoi des données vers leur stockage définitif. C’est un choix important : le stockage conserve les données, mais il ne devrait pas avoir besoin de comprendre leur contenu.

## Chaque workspace possède son propre contexte

Repero AI est organisé autour de workspaces. Cette séparation ne sert pas uniquement à organiser les projets dans l’interface. Elle intervient aussi dans la manière dont les données sont protégées.

Chaque workspace possède son propre contexte cryptographique. L’idée est d’éviter de dépendre d’une seule clé globale utilisée directement pour tous les documents de la plateforme.

On cherche plutôt à compartimenter les données. Si un problème touche un workspace, il ne doit pas automatiquement ouvrir l’accès aux autres.

Là encore, ce n’est pas une promesse d’invulnérabilité. C’est une façon de faire en sorte qu’un problème reste, autant que possible, limité à son périmètre.

## Une couche supplémentaire peut être contrôlée par l’utilisateur

Repero AI prévoit également un mécanisme optionnel permettant de renforcer la protection d’un workspace avec un secret fourni par l’utilisateur.

L’idée est d’ajouter une barrière cryptographique supplémentaire à la protection gérée par la plateforme. Le workspace nécessite alors ce contexte utilisateur avant que certaines données puissent être utilisées.

C’est une approche intéressante parce qu’elle donne davantage de contrôle à l’utilisateur. Mais elle implique aussi une responsabilité supplémentaire.

Plus une partie de la protection dépend d’une clé contrôlée par l’utilisateur, plus il faut prendre au sérieux les questions de récupération, de perte et de gestion de cette clé.

La confidentialité ne consiste pas seulement à ajouter une protection. Il faut aussi s’assurer que cette protection reste utilisable dans les situations réelles.

## Les clés ne sont pas stockées à côté des données

Chiffrer des données n’a pas beaucoup de sens si la clé permettant de les lire se trouve juste à côté.

Repero AI sépare donc les données chiffrées des mécanismes utilisés pour gérer leurs clés. Les clés qui protègent les données des workspaces sont elles-mêmes protégées avant d’être persistées.

Les secrets techniques de la plateforme — par exemple ceux nécessaires pour communiquer avec différents fournisseurs — sont également progressivement déplacés vers des services dédiés de gestion de secrets.

L’objectif est de réduire la quantité d’informations sensibles présentes directement dans les configurations applicatives ou sur les serveurs.

Ce n’est pas forcément la partie la plus visible du produit. Mais c’est le genre de détail qui compte lorsqu’on essaie de construire quelque chose de sérieux.

## Le stockage n’a pas besoin de connaître vos clés

Les documents peuvent être stockés sur un stockage objet externe. Mais ce stockage reçoit des données déjà chiffrées.

Le fournisseur de stockage n’a donc pas besoin de connaître les clés permettant de déchiffrer les documents pour faire son travail. C’est une distinction importante.

Le stockage sert à conserver les données. Il ne devrait pas être responsable de décider qui peut les lire.

## Les sauvegardes font aussi partie du problème

Protéger les données actives tout en laissant leurs sauvegardes sans protection serait évidemment incohérent.

Les bases de données de Repero AI disposent donc également d’un mécanisme de sauvegarde chiffré vers du stockage externe. Mais une sauvegarde n’a de valeur que si elle peut être restaurée.

C’est un point qui paraît évident, mais qui est parfois oublié. Les procédures de restauration font donc elles aussi partie du travail de sécurité et d’exploitation de la plateforme.

Une sauvegarde inutilisable n’est pas vraiment une sauvegarde.

## Tout n’a pas besoin d’être accessible depuis Internet

Un autre principe important consiste à limiter la surface d’exposition.

Les utilisateurs doivent pouvoir accéder à l’application et aux services nécessaires à son fonctionnement. Mais cela ne veut pas dire que tous les composants techniques doivent être directement accessibles depuis Internet.

Les bases de données, les services internes, les orchestrateurs et les autres briques d’infrastructure doivent autant que possible rester dans le réseau interne de la plateforme.

Les points d’entrée publics sont donc volontairement limités. Moins il y a de portes exposées, moins il y a de portes à surveiller.

## Les changements en production sont contrôlés

La sécurité ne dépend pas uniquement du chiffrement.

Une plateforme peut avoir de bonnes protections cryptographiques et devenir vulnérable à cause d’un mauvais déploiement, d’une configuration incorrecte ou d’une modification faite trop rapidement.

Repero AI utilise aujourd’hui un processus de déploiement déclaratif. L’état attendu de la plateforme est décrit dans son infrastructure, et les changements passent par le contrôle de version avant d’être appliqués.

Cela permet notamment :

- de conserver un historique des changements ;
- de comparer l’état attendu avec l’état réellement déployé ;
- de réduire les modifications manuelles directement en production ;
- de faciliter les retours en arrière lorsqu’ils sont nécessaires.

Ce n’est pas spectaculaire. Mais pouvoir comprendre ce qui a changé, quand et pourquoi est extrêmement utile lorsqu’un problème apparaît.

## Observer fait aussi partie de la sécurité

Empêcher un problème est évidemment préférable. Le détecter rapidement lorsqu’il apparaît est indispensable.

Repero AI dispose donc de mécanismes d’observabilité permettant de suivre les erreurs applicatives, les services et progressivement l’état général de l’infrastructure.

Cette partie doit encore évoluer. Aujourd’hui, il est déjà possible de détecter certaines pannes et certains problèmes. L’objectif est d’aller plus loin : identifier aussi des signes avant-coureurs, avant qu’ils ne deviennent visibles pour les utilisateurs.

## Ce que je ne publierai pas ici

La transparence a une limite.

Expliquer les principes de sécurité d’une plateforme est utile. Publier sa topologie réseau complète, les noms de ses secrets, ses procédures opérationnelles détaillées, ses règles de filtrage ou les mécanismes précis permettant d’accéder à ses clés ne l’est pas.

Je veux donc rendre le modèle de sécurité de Repero AI compréhensible sans transformer cette transparence en mode d’emploi utilisable contre la plateforme.

Il faut expliquer suffisamment pour que les choix soient compréhensibles, mais pas au point de publier les informations qui permettraient de contourner ces protections.

## La sécurité n’est pas « terminée »

C’est probablement le point le plus important de cet article.

**La sécurité de Repero AI n’est pas terminée.** Et elle ne le sera probablement jamais.

Parmi les sujets qui continueront à évoluer figurent notamment :

- le renforcement de la gestion des clés cryptographiques ;
- la rotation automatisée de certains secrets et de certaines clés ;
- l’amélioration de la surveillance et des alertes ;
- le durcissement continu des différents composants de la plateforme ;
- les tests réguliers de restauration ;
- les procédures de gestion d’incident ;
- et, à terme, des audits de sécurité externes.

Chaque nouvelle fonctionnalité et chaque évolution de l’infrastructure devront également être évaluées sous cet angle.

La sécurité n’est pas une case que l’on coche une fois. C’est une contrainte qui doit accompagner le produit à mesure qu’il grandit.

## Pourquoi parler de tout cela ?

Parce qu’une grande partie de l’intelligence artificielle repose aujourd’hui sur une contradiction assez étrange.

Nous confions de plus en plus d’informations à ces outils, mais nous savons souvent très peu de choses sur ce qui se passe derrière l’interface.

Repero AI ne pourra pas supprimer complètement cette nécessité de faire confiance à un service en ligne. Aucun service ne le peut vraiment.

Mais je peux essayer de faire mieux qu’une simple promesse.

**Expliquer les principes. Réduire les risques. Compartimenter. Chiffrer. Observer. Et continuer à améliorer le système.**

Les dernières semaines ont été largement consacrées à ces fondations. Elles ne produisent pas forcément de nouvelles fonctionnalités visibles. Elles ne donnent pas toujours quelque chose à montrer dans une capture d’écran.

Mais elles permettent maintenant de poser une question beaucoup plus intéressante : **qu’allez-vous confier à Repero AI ?**
