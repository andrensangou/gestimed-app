# 📋 GUIDE UTILISATEUR GESTIMED
**Version 2.0 - Guide Complet d'Utilisation**

---

## TABLE DES MATIÈRES

1. INTRODUCTION
2. PREMIERS PAS
3. INTERFACE PRINCIPALE
4. GESTION DES MÉDICAMENTS
5. MODE FAMILLE
6. RAPPELS ET NOTIFICATIONS
7. STATISTIQUES ET SUIVI
8. ASSISTANT CONVERSATIONNEL
9. PARAMÈTRES ET CONFIGURATION
10. DÉPANNAGE ET SUPPORT
11. QUESTIONS FRÉQUENTES

---

## 1. INTRODUCTION

### 1.1 Présentation de GestiMed

Bienvenue dans **GestiMed**, votre assistant personnel intelligent pour la gestion complète des médicaments familiaux. Cette application web moderne vous accompagne dans :

✅ **Suivi personnalisé** de vos médicaments et de votre stock
✅ **Rappels automatiques** pour les prises de médicaments
✅ **Historique détaillé** de votre consommation
✅ **Alertes intelligentes** pour les stocks faibles
✅ **Gestion familiale** multi-utilisateurs
✅ **Statistiques d'observance** thérapeutique

### 1.2 Objectifs du guide

Ce guide complet vous expliquera étape par étape comment utiliser toutes les fonctionnalités avancées de GestiMed pour optimiser la gestion de vos traitements médicaux et ceux de votre famille.

---

## 2. PREMIERS PAS

### 2.1 Accès à l'application

**Étapes d'accès :**
1. Ouvrez votre navigateur web préféré
2. Saisissez l'URL de GestiMed
3. L'application se charge automatiquement

> **💡 Note :** En mode développement, utilisez http://localhost:8000

### 2.2 Configuration initiale

**Première utilisation :**
- GestiMed crée automatiquement un profil utilisateur unique
- Vos données sont stockées localement sur votre appareil
- Sauvegarde automatique quotidienne activée
- Aucune inscription requise

### 2.3 Compatibilité

**Navigateurs supportés :**
- Chrome (recommandé)
- Firefox
- Safari
- Edge

---

## 3. INTERFACE PRINCIPALE

### 3.1 Vue d'ensemble

L'interface GestiMed est organisée en **trois zones principales** pour une navigation optimale :

### 3.2 Barre latérale gauche

**Fonctionnalités :**
- 📋 **Liste des médicaments** : Affichage de tous vos traitements
- ➕ **Bouton d'ajout** : Création de nouveaux médicaments
- 👥 **Organisation familiale** : Regroupement par membre

### 3.3 Zone centrale

**Composants :**
- 💬 **Chat assistant** : Interface conversationnelle intelligente
- ⌨️ **Zone de saisie** : Communication avec l'assistant
- 📊 **Boutons d'action** : Accès rapide aux fonctionnalités

### 3.4 Timeline droite

**Informations affichées :**
- ⏰ **Prochains rappels** : 5 prochaines prises programmées
- 🚨 **Indicateurs d'urgence** : Code couleur selon l'imminence
- 📅 **Planning quotidien** : Vue d'ensemble des prises

---

## 4. GESTION DES MÉDICAMENTS

### 4.1 Ajouter un nouveau médicament

**Procédure détaillée :**

1. **Accès au formulaire**
   - Cliquez sur "➕ Ajouter un médicament"
   - Le formulaire s'ouvre automatiquement

2. **Informations obligatoires**
   - **Nom** : Dénomination du médicament
   - **Dosage** : Quantité par prise (ex: "500mg", "1 comprimé")
   - **Forme** : Comprimé, gélule, sirop, injection, etc.
   - **Stock initial** : Quantité disponible
   - **Seuil d'alerte** : Niveau déclenchant une alerte

3. **Configuration familiale**
   - **Membre de la famille** : Attribution du traitement
   - Options : Moi-même, Conjoint(e), Enfant 1/2, Parent, Autre

4. **Programmation des prises**
   - **Fréquence** : Nombre de prises quotidiennes
   - **Heures de prise** : Horaires précis pour chaque prise
   - **Récurrence** : Quotidien, hebdomadaire, selon besoin

5. **Informations complémentaires**
   - **Notes** : Instructions spéciales, effets secondaires
   - **Médecin prescripteur** : Référence médicale

### 4.2 Visualisation des médicaments

**Carte médicament - Informations affichées :**

📊 **En-tête**
- Nom et dosage du médicament
- Icône du membre de la famille
- Badge de forme pharmaceutique

⏰ **Prochaine prise**
- Heure programmée
- Temps restant
- Statut (en attente, en retard)

📈 **Niveau de stock**
- Barre de progression visuelle
- Quantité restante
- Durée estimée restante

🚨 **Alertes**
- Badge orange : Stock faible
- Badge rouge : Stock critique
- Badge bleu : Stock normal

🎯 **Actions rapides**
- "✅ J'ai pris" : Enregistrement de prise
- "✏️ Modifier" : Édition du médicament

### 4.3 Enregistrer une prise

**Méthodes d'enregistrement :**

**Méthode 1 - Bouton direct :**
1. Cliquez sur "✅ J'ai pris" sur la carte
2. Confirmation automatique
3. Mise à jour du stock
4. Calcul du prochain rappel

**Méthode 2 - Assistant vocal :**
1. Dites "J'ai pris [nom du médicament]"
2. Confirmation par l'assistant
3. Enregistrement automatique

### 4.4 Gestion du stock

**Fonctionnement automatique :**
- ⬇️ **Décrément automatique** à chaque prise
- 🔔 **Alerte seuil** : Notification au niveau défini
- 🚨 **Alerte critique** : Stock < 50% du seuil
- 📊 **Prévision** : Estimation de la durée restante

---

## 5. MODE FAMILLE

### 5.1 Présentation du mode famille

GestiMed offre une **gestion familiale complète** permettant de suivre les traitements de tous les membres de votre foyer avec une organisation claire et personnalisée.

### 5.2 Configuration des membres

**Membres disponibles :**

👤 **Moi-même** (Utilisateur principal)
- Profil par défaut
- Accès complet à toutes les fonctionnalités

👫 **Conjoint(e)**
- Gestion des traitements du partenaire
- Rappels personnalisés

👶 **Enfant 1 / Enfant 2**
- Suivi pédiatrique
- Dosages adaptés
- Horaires scolaires

👴 **Parent**
- Gestion des traitements seniors
- Suivi renforcé

👥 **Autre**
- Membre personnalisable
- Flexibilité maximale

### 5.3 Organisation par famille

**Affichage structuré :**

📋 **Liste principale**
- Médicaments de l'utilisateur principal en premier
- Sections dédiées par membre de la famille
- En-têtes visuels avec icônes

🏷️ **Identification visuelle**
- Icône utilisateur spécifique
- Code couleur par membre
- Badge nominatif

### 5.4 Rappels personnalisés

**Notifications adaptées :**

📱 **Messages personnalisés**
- "Il est temps de prendre votre [médicament]"
- "Rappel pour [membre] : [médicament]"
- "[Enfant] doit prendre son [médicament]"

⏰ **Timeline familiale**
- Affichage du membre concerné
- Priorité selon l'urgence
- Regroupement par famille

### 5.5 Historique et suivi individualisé

**Enregistrement détaillé :**

📊 **Données par membre :**
- Identification du membre
- Horodatage précis
- Médicament et dosage
- Observance individuelle

📈 **Statistiques familiales :**
- Taux d'observance par membre
- Comparaison familiale
- Tendances individuelles

---

## 6. RAPPELS ET NOTIFICATIONS

### 6.1 Système de rappels automatiques

**Fonctionnement :**
- 🔄 **Vérification** : Contrôle toutes les 60 secondes
- 📢 **Notification** : Alerte à l'heure programmée
- 🎯 **Précision** : Rappel au moment exact

### 6.2 Types de notifications

**Catégories d'alertes :**

💊 **Rappel de prise**
- Notification à l'heure programmée
- Identification du médicament
- Membre de la famille concerné

📦 **Alerte de stock**
- Stock faible (seuil atteint)
- Stock critique (< 50% seuil)
- Suggestion de renouvellement

⚠️ **Alertes spéciales**
- Interaction médicamenteuse
- Prise manquée
- Rappel urgent

### 6.3 Réponses aux rappels

**Options disponibles :**

✅ **"J'ai pris"**
- Enregistrement de la prise
- Décrément du stock
- Calcul du prochain rappel

⏰ **"Rappeler dans 15min"**
- Report temporaire
- Nouvelle notification programmée
- Maintien du planning

❌ **"Fermer"**
- Fermeture sans action
- Pas d'enregistrement
- Rappel suivant maintenu

### 6.4 Timeline des rappels

**Affichage prioritaire :**

🔴 **Rouge - Urgent**
- Rappel dans moins d'1 heure
- Priorité maximale
- Clignotement d'alerte

🟠 **Orange - Proche**
- Rappel dans moins de 3 heures
- Attention requise
- Affichage proéminent

🔵 **Bleu - Programmé**
- Rappel plus tardif
- Information préventive
- Affichage standard

---

## 7. STATISTIQUES ET SUIVI

### 7.1 Présentation du module statistiques

GestiMed propose un **système d'analyse avancé** pour suivre l'observance thérapeutique avec des métriques détaillées et des visualisations claires.

### 7.2 Accès aux statistiques

**Procédure :**
1. Cliquez sur le bouton "📊 Statistiques"
2. Ouverture de la fenêtre modale
3. Chargement des données des 30 derniers jours
4. Affichage automatique des résultats

### 7.3 Statistiques globales

**Métriques principales :**

📈 **Observance globale**
- Pourcentage de prises effectuées
- Calcul sur tous les médicaments
- Tendance sur 30 jours

✅ **Prises effectuées**
- Nombre total de prises enregistrées
- Répartition par médicament
- Évolution quotidienne

❌ **Prises manquées**
- Nombre de prises non effectuées
- Impact sur l'observance
- Analyse des causes

### 7.4 Statistiques par membre de la famille

**Organisation familiale :**

👥 **Sections dédiées**
- En-tête par membre de la famille
- Statistiques individualisées
- Comparaison inter-familiale

📊 **Médicaments individuels**
- Détail par traitement
- Observance spécifique
- Tendances personnelles

### 7.5 Codes couleur d'observance

**Système de notation :**

🟢 **Vert - Excellente (≥ 80%)**
- Observance optimale
- Traitement bien suivi
- Félicitations

🟠 **Orange - Attention (60-79%)**
- Observance correcte
- Amélioration possible
- Surveillance recommandée

🔴 **Rouge - Préoccupante (< 60%)**
- Observance insuffisante
- Attention médicale requise
- Plan d'amélioration nécessaire

### 7.6 Détails par médicament

**Informations affichées :**

📊 **Taux d'observance**
- Pourcentage de prises effectuées
- Calcul précis sur la période
- Badge coloré selon le niveau

📈 **Ratio prises effectuées/attendues**
- Nombre de prises réalisées
- Nombre de prises programmées
- Écart et analyse

❌ **Prises manquées**
- Nombre absolu
- Répartition temporelle
- Impact sur l'efficacité

📊 **Barre de progression**
- Visualisation graphique
- Progression en temps réel
- Objectif d'observance

### 7.7 Interprétation des résultats

**Guide d'analyse :**

🎯 **Observance ≥ 80%**
- ✅ Excellent suivi du traitement
- ✅ Efficacité thérapeutique optimale
- ✅ Maintenir les bonnes habitudes

⚠️ **Observance 60-79%**
- 📋 Suivi correct mais perfectible
- 📋 Identifier les causes d'oubli
- 📋 Optimiser les rappels

🚨 **Observance < 60%**
- ❗ Attention médicale requise
- ❗ Risque d'inefficacité thérapeutique
- ❗ Plan d'amélioration urgent

---

## 8. ASSISTANT CONVERSATIONNEL

### 8.1 Présentation de l'assistant

L'**assistant conversationnel intelligent** de GestiMed vous permet d'interagir naturellement avec l'application par messages texte pour une gestion simplifiée.

### 8.2 Commandes principales

**Actions disponibles :**

➕ **Ajouter un médicament**
- Commande : "Ajouter un médicament"
- Lance le formulaire d'ajout
- Guide étape par étape

📦 **Vérifier le stock**
- Commande : "Vérifier le stock"
- Affiche l'état de tous les stocks
- Alertes automatiques

⏰ **Voir les rappels**
- Commande : "Voir les rappels"
- Liste des prochains rappels
- Planning détaillé

❓ **Aide**
- Commande : "Aide"
- Liste des commandes disponibles
- Guide d'utilisation

### 8.3 Exemples d'utilisation

**Interactions naturelles :**

💬 **Vérification de stock :**
- "Combien me reste-t-il de Doliprane ?"
- "Stock de mes médicaments"
- "Quels médicaments sont bientôt épuisés ?"

⏰ **Consultation des rappels :**
- "Quand est ma prochaine prise ?"
- "Rappels du jour"
- "Planning de demain"

✅ **Enregistrement de prise :**
- "J'ai pris mon Aspirin"
- "Prise effectuée pour [médicament]"
- "Marquer comme pris"

➕ **Ajout de médicament :**
- "Ajouter un nouveau médicament"
- "Nouveau traitement"
- "Créer un médicament"

### 8.4 Conseils d'utilisation

**Bonnes pratiques :**

📝 **Formulation claire**
- Utilisez des phrases simples
- Mentionnez le nom exact du médicament
- Soyez précis dans vos demandes

🎯 **Commandes efficaces**
- Utilisez les mots-clés principaux
- Évitez les formulations trop complexes
- Une action par message

---

## 9. PARAMÈTRES ET CONFIGURATION

### 9.1 Accès aux paramètres

**Navigation :**
1. Cliquez sur l'icône ⚙️ "Paramètres"
2. Menu de configuration s'ouvre
3. Sélectionnez l'option souhaitée

### 9.2 Gestion des notifications

**Configuration des alertes :**

🔔 **Activation/Désactivation**
- Bouton de basculement
- Application immédiate
- Sauvegarde automatique

📱 **Permissions navigateur**
- Autorisation requise
- Configuration système
- Test de fonctionnement

⏰ **Personnalisation**
- Délai de rappel
- Son de notification
- Fréquence des alertes

### 9.3 Interface et apparence

**Mode d'affichage :**

🌙 **Mode sombre**
- Activation/désactivation
- Confort visuel nocturne
- Économie d'énergie

🌞 **Mode clair**
- Affichage standard
- Visibilité optimale
- Mode par défaut

🎨 **Personnalisation**
- Taille de police
- Contraste
- Couleurs d'interface

### 9.4 Sauvegarde et synchronisation

**Gestion des données :**

💾 **Sauvegarde locale**
- Stockage automatique
- Sauvegarde quotidienne
- Protection des données

📤 **Export des données**
- Format JSON
- Sauvegarde manuelle
- Portabilité des données

📥 **Import des données**
- Restauration de sauvegarde
- Migration d'appareil
- Récupération d'urgence

---

## 10. DÉPANNAGE ET SUPPORT

### 10.1 Problèmes courants et solutions

**Diagnostic et résolution :**

#### 10.1.1 Les rappels ne s'affichent pas

**Causes possibles :**
- ❌ Notifications désactivées dans les paramètres
- ❌ Permissions navigateur refusées
- ❌ Heures de prise mal configurées

**Solutions :**
1. ✅ Vérifiez les paramètres de notification
2. ✅ Autorisez les notifications dans le navigateur
3. ✅ Contrôlez la configuration des heures
4. ✅ Redémarrez l'application

#### 10.1.2 Les données ne sont pas sauvegardées

**Causes possibles :**
- ❌ Mode navigation privée activé
- ❌ Stockage local désactivé
- ❌ Espace de stockage insuffisant

**Solutions :**
1. ✅ Désactivez le mode navigation privée
2. ✅ Activez le stockage local
3. ✅ Libérez de l'espace disque
4. ✅ Vérifiez les paramètres du navigateur

#### 10.1.3 L'application ne se charge pas

**Causes possibles :**
- ❌ Connexion internet instable
- ❌ Cache navigateur corrompu
- ❌ JavaScript désactivé

**Solutions :**
1. ✅ Vérifiez votre connexion internet
2. ✅ Videz le cache du navigateur
3. ✅ Activez JavaScript
4. ✅ Actualisez la page (F5)

### 10.2 Réinitialisation des données

**Procédure d'urgence :**

⚠️ **Attention : Cette action est irréversible**

**Étapes :**
1. Ouvrez les outils de développement (F12)
2. Naviguez vers "Application" > "Stockage local"
3. Supprimez les entrées :
   - "gestiMedData"
   - "gestimedTraeBackup"
4. Rafraîchissez la page (F5)
5. Reconfiguration complète nécessaire

### 10.3 Support technique

**Ressources d'aide :**

📧 **Contact support**
- Email : support@gestimed.app
- Réponse sous 24h
- Support en français

📚 **Documentation**
- Guide utilisateur complet
- FAQ détaillée
- Tutoriels vidéo

🔧 **Diagnostic automatique**
- Outil de vérification intégré
- Rapport d'erreur automatique
- Suggestions de correction

---

## 11. QUESTIONS FRÉQUENTES

### 11.1 Sécurité et confidentialité

**Q : Mes données sont-elles sécurisées ?**

✅ **Réponse :** Absolument. Toutes vos données sont stockées localement sur votre appareil et ne sont jamais partagées avec des serveurs externes. GestiMed utilise le système de mémoire Trae.ai pour assurer la persistance et la sauvegarde quotidienne de vos données critiques avec un chiffrement de niveau bancaire.

**Q : Qui peut accéder à mes informations médicales ?**

✅ **Réponse :** Seul vous avez accès à vos données. Aucune transmission vers des serveurs tiers, aucun partage commercial, protection totale de votre vie privée.

### 11.2 Utilisation multi-appareils

**Q : Puis-je utiliser GestiMed sur plusieurs appareils ?**

📱 **Réponse :** Actuellement, GestiMed stocke les données localement sur chaque appareil. La synchronisation entre appareils est prévue dans une future mise à jour. En attendant, vous pouvez exporter/importer vos données manuellement.

**Q : Comment transférer mes données vers un nouvel appareil ?**

💾 **Réponse :** Utilisez la fonction d'export dans les paramètres pour créer un fichier de sauvegarde, puis importez-le sur votre nouvel appareil.

### 11.3 Configuration des médicaments

**Q : Comment ajouter plusieurs prises par jour ?**

⏰ **Réponse :** Lors de l'ajout d'un médicament, spécifiez le nombre de prises quotidiennes, puis définissez chaque horaire en cliquant sur le bouton "+" à côté du champ "Heures de prise".

**Q : Comment modifier un médicament existant ?**

✏️ **Réponse :** Cliquez sur le bouton "Modifier" sur la carte du médicament que vous souhaitez mettre à jour. Toutes les informations peuvent être modifiées.

**Q : Puis-je programmer des prises irrégulières ?**

📅 **Réponse :** Oui, utilisez l'option "Selon besoin" dans la fréquence, puis programmez manuellement chaque prise via l'assistant conversationnel.

### 11.4 Gestion familiale

**Q : Comment gérer les médicaments de ma famille ?**

👥 **Réponse :** Utilisez le champ "Membre de la famille" lors de l'ajout d'un médicament. Les médicaments seront automatiquement organisés par membre dans la liste principale avec des sections dédiées.

**Q : Puis-je voir les statistiques de chaque membre de la famille ?**

📊 **Réponse :** Oui, les statistiques sont automatiquement organisées par membre de la famille. Chaque membre a sa propre section avec ses médicaments et taux d'observance individuels.

**Q : Comment différencier les rappels de chaque membre ?**

🔔 **Réponse :** Les rappels indiquent clairement le nom du membre de la famille concerné, et les notifications sont personnalisées en conséquence ("Rappel pour [membre]" ou "Il est temps que [enfant] prenne...").

**Q : Puis-je changer le membre de la famille d'un médicament existant ?**

🔄 **Réponse :** Oui, utilisez le bouton "Modifier" sur la carte du médicament et changez la sélection dans le champ "Membre de la famille".

### 11.5 Rappels et notifications

**Q : Que se passe-t-il si je manque une prise ?**

⏰ **Réponse :** Si vous manquez une prise, le rappel sera reporté au lendemain à la même heure pour les médicaments quotidiens. L'événement est enregistré dans les statistiques pour le suivi de l'observance.

**Q : Puis-je personnaliser les sons de notification ?**

🔊 **Réponse :** Cette fonctionnalité est en développement. Actuellement, GestiMed utilise les notifications système de votre navigateur.

**Q : Comment désactiver temporairement les rappels ?**

🔕 **Réponse :** Allez dans les paramètres et désactivez l'option "Notifications". Vous pouvez les réactiver à tout moment.

### 11.6 Statistiques et suivi

**Q : Sur quelle période sont calculées les statistiques ?**

📈 **Réponse :** Les statistiques sont calculées sur les 30 derniers jours pour donner une vision récente et pertinente de votre observance thérapeutique.

**Q : Comment améliorer mon taux d'observance ?**

🎯 **Réponse :** 
- Activez toutes les notifications
- Utilisez l'assistant pour des rappels personnalisés
- Consultez régulièrement vos statistiques
- Identifiez les moments d'oubli fréquents
- Adaptez les horaires à votre routine

### 11.7 Support technique

**Q : L'application fonctionne-t-elle hors ligne ?**

📶 **Réponse :** GestiMed fonctionne entièrement hors ligne une fois chargé. Seule la première visite nécessite une connexion internet.

**Q : Quels navigateurs sont compatibles ?**

🌐 **Réponse :** GestiMed est compatible avec tous les navigateurs modernes : Chrome, Firefox, Safari, Edge. Chrome est recommandé pour une expérience optimale.

**Q : Comment signaler un bug ou suggérer une amélioration ?**

🐛 **Réponse :** Contactez notre support à support@gestimed.app avec une description détaillée du problème ou de votre suggestion.

---

## 📞 SUPPORT ET CONTACT

### Assistance technique
- **Email :** support@gestimed.app
- **Réponse :** Sous 24h ouvrées
- **Langues :** Français, Anglais

### Ressources supplémentaires
- **Documentation :** Guide complet en ligne
- **Tutoriels :** Vidéos explicatives
- **FAQ :** Questions fréquentes mises à jour

---

**© 2024 GestiMed - Votre assistant personnel pour la gestion des médicaments familiale**

*Version du guide : 2.0 | Dernière mise à jour : Décembre 2024*

---

> **💡 Conseil :** Gardez ce guide à portée de main et n'hésitez pas à le consulter pour optimiser votre utilisation de GestiMed !