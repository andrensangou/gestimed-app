// Variables globales - Structure de données conforme aux spécifications
let userData = {
    user_id: generateUserId(),
    medications: [],
    history: [],
    reminders: [],
    settings: {
        notificationType: 'browser',
        reminderAdvance: 0,
        reminderRepeat: false
    }
};

// Générer un ID utilisateur unique
function generateUserId() {
    const existingId = localStorage.getItem('gestiMedUserId');
    if (existingId) {
        return existingId;
    }
    const newId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('gestiMedUserId', newId);
    return newId;
}

// Initialisation de l'application
function initApp() {
    // Charger les données utilisateur
    loadUserData();
    
    // Initialiser les événements
    initEvents();
    
    // Mettre à jour le dashboard
    updateMedicationList();
    updateRemindersTimeline();
    
    // Vérifier les rappels toutes les 60 secondes
    setInterval(checkReminders, 60000);
    
    // Vérifier les seuils d'alerte et mettre à jour les données automatiquement
    updateAutomaticData();
    
    // Backup quotidien des données critiques (toutes les 24 heures)
    setInterval(() => {
        updateAutomaticData();
        console.log('Backup quotidien des données GestiMed effectué');
    }, 24 * 60 * 60 * 1000);
}

// Générer un ID utilisateur unique
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Chargement des données utilisateur
function loadUserData() {
    // Essayer de charger depuis le système Trae.ai d'abord
    const traeData = loadFromTraeMemory();
    const savedData = localStorage.getItem('gestiMedData');
    
    if (traeData) {
        console.log('Données chargées depuis Trae.ai');
        userData = {
            user_id: traeData.user_id,
            medications: traeData.medications,
            reminders: traeData.reminders,
            history: [],
            settings: {
                notifications: true,
                darkMode: false,
                language: 'fr'
            }
        };
        
        // Récupérer l'historique du localStorage si disponible
        if (savedData) {
            const localData = JSON.parse(savedData);
            if (localData.history) {
                userData.history = localData.history;
            }
            if (localData.settings) {
                userData.settings = localData.settings;
            }
        }
    } else if (savedData) {
        userData = JSON.parse(savedData);
        
        // Migration des données vers le nouveau format si nécessaire
        if (!userData.user_id) {
            userData.user_id = generateUserId();
        }
        
        // Convertir les anciens médicaments au nouveau format
        userData.medications = userData.medications.map(med => {
            // Renommer quantity en stock si nécessaire
            if (med.quantity !== undefined && med.stock === undefined) {
                med.stock = med.quantity;
                delete med.quantity;
            }
            
            // Renommer threshold en alert_threshold si nécessaire
            if (med.threshold !== undefined && med.alert_threshold === undefined) {
                med.alert_threshold = med.threshold;
                delete med.threshold;
            }
            
            // Initialiser last_taken si non défini
            if (!med.last_taken) {
                med.last_taken = null;
            }
            
            // Calculer la fréquence à partir des horaires si nécessaire
            if (med.times && !med.frequency) {
                med.frequency = med.times.length;
            }
            
            return med;
        });
        
        // Vérifier et créer les rappels manquants
        userData.medications.forEach(med => {
            if (med.times && med.times.length > 0) {
                med.times.forEach(time => {
                    // Vérifier si un rappel existe déjà pour ce médicament et cette heure
                    const reminderExists = userData.reminders.some(r => 
                        r.medication === med.name && r.time === time
                    );
                    
                    if (!reminderExists) {
                        userData.reminders.push({
                            medication: med.name,
                            time: time,
                            next_reminder: calculateNextReminder(time),
                            recurring: true,
                            familyMember: med.familyMember || 'user'
                        });
                    }
                });
            }
        });
    } else {
        // Données par défaut
        userData = {
            user_id: generateUserId(),
            medications: [],
            history: [],
            reminders: [],
            settings: {
                notifications: true,
                darkMode: false,
                language: 'fr'
            }
        };
    }
    
    // Sauvegarder les données migrées
    saveUserData();
}

// Sauvegarder les données utilisateur
function saveUserData() {
    localStorage.setItem('gestiMedData', JSON.stringify(userData));
    
    // Utiliser le système de mémoire Trae.ai pour la persistance
    saveToTraeMemory(userData);
}

// Système de mémoire Trae.ai pour la persistance des données
function saveToTraeMemory(data) {
    try {
        // Préparer les données critiques pour le backup
        const criticalData = {
            user_id: data.user_id,
            medications: data.medications.map(med => ({
                name: med.name,
                dosage: med.dosage,
                frequency: med.frequency,
                times: med.times,
                stock: med.stock,
                alert_threshold: med.alert_threshold,
                last_taken: med.last_taken
            })),
            reminders: data.reminders.filter(r => r.recurring),
            backup_timestamp: new Date().toISOString()
        };
        
        // Simuler la sauvegarde Trae.ai (en attendant l'implémentation réelle)
        console.log('Backup Trae.ai:', criticalData);
        localStorage.setItem('gestimedTraeBackup', JSON.stringify(criticalData));
        
    } catch (error) {
        console.error('Erreur lors de la sauvegarde Trae.ai:', error);
    }
}

// Charger depuis le système de mémoire Trae.ai
function loadFromTraeMemory() {
    try {
        const traeBackup = localStorage.getItem('gestimedTraeBackup');
        if (traeBackup) {
            const backupData = JSON.parse(traeBackup);
            console.log('Données Trae.ai récupérées:', backupData);
            return backupData;
        }
    } catch (error) {
        console.error('Erreur lors du chargement Trae.ai:', error);
    }
    return null;
}

// Initialisation des événements
function initEvents() {
    // Bouton d'ajout de médicament
    document.getElementById('add-med-btn').addEventListener('click', () => {
        document.getElementById('add-med-modal').classList.add('active');
    });
    
    // Boutons des nouvelles fonctionnalités
    document.getElementById('stats-btn')?.addEventListener('click', () => {
        document.getElementById('stats-modal').classList.add('active');
        generateStatistics();
    });
    
    document.getElementById('export-btn')?.addEventListener('click', exportData);
    document.getElementById('sync-btn')?.addEventListener('click', syncMultiDevice);
    
    // Fermeture des modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // Gestion du formulaire d'ajout de médicament
    document.getElementById('add-medication-form').addEventListener('submit', handleAddMedicationForm);
    
    // Gestion du formulaire d'édition de médicament
    document.getElementById('edit-medication-form')?.addEventListener('submit', handleEditMedicationForm);
    
    // Gestion des options de fréquence
    document.querySelectorAll('input[name="frequency"]').forEach(radio => {
        radio.addEventListener('change', toggleFrequencyOptions);
    });
    
    // Gestion des horaires de prise
    document.getElementById('add-time').addEventListener('click', addTimeSlot);
    document.getElementById('time-slots').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-time') || e.target.parentElement.classList.contains('remove-time')) {
            removeTimeSlot(e);
        }
    });
    
    // Gestion du chat
    document.getElementById('send-message').addEventListener('click', sendChatMessage);
    document.getElementById('user-message').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
}

// Mise à jour de la liste des médicaments
function updateMedicationList() {
    const medicationList = document.getElementById('medication-list');
    medicationList.innerHTML = '';
    
    if (userData.medications.length === 0) {
        medicationList.innerHTML = '<div class="empty-state">Aucun médicament ajouté</div>';
        return;
    }
    
    // Regrouper les médicaments par membre de la famille
    const medicationsByFamily = {};
    
    userData.medications.forEach(medication => {
        const familyMember = medication.familyMember || 'user';
        if (!medicationsByFamily[familyMember]) {
            medicationsByFamily[familyMember] = [];
        }
        medicationsByFamily[familyMember].push(medication);
    });
    
    // Créer des sections pour chaque membre de la famille
    for (const [familyMember, medications] of Object.entries(medicationsByFamily)) {
        // Créer un en-tête de section si ce n'est pas l'utilisateur principal
        if (familyMember !== 'user') {
            const sectionHeader = document.createElement('div');
            sectionHeader.className = 'family-section-header';
            sectionHeader.innerHTML = `<h3>${familyMember}</h3>`;
            medicationList.appendChild(sectionHeader);
        }
        
        // Ajouter les médicaments de ce membre de la famille
        medications.forEach(medication => {
            const card = createMedicationCard(medication);
            medicationList.appendChild(card);
        });
    }
}

// Création d'une carte de médicament
function createMedicationCard(med) {
    const card = document.createElement('div');
    card.className = 'med-card';
    card.dataset.id = med.id;
    
    // Vérifier si le stock est bas
    const stockPercentage = (med.stock / (med.alert_threshold * 2)) * 100;
    let stockClass = '';
    
    if (med.stock <= med.alert_threshold / 2) {
        stockClass = 'danger';
        card.innerHTML += `<div class="med-badge">!</div>`;
    } else if (med.stock <= med.alert_threshold) {
        stockClass = 'warning';
        card.innerHTML += `<div class="med-badge">!</div>`;
    }
    
    // Déterminer la prochaine prise
let nextTime = 'Aucune prise prévue';
if (med.times && med.times.length > 0) {
    // Trouver les rappels associés à ce médicament et au même membre de la famille
    const medicationReminders = userData.reminders.filter(r => 
        r.medication === med.name && 
        (r.familyMember || 'user') === (med.familyMember || 'user')
    );
    
    if (medicationReminders.length > 0) {
        // Trouver le prochain rappel
        let nextReminder = null;
        let nextReminderTime = Infinity;
        
        medicationReminders.forEach(reminder => {
            const reminderTime = new Date(reminder.next_reminder).getTime();
            
            if (reminderTime < nextReminderTime) {
                nextReminderTime = reminderTime;
                nextReminder = reminder;
            }
        });
        
        if (nextReminder) {
            // Formater la date et l'heure
            const nextDate = new Date(nextReminder.next_reminder);
            const now = new Date();
            
            // Vérifier si c'est aujourd'hui, demain ou plus tard
            if (nextDate.toDateString() === now.toDateString()) {
                nextTime = `Aujourd'hui à ${nextDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
            } else {
                const tomorrow = new Date(now);
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                if (nextDate.toDateString() === tomorrow.toDateString()) {
                    nextTime = `Demain à ${nextDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
                }
            }
        }
    }
}
    
    // Déterminer si on doit afficher le membre de la famille
    const familyMemberDisplay = med.familyMember && med.familyMember !== 'user' 
        ? `<div class="family-member"><i class="fas fa-user"></i> <span>${med.familyMember}</span></div>` 
        : '';
    
    card.innerHTML += `
        <div class="med-header">
            <h3>${med.name}</h3>
            <span class="dosage">${med.dosage}</span>
        </div>
        <div class="med-info">
            <div class="stock ${stockClass}">
                <i class="fas fa-pills"></i>
                <span>${med.stock} unités</span>
            </div>
            <div class="next-dose">
                <i class="fas fa-clock"></i>
                <span>${nextTime}</span>
            </div>
            ${familyMemberDisplay}
        </div>
        <div class="med-actions">
            <button class="btn secondary" onclick="recordMedicationTaken('${med.id}')">
                <i class="fas fa-check"></i> J'ai pris
            </button>
            <button class="btn tertiary" onclick="editMedication('${med.id}')">
                <i class="fas fa-edit"></i> Modifier
            </button>
        </div>
    `;
    
    return card;
}

// Mise à jour de la timeline des rappels
function updateRemindersTimeline() {
    const timelineContainer = document.getElementById('reminders-timeline');
    timelineContainer.innerHTML = '';
    
    // Collecter tous les rappels à venir
    const upcomingReminders = [];
    const now = new Date();
    
    // Utiliser directement les rappels de la structure de données
    userData.reminders.forEach(reminder => {
        const reminderDate = new Date(reminder.next_reminder);
        
        // Ne montrer que les rappels futurs
        if (reminderDate > now) {
            // Trouver le médicament associé
            const medication = userData.medications.find(med => 
                med.name === reminder.medication && 
                (med.familyMember || 'user') === (reminder.familyMember || 'user')
            );
            
            if (medication) {
                upcomingReminders.push({
                    medication: medication,
                    time: reminderDate,
                    reminder: reminder,
                    familyMember: reminder.familyMember || 'user'
                });
            }
        }
    });
    
    // Trier par heure
    upcomingReminders.sort((a, b) => a.time - b.time);
    
    // Limiter à 5 rappels
    const remindersToShow = upcomingReminders.slice(0, 5);
    
    if (remindersToShow.length === 0) {
        timelineContainer.innerHTML = '<p class="empty-state">Aucun rappel programmé</p>';
        return;
    }
    
    // Créer les éléments de la timeline
    remindersToShow.forEach(reminder => {
        const timeDiff = reminder.time - now;
        const hoursUntil = Math.floor(timeDiff / (1000 * 60 * 60));
        
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        if (hoursUntil < 1) {
            timelineItem.classList.add('urgent');
        } else if (hoursUntil < 3) {
            timelineItem.classList.add('warning');
        }
        
        const timeString = reminder.time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        const dateString = reminder.time.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        
        // Afficher le membre de la famille si ce n'est pas l'utilisateur principal
        const familyMemberDisplay = reminder.familyMember && reminder.familyMember !== 'user' 
            ? `<div class="family-member"><i class="fas fa-user"></i> ${reminder.familyMember}</div>` 
            : '';
        
        timelineItem.innerHTML = `
            <div class="timeline-time">${timeString} - ${dateString}</div>
            <div class="timeline-content">
                <strong>${reminder.medication.name}</strong> - ${reminder.medication.dosage}
                ${familyMemberDisplay}
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Ajouter un nouveau médicament
function addMedication(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Récupérer les créneaux horaires
    const timeSlots = [];
    document.querySelectorAll('.time-slot input').forEach(input => {
        if (input.value) {
            timeSlots.push(input.value);
        }
    });
    
    const medication = {
        id: generateUserId(), // Utiliser la même fonction pour générer un ID unique
        name: formData.get('name'),
        dosage: formData.get('dosage'),
        form: formData.get('form'),
        stock: parseInt(formData.get('quantity')), // Utiliser 'stock' au lieu de 'quantity'
        alert_threshold: parseInt(formData.get('threshold')), // Utiliser 'alert_threshold'
        frequency: timeSlots.length, // Calculer automatiquement la fréquence
        times: timeSlots,
        notes: formData.get('notes'),
        created_at: new Date().toISOString(),
        last_taken: null // Initialiser à null
    };
    
    // Ajouter le médicament
    userData.medications.push(medication);
    
    // Créer automatiquement les rappels pour chaque créneau horaire
    timeSlots.forEach(time => {
        const reminder = {
            medication: medication.name,
            time: time,
            next_reminder: calculateNextReminder(time),
            recurring: true
        };
        userData.reminders.push(reminder);
    });
    
    // Sauvegarder les données
    saveUserData();
    
    // Mettre à jour l'interface
    updateMedicationList();
    updateRemindersTimeline();
    
    // Fermer le modal
    document.getElementById('addMedicationModal').style.display = 'none';
    
    // Réinitialiser le formulaire
    form.reset();
    document.getElementById('timeSlots').innerHTML = '';
    
    // Afficher un message de confirmation
    addChatMessage(`Médicament ${medication.name} ajouté avec succès!`, 'assistant');
}

// Gestion du formulaire d'ajout de médicament
function handleAddMedicationForm(e) {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const name = document.getElementById('med-name').value;
    const dosage = document.getElementById('med-dosage').value;
    const form = document.getElementById('med-form').value;
    const quantity = parseInt(document.getElementById('med-quantity').value);
    const threshold = parseInt(document.getElementById('med-threshold').value);
    const frequency = document.querySelector('input[name="frequency"]:checked').value;
    const notes = document.getElementById('med-notes').value;
    
    // Récupérer le membre de la famille si disponible
    let familyMember = 'user';
    if (document.getElementById('med-family-member')) {
        familyMember = document.getElementById('med-family-member').value;
    }
    
    // Récupérer les horaires pour la fréquence quotidienne
    let times = [];
    if (frequency === 'daily') {
        const timeInputs = document.querySelectorAll('.time-input');
        timeInputs.forEach(input => {
            if (input.value) {
                times.push(input.value);
            }
        });
    }
    
    // Créer l'objet médicament selon la nouvelle structure
    const medication = {
        name,
        dosage,
        frequency: times.length, // Nombre de prises par jour
        times,
        stock: quantity,
        alert_threshold: threshold,
        last_taken: null,
        form,
        notes,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        familyMember: familyMember
    };
    
    // Créer les rappels automatiquement
    if (times.length > 0) {
        times.forEach(time => {
            const reminder = {
                medication: name,
                next_reminder: calculateNextReminder(time),
                recurring: true,
                time: time,
                familyMember: familyMember
            };
            userData.reminders.push(reminder);
        });
    }
    
    // Ajouter le médicament à la liste
    userData.medications.push(medication);
    
    // Sauvegarder les données
    saveUserData();
    
    // Mettre à jour l'interface
    updateMedicationList();
    updateRemindersTimeline();
    
    // Réinitialiser le formulaire
    document.getElementById('add-medication-form').reset();
    
    // Fermer le modal
    document.getElementById('add-med-modal').classList.remove('active');
    
    // Afficher une notification
    showNotification(`${name} a été ajouté avec succès${familyMember !== 'user' ? ' pour ' + familyMember : ''}.`);
    
    // Ajouter un message dans le chat
    addChatMessage(`J'ai ajouté ${name} (${dosage}) à ${familyMember !== 'user' ? 'la liste de médicaments de ' + familyMember : 'votre liste de médicaments'}.`, 'assistant');
}

// Ajouter un créneau horaire
function addTimeSlot() {
    const timeSlots = document.getElementById('time-slots');
    const newSlot = document.createElement('div');
    newSlot.className = 'time-slot';
    newSlot.innerHTML = `
        <input type="time" class="time-input">
        <button type="button" class="remove-time"><i class="fas fa-minus-circle"></i></button>
    `;
    timeSlots.appendChild(newSlot);
}

// Supprimer un créneau horaire
function removeTimeSlot(e) {
    const button = e.target.closest('.remove-time');
    const slot = button.closest('.time-slot');
    slot.remove();
}

// Afficher/masquer les options de fréquence
function toggleFrequencyOptions() {
    const frequency = document.querySelector('input[name="frequency"]:checked').value;
    const dailyOptions = document.getElementById('daily-options');
    
    if (frequency === 'daily') {
        dailyOptions.style.display = 'block';
    } else {
        dailyOptions.style.display = 'none';
    }
}

// Calculer le prochain rappel pour une heure donnée
function calculateNextReminder(time) {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    
    let nextReminder = new Date();
    nextReminder.setHours(hours, minutes, 0, 0);
    
    // Si l'heure est déjà passée aujourd'hui, programmer pour demain
    if (nextReminder <= now) {
        nextReminder.setDate(nextReminder.getDate() + 1);
    }
    
    return nextReminder.toISOString();
}

// Mettre à jour automatiquement les données selon les spécifications
function updateAutomaticData() {
    const now = new Date();
    
    // Vérifier les seuils d'alerte quotidiennement
    userData.medications.forEach(med => {
        if (med.stock <= med.alert_threshold) {
            showNotification(`⚠️ Stock faible pour ${med.name}: ${med.stock} unités restantes`, true);
        }
    });
    
    // Mettre à jour les prochains rappels
    userData.reminders.forEach(reminder => {
        const reminderTime = new Date(reminder.next_reminder);
        if (reminderTime <= now && reminder.recurring) {
            // Calculer le prochain rappel
            reminder.next_reminder = calculateNextReminder(reminder.time);
        }
    });
    
    // Sauvegarder les modifications
    saveUserData();
}

// Enregistrer une prise de médicament avec mise à jour automatique
function recordMedicationTaken(medicationId) {
    const medication = userData.medications.find(med => med.id === medicationId);
    
    if (medication) {
        // Décrémenter le stock quand "pris" confirmé
        if (medication.stock > 0) {
            medication.stock--;
        }
        
        // Mettre à jour la dernière prise
        medication.last_taken = new Date().toISOString();
        
        // Enregistrer dans l'historique
        userData.history.push({
            medicationId: medication.id,
            medicationName: medication.name,
            dosage: medication.dosage,
            timestamp: new Date().toISOString(),
            status: 'taken',
            familyMember: medication.familyMember || 'user'
        });
        
        // Calculer la prochaine prise selon la fréquence
        const currentTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        const currentTimeIndex = medication.times.indexOf(currentTime);
        
        if (currentTimeIndex !== -1) {
            // Mettre à jour le rappel correspondant
            const reminder = userData.reminders.find(r => 
                r.medication === medication.name && r.time === currentTime
            );
            if (reminder) {
                reminder.next_reminder = calculateNextReminder(reminder.time);
            }
        }
        
        // Vérifier le seuil d'alerte
        if (medication.stock <= medication.alert_threshold) {
            showNotification(`⚠️ Stock faible pour ${medication.name}: ${medication.stock} unités restantes`, true);
        }
        
        // Sauvegarder chaque modification
        saveUserData();
        
        // Mettre à jour l'interface
        updateMedicationList();
        updateRemindersTimeline();
        
        // Afficher une notification
        const familyMember = medication.familyMember || 'user';
        const familyText = familyMember !== 'user' ? ` pour ${familyMember}` : '';
        showNotification(`Prise de ${medication.name} enregistrée${familyText}.`);
        
        // Ajouter un message dans le chat
        if (familyMember !== 'user') {
            addChatMessage(`J'ai enregistré la prise de ${medication.name} pour ${familyMember}. Il reste ${medication.stock} unités.`, 'assistant');
        } else {
            addChatMessage(`J'ai enregistré votre prise de ${medication.name}. Il vous reste ${medication.stock} unités.`, 'assistant');
        }
    }
}

// Afficher une notification
function showNotification(message, actions = false) {
    const notification = document.getElementById('reminder-notification');
    const notificationMessage = document.getElementById('notification-message');
    const notificationActions = document.querySelector('.notification-actions');
    
    notificationMessage.textContent = message;
    
    if (actions) {
        notificationActions.style.display = 'flex';
    } else {
        notificationActions.style.display = 'none';
    }
    
    notification.classList.remove('hidden');
    notification.classList.add('active');
    
    // Masquer la notification après 5 secondes
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }, 5000);
}

// Vérifier les rappels
function checkReminders() {
    const now = new Date();
    
    // Vérifier chaque rappel programmé
    userData.reminders.forEach(reminder => {
        const reminderTime = new Date(reminder.next_reminder);
        
        // Vérifier si c'est l'heure du rappel (à 5 minutes près)
        if (reminderTime <= now && now - reminderTime < 5 * 60 * 1000) {
            // Trouver le médicament associé
            const medication = userData.medications.find(med => med.name === reminder.medication);
            
            if (medication) {
                // Vérifier si une notification a déjà été envoyée récemment
                const recentNotification = userData.history.some(h => 
                    h.medicationName === medication.name && 
                    h.status === 'notification' && 
                    new Date(h.timestamp) > new Date(now - 10 * 60 * 1000) // 10 minutes
                );
                
                if (!recentNotification) {
                    // Envoyer une notification
                    showMedicationReminder(medication);
                    
                    // Enregistrer la notification dans l'historique
                    userData.history.push({
                        medicationId: medication.id,
                        medicationName: medication.name,
                        dosage: medication.dosage,
                        timestamp: now.toISOString(),
                        status: 'notification'
                    });
                    
                    // Si le rappel est récurrent, calculer le prochain rappel
                    if (reminder.recurring) {
                        reminder.next_reminder = calculateNextReminder(reminder.time);
                    }
                    
                    saveUserData();
                    updateRemindersTimeline();
                }
            }
        }
    });
    
    // Vérifier les seuils d'alerte pour les stocks
    userData.medications.forEach(med => {
        if (med.stock <= med.alert_threshold && med.stock > 0) {
            // Vérifier si une alerte de stock a déjà été envoyée aujourd'hui
            const today = new Date().toISOString().split('T')[0];
            const stockAlertToday = userData.history.some(h => 
                h.medicationId === med.id && 
                h.status === 'stock_alert' && 
                h.timestamp.startsWith(today)
            );
            
            if (!stockAlertToday) {
                showNotification(`⚠️ Stock faible pour ${med.name}: ${med.stock} unités restantes`, true);
                
                // Enregistrer l'alerte dans l'historique
                userData.history.push({
                    medicationId: med.id,
                    medicationName: med.name,
                    timestamp: now.toISOString(),
                    status: 'stock_alert'
                });
                
                saveUserData();
            }
        }
    });
}

// Afficher un rappel de médicament
function showMedicationReminder(medication) {
    const notification = document.getElementById('reminder-notification');
    const notificationMessage = document.getElementById('notification-message');
    const takeButton = document.getElementById('take-med');
    const snoozeButton = document.getElementById('snooze-med');
    
    notificationMessage.textContent = `C'est l'heure de prendre ${medication.name} - ${medication.dosage}`;
    
    // Configurer le bouton "J'ai pris"
    takeButton.onclick = () => {
        recordMedicationTaken(medication.id);
        notification.classList.remove('active');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    };
    
    // Configurer le bouton "Rappeler dans 15min"
    snoozeButton.onclick = () => {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.classList.add('hidden');
            
            // Trouver le rappel correspondant
            const currentTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            const reminder = userData.reminders.find(r => 
                r.medication === medication.name && r.time === currentTime
            );
            
            if (reminder) {
                // Calculer une nouvelle heure de rappel dans 15 minutes
                const snoozeTime = new Date();
                snoozeTime.setMinutes(snoozeTime.getMinutes() + 15);
                reminder.next_reminder = snoozeTime.toISOString();
                
                // Sauvegarder les données
                saveUserData();
                updateRemindersTimeline();
            }
            
            // Rappeler dans 15 minutes
            setTimeout(() => {
                showMedicationReminder(medication);
            }, 15 * 60 * 1000);
        }, 300);
    };
    
    notification.classList.remove('hidden');
    notification.classList.add('active');
    
    // Jouer un son (commenté pour l'instant)
    // playNotificationSound();
}

// Envoyer un message dans le chat
function sendChatMessage() {
    const userMessageInput = document.getElementById('user-message');
    const userMessage = userMessageInput.value.trim();
    
    if (userMessage) {
        // Ajouter le message de l'utilisateur
        addChatMessage(userMessage, 'user');
        
        // Vider l'input
        userMessageInput.value = '';
        
        // Traiter le message et répondre
        processChatMessage(userMessage);
    }
}

// Ajouter un message dans le chat
function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageElement.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
            <div class="message-time">${timeString}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    
    // Faire défiler vers le bas
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Traiter un message du chat
function processChatMessage(message) {
    // Convertir en minuscules pour faciliter la recherche
    const lowerMessage = message.toLowerCase();
    
    // Rechercher des mots-clés
    if (lowerMessage.includes('ajouter') || lowerMessage.includes('nouveau médicament')) {
        addChatMessage("Pour ajouter un médicament, cliquez sur le bouton 'Ajouter un médicament' dans le panneau latéral.", 'assistant');
    }
    else if (lowerMessage.includes('stock') || lowerMessage.includes('quantité')) {
        // Vérifier les stocks bas
        const lowStockMeds = userData.medications.filter(med => med.quantity <= med.threshold);
        
        if (lowStockMeds.length > 0) {
            let response = "Voici les médicaments dont le stock est bas :\n";
            lowStockMeds.forEach(med => {
                response += `- ${med.name}: ${med.quantity} unités restantes (seuil: ${med.threshold})\n`;
            });
            addChatMessage(response, 'assistant');
        } else {
            addChatMessage("Tous vos stocks de médicaments sont suffisants.", 'assistant');
        }
    }
    else if (lowerMessage.includes('rappel') || lowerMessage.includes('prochaine prise')) {
        updateRemindersTimeline();
        addChatMessage("J'ai mis à jour la timeline des rappels avec vos prochaines prises de médicaments.", 'assistant');
    }
    else if (lowerMessage.includes('aide') || lowerMessage.includes('help')) {
        addChatMessage("Je peux vous aider à gérer vos médicaments. Voici ce que vous pouvez me demander :\n- Ajouter un médicament\n- Vérifier vos stocks\n- Voir vos prochaines prises\n- Enregistrer une prise de médicament", 'assistant');
    }
    else {
        // Réponse par défaut
        addChatMessage("Je ne suis pas sûr de comprendre votre demande. Pouvez-vous préciser ou essayer avec d'autres mots-clés ?", 'assistant');
    }
}

// ===== NOUVELLES FONCTIONNALITÉS =====

// 1. Interface d'édition des médicaments
function editMedication(medicationId) {
    const medication = userData.medications.find(med => med.id === medicationId);
    if (!medication) return;
    
    // Remplir le formulaire d'édition avec les données existantes
    document.getElementById('edit-med-name').value = medication.name;
    document.getElementById('edit-med-dosage').value = medication.dosage;
    document.getElementById('edit-med-form').value = medication.form || 'comprimé';
    document.getElementById('edit-med-quantity').value = medication.stock;
    document.getElementById('edit-med-threshold').value = medication.alert_threshold;
    
    // Stocker l'ID du médicament en cours d'édition
    document.getElementById('edit-medication-form').dataset.medicationId = medicationId;
    
    // Remplir les horaires existants
    const editTimeSlots = document.getElementById('edit-time-slots');
    editTimeSlots.innerHTML = '';
    if (medication.times && medication.times.length > 0) {
        medication.times.forEach(time => {
            addEditTimeSlot(time);
        });
    }
    
    // Remplir le champ famille si disponible
    if (document.getElementById('edit-med-family-member')) {
        document.getElementById('edit-med-family-member').value = medication.familyMember || 'user';
    }
    
    // Afficher le modal d'édition
    document.getElementById('edit-med-modal').classList.add('active');
}

function handleEditMedicationForm(e) {
    e.preventDefault();
    
    const medicationId = e.target.dataset.medicationId;
    const medication = userData.medications.find(med => med.id === medicationId);
    if (!medication) return;
    
    // Récupérer les nouvelles données
    const name = document.getElementById('edit-med-name').value;
    const dosage = document.getElementById('edit-med-dosage').value;
    const form = document.getElementById('edit-med-form').value;
    const stock = parseInt(document.getElementById('edit-med-quantity').value);
    const alert_threshold = parseInt(document.getElementById('edit-med-threshold').value);
    
    // Récupérer le membre de la famille si disponible
    let familyMember = 'user';
    if (document.getElementById('edit-med-family-member')) {
        familyMember = document.getElementById('edit-med-family-member').value;
    }
    
    // Récupérer les horaires
    const timeInputs = document.querySelectorAll('#edit-time-slots input[type="time"]');
    const times = Array.from(timeInputs).map(input => input.value).filter(time => time);
    
    // Mettre à jour le médicament
    const oldName = medication.name;
    medication.name = name;
    medication.dosage = dosage;
    medication.form = form;
    medication.stock = stock;
    medication.alert_threshold = alert_threshold;
    medication.times = times;
    medication.familyMember = familyMember;
    
    // Mettre à jour les rappels si le nom a changé
    if (oldName !== name) {
        userData.reminders.forEach(reminder => {
            if (reminder.medication === oldName) {
                reminder.medication = name;
            }
        });
    }
    
    // Recréer les rappels pour les nouveaux horaires
    userData.reminders = userData.reminders.filter(r => r.medication !== name);
    times.forEach(time => {
        userData.reminders.push({
            medication: name,
            time: time,
            next_reminder: calculateNextReminder(time),
            recurring: true,
            familyMember: familyMember
        });
    });
    
    // Sauvegarder et mettre à jour l'interface
    saveUserData();
    updateMedicationList();
    updateRemindersTimeline();
    
    // Fermer le modal
    document.getElementById('edit-med-modal').classList.remove('active');
    
    showNotification(`Médicament ${name} modifié avec succès !`);
}

function addEditTimeSlot(time = '') {
    const timeSlots = document.getElementById('edit-time-slots');
    const timeSlot = document.createElement('div');
    timeSlot.className = 'time-slot';
    timeSlot.innerHTML = `
        <input type="time" value="${time}" required>
        <button type="button" class="remove-time"><i class="fas fa-times"></i></button>
    `;
    timeSlots.appendChild(timeSlot);
}

// 2. Statistiques de prise
function generateStatistics() {
    const statsContainer = document.getElementById('stats-content');
    if (!statsContainer) return;
    
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    // Filtrer l'historique des 30 derniers jours
    const recentHistory = userData.history.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        return entryDate >= thirtyDaysAgo && entry.status === 'taken';
    });
    
    // Calculer les statistiques par médicament et par membre de la famille
    const medicationStats = {};
    userData.medications.forEach(med => {
        const familyMember = med.familyMember || 'user';
        const medHistory = recentHistory.filter(entry => 
            entry.medicationId === med.id && 
            (entry.familyMember || 'user') === familyMember
        );
        const expectedDoses = med.frequency * 30; // Approximation sur 30 jours
        const actualDoses = medHistory.length;
        const adherenceRate = expectedDoses > 0 ? (actualDoses / expectedDoses * 100) : 0;
        
        // Utiliser une clé combinée pour différencier les médicaments par membre de la famille
        const statKey = familyMember !== 'user' ? `${med.name} (${familyMember})` : med.name;
        
        medicationStats[statKey] = {
            expectedDoses,
            actualDoses,
            adherenceRate: Math.min(adherenceRate, 100),
            missedDoses: Math.max(expectedDoses - actualDoses, 0),
            familyMember
        };
    });
    
    // Statistiques globales
    const totalExpected = Object.values(medicationStats).reduce((sum, stat) => sum + stat.expectedDoses, 0);
    const totalActual = Object.values(medicationStats).reduce((sum, stat) => sum + stat.actualDoses, 0);
    const globalAdherence = totalExpected > 0 ? (totalActual / totalExpected * 100) : 0;
    
    // Générer le HTML des statistiques
    let statsHTML = `
        <div class="stats-overview">
            <h3>Aperçu des 30 derniers jours</h3>
            <div class="stats-cards">
                <div class="stat-card">
                    <div class="stat-number">${Math.round(globalAdherence)}%</div>
                    <div class="stat-label">Observance globale</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${totalActual}</div>
                    <div class="stat-label">Prises effectuées</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${totalExpected - totalActual}</div>
                    <div class="stat-label">Prises manquées</div>
                </div>
            </div>
        </div>
        
        <div class="medication-stats">
            <h3>Détail par médicament</h3>
    `;
    
    // Regrouper les statistiques par membre de la famille
    const statsByFamily = {};
    
    Object.entries(medicationStats).forEach(([medName, stats]) => {
        const familyMember = stats.familyMember || 'user';
        if (!statsByFamily[familyMember]) {
            statsByFamily[familyMember] = [];
        }
        statsByFamily[familyMember].push({name: medName, stats});
    });
    
    // Afficher les statistiques par membre de la famille
    for (const [familyMember, medStats] of Object.entries(statsByFamily)) {
        // Ajouter un en-tête de section pour chaque membre de la famille
        if (familyMember !== 'user') {
            statsHTML += `
                <div class="family-section-header stats-family-header">
                    <h3><i class="fas fa-user"></i> ${familyMember}</h3>
                </div>
            `;
        }
        
        // Afficher les statistiques pour chaque médicament de ce membre
        medStats.forEach(({name, stats}) => {
            const adherenceClass = stats.adherenceRate >= 80 ? 'good' : stats.adherenceRate >= 60 ? 'warning' : 'poor';
            statsHTML += `
                <div class="med-stat-item">
                    <div class="med-stat-header">
                        <h4>${name}</h4>
                        <span class="adherence-badge ${adherenceClass}">${Math.round(stats.adherenceRate)}%</span>
                    </div>
                    <div class="med-stat-details">
                        <div class="stat-row">
                            <span>Prises effectuées:</span>
                            <span>${stats.actualDoses}/${stats.expectedDoses}</span>
                        </div>
                        <div class="stat-row">
                            <span>Prises manquées:</span>
                            <span>${stats.missedDoses}</span>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill ${adherenceClass}" style="width: ${stats.adherenceRate}%"></div>
                    </div>
                </div>
            `;
        });
    }
    
    statsHTML += '</div>';
    statsContainer.innerHTML = statsHTML;
}

// 3. Exportation des données
function exportData() {
    const exportData = {
        user_id: userData.user_id,
        export_date: new Date().toISOString(),
        medications: userData.medications,
        history: userData.history,
        reminders: userData.reminders,
        settings: userData.settings
    };
    
    // Créer le fichier JSON
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    // Créer le lien de téléchargement
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `gestimed_export_${new Date().toISOString().split('T')[0]}.json`;
    
    // Déclencher le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Données exportées avec succès !');
    
    // Enregistrer l'export dans l'historique
    userData.history.push({
        timestamp: new Date().toISOString(),
        status: 'data_export',
        details: 'Export des données médicales'
    });
    
    saveUserData();
}

// 4. Synchronisation multi-appareils améliorée
function syncMultiDevice() {
    showNotification('Synchronisation en cours...', false);
    
    try {
        // Préparer les données pour la synchronisation
        const syncData = {
            user_id: userData.user_id,
            sync_timestamp: new Date().toISOString(),
            device_id: getDeviceId(),
            medications: userData.medications,
            reminders: userData.reminders,
            settings: userData.settings,
            last_sync: userData.last_sync || null
        };
        
        // Simuler l'envoi vers le serveur Trae.ai
        setTimeout(() => {
            // Sauvegarder localement avec timestamp de sync
            userData.last_sync = syncData.sync_timestamp;
            userData.device_id = syncData.device_id;
            
            // Sauvegarder dans le système Trae.ai amélioré
            saveToTraeMemoryAdvanced(syncData);
            
            // Vérifier les conflits et résoudre
            resolveDataConflicts(syncData);
            
            saveUserData();
            updateMedicationList();
            updateRemindersTimeline();
            
            showNotification('Synchronisation terminée avec succès !', false);
            
            // Enregistrer la synchronisation dans l'historique
            userData.history.push({
                timestamp: new Date().toISOString(),
                status: 'sync_completed',
                details: `Synchronisation multi-appareils - Device: ${syncData.device_id}`
            });
            
            saveUserData();
        }, 2000);
        
    } catch (error) {
        console.error('Erreur lors de la synchronisation:', error);
        showNotification('Erreur lors de la synchronisation', true);
    }
}

function getDeviceId() {
    let deviceId = localStorage.getItem('gestimedDeviceId');
    if (!deviceId) {
        deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('gestimedDeviceId', deviceId);
    }
    return deviceId;
}

function saveToTraeMemoryAdvanced(syncData) {
    try {
        // Système de sauvegarde Trae.ai amélioré avec versioning
        const advancedBackup = {
            ...syncData,
            version: '2.0',
            backup_type: 'multi_device_sync',
            checksum: generateChecksum(syncData)
        };
        
        // Sauvegarder avec versioning
        const backupKey = `gestimedTraeBackup_v2_${syncData.device_id}`;
        localStorage.setItem(backupKey, JSON.stringify(advancedBackup));
        
        // Maintenir un historique des sauvegardes
        const backupHistory = JSON.parse(localStorage.getItem('gestimedBackupHistory') || '[]');
        backupHistory.push({
            timestamp: syncData.sync_timestamp,
            device_id: syncData.device_id,
            backup_key: backupKey
        });
        
        // Garder seulement les 10 dernières sauvegardes
        if (backupHistory.length > 10) {
            const oldBackup = backupHistory.shift();
            localStorage.removeItem(oldBackup.backup_key);
        }
        
        localStorage.setItem('gestimedBackupHistory', JSON.stringify(backupHistory));
        
        console.log('Sauvegarde Trae.ai avancée effectuée:', advancedBackup);
        
    } catch (error) {
        console.error('Erreur lors de la sauvegarde Trae.ai avancée:', error);
    }
}

function generateChecksum(data) {
    // Générer un checksum simple pour vérifier l'intégrité des données
    const dataString = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
        const char = dataString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convertir en 32bit integer
    }
    return hash.toString();
}

function resolveDataConflicts(newData) {
    // Résolution simple des conflits : prendre les données les plus récentes
    const existingBackups = JSON.parse(localStorage.getItem('gestimedBackupHistory') || '[]');
    
    if (existingBackups.length > 0) {
        const latestBackup = existingBackups[existingBackups.length - 1];
        const latestBackupData = JSON.parse(localStorage.getItem(latestBackup.backup_key) || '{}');
        
        if (latestBackupData.sync_timestamp && new Date(latestBackupData.sync_timestamp) > new Date(newData.sync_timestamp)) {
            console.log('Conflit détecté - utilisation des données les plus récentes');
            // Ici on pourrait implémenter une logique de fusion plus sophistiquée
        }
    }
}

// Fonction utilitaire pour afficher les notifications
function showNotification(message, isError = false) {
    // Créer ou réutiliser un conteneur de notification
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
        `;
        document.body.appendChild(notificationContainer);
    }
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        background: ${isError ? '#ff4757' : '#2ed573'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    notificationContainer.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique après 4 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Initialiser l'application au chargement de la page
document.addEventListener('DOMContentLoaded', initApp);