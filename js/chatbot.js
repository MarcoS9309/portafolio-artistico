// Funcionalidad del Chatbot Simple - Asistente virtual de las creaciones de Marco

let chatbotOpen = false;

// Preguntas preestablecidas para guiar la navegación
const quickQuestions = [
    "¿Qué encontraré en la galería?",
    "¿Cómo navego por el portafolio?",
    "¿Qué hay en el blog?",
    "¿Cómo contacto a Marco?",
    "¿De qué tratan las creaciones?"
];

// Respuestas específicas para navegación y contenido del portafolio
const botResponses = {
    // Saludos y presentación
    'hola': '¡Hola! Soy el asistente virtual de las creaciones de Marco. Te ayudo a navegar por este portafolio artístico. ¿Qué te gustaría explorar?',
    'hi': '¡Hi! I\'m Marco\'s virtual assistant for his artistic creations. How can I help you navigate this portfolio?',
    'quien eres': 'Soy el asistente virtual especializado en las creaciones de Marco. Estoy aquí para ayudarte a descubrir y navegar por su portafolio artístico.',
    
    // Navegación principal
    'galeria': 'La galería "Creaciones" muestra los trabajos principales de Marco que integran tecnología, reflexión y experiencia personal. Haz clic en "Creaciones" en el menú superior.',
    '¿qué encontraré en la galería?': 'En la galería encontrarás los proyectos creativos de Marco: escritos, desarrollos tecnológicos y reflexiones que combinan filosofía y experiencia personal.',
    'blog': 'El blog contiene las reflexiones personales y diario de Marco sobre su proceso creativo, aprendizaje y experiencias. Accede desde "Blog" en el menú.',
    '¿qué hay en el blog?': 'El blog es el espacio reflexivo de Marco donde comparte su viaje de aprendizaje, pensamientos sobre creación y experiencias personales.',
    'contacto': 'Para contactar a Marco, ve a la página "Contacto" en el menú superior o escribe directamente a: alligator9339@protonmail.com',
    '¿cómo contacto a marco?': 'Puedes contactar a Marco a través de la página "Contacto" en el menú principal o enviando un email a alligator9339@protonmail.com',
    
    // Contenido y propósito
    '¿de qué tratan las creaciones?': 'Las creaciones de Marco integran tecnología, filosofía y experiencia personal. Son trabajos que exploran la individuación, el aprendizaje y la expresión creativa.',
    'sobre marco': 'Para conocer más sobre Marco, visita la sección "Sobre Mí" donde comparte su historia, enfoque creativo y filosofía personal.',
    
    // Navegación y guía
    '¿cómo navego por el portafolio?': 'Usa el menú superior: "Inicio" (aquí), "Creaciones" (galería), "Sobre Mí" (biografía), "Blog" (reflexiones) y "Contacto" (información de contacto).',
    'ayuda': 'Te puedo ayudar con: navegación por las secciones, información sobre las creaciones, contenido del blog, datos de contacto y propósito del portafolio.',
    
    // Respuesta por defecto
    'default': 'Para ayudarte mejor, puedes preguntarme sobre: las creaciones en la galería, navegación por el portafolio, contenido del blog, o cómo contactar a Marco.'
};

// Respuestas adicionales por palabras clave específicas del contenido
const keywordResponses = {
    'individuacion': 'La individuación es un tema central en las reflexiones de Marco. Encontrarás más sobre este concepto en sus escritos del blog y creaciones.',
    'tecnologia': 'Marco usa la tecnología como herramienta creativa para experimentar con nuevas formas de narrar y desarrollar ideas. Ver más en "Creaciones".',
    'filosofia': 'La filosofía permea las reflexiones de Marco, especialmente temas de individuación, creación y experiencia personal. Explora el "Blog" para profundizar.',
    'escritura': 'La escritura es fundamental en el trabajo de Marco. Sus textos reflexivos están disponibles en el blog y como parte de sus creaciones.',
    'reflexion': 'Las reflexiones personales de Marco sobre aprendizaje, creación y experiencias están documentadas principalmente en el blog.',
    'aprender': 'El aprendizaje continuo es tema recurrente. Marco documenta su proceso de crecimiento en el blog y lo integra en sus creaciones.',
    'creacion': 'La creación es el núcleo de este portafolio. Cada proyecto refleja un proceso creativo único que integra diferentes disciplinas.'
};

// Función para alternar la visibilidad del chatbot
function toggleChatbot() {
    const chatbox = document.getElementById('chatbot-box');
    const toggleBtn = document.getElementById('chatbot-toggle');
    
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        chatbox.style.display = 'flex';
        chatbox.classList.add('show');
        toggleBtn.style.transform = 'rotate(45deg)';
        
        // Mensaje de bienvenida si es la primera vez
        if (!document.querySelector('.message')) {
            setTimeout(() => {
                showWelcomeMessage();
            }, 500);
        }
    } else {
        chatbox.classList.remove('show');
        setTimeout(() => {
            chatbox.style.display = 'none';
        }, 300);
        toggleBtn.style.transform = 'rotate(0deg)';
    }
}

// Función para mostrar mensaje de bienvenida con preguntas preestablecidas
function showWelcomeMessage() {
    const messagesContainer = document.getElementById('chat-messages');
    
    // Mensaje de guía
    const guideDiv = document.createElement('div');
    guideDiv.className = 'guide-message';
    guideDiv.innerHTML = '💡 <strong>Guía rápida:</strong> Haz clic en las preguntas de abajo o escribe directamente para navegar por el portafolio de Marco.';
    messagesContainer.appendChild(guideDiv);
    
    // Preguntas preestablecidas
    const questionsDiv = document.createElement('div');
    questionsDiv.className = 'quick-questions';
    
    let questionsHTML = '<h4>🔍 Preguntas frecuentes:</h4><div class="question-buttons">';
    quickQuestions.forEach(question => {
        questionsHTML += `<button class="question-btn" onclick="askQuestion('${question}')">${question}</button>`;
    });
    questionsHTML += '</div>';
    
    questionsDiv.innerHTML = questionsHTML;
    messagesContainer.appendChild(questionsDiv);
    
    // Mensaje de bienvenida
    addMessage('¡Hola! Soy el asistente virtual de las creaciones de Marco. Te ayudo a navegar por este portafolio artístico. ¿Qué te gustaría explorar?', 'bot');
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Función para hacer una pregunta preestablecida
function askQuestion(question) {
    addMessage(question, 'user');
    
    // Mostrar indicador de escritura
    showTypingIndicator();
    
    // Responder después de un delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = getBotResponse(question);
        addMessage(response, 'bot');
    }, 800);
}

// Función para enviar mensaje
function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Agregar mensaje del usuario
    addMessage(message, 'user');
    input.value = '';
    
    // Mostrar indicador de escritura
    showTypingIndicator();
    
    // Simular respuesta del bot después de un delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, Math.random() * 1000 + 500); // Delay aleatorio entre 0.5 y 1.5 segundos
}

// Función para obtener respuesta del bot
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Buscar respuesta exacta
    if (botResponses[lowerMessage]) {
        return botResponses[lowerMessage];
    }
    
    // Respuestas específicas para preguntas exactas
    if (botResponses[message]) {
        return botResponses[message];
    }
    
    // Buscar por palabras clave específicas del contenido
    for (const keyword in keywordResponses) {
        if (lowerMessage.includes(keyword)) {
            return keywordResponses[keyword];
        }
    }
    
    // Respuestas contextuales específicas
    if (lowerMessage.includes('marco') || lowerMessage.includes('autor')) {
        return 'Marco es el creador de este portafolio. Puedes conocer más sobre él, su filosofía y enfoque creativo en la sección "Sobre Mí".';
    }
    
    if (lowerMessage.includes('email') || lowerMessage.includes('correo')) {
        return 'Para contactar a Marco: visita la página "Contacto" desde el menú o escribe directamente a alligator9339@protonmail.com';
    }
    
    if (lowerMessage.includes('navegacion') || lowerMessage.includes('menu') || lowerMessage.includes('como navego')) {
        return 'El menú principal tiene 5 secciones: "Inicio" (página actual), "Creaciones" (galería de trabajos), "Sobre Mí" (biografía de Marco), "Blog" (reflexiones), y "Contacto" (información de contacto).';
    }
    
    if (lowerMessage.includes('portafolio') || lowerMessage.includes('sitio') || lowerMessage.includes('web')) {
        return 'Este portafolio presenta las creaciones de Marco que integran tecnología, filosofía y experiencia personal. Explora cada sección para descubrir su trabajo.';
    }
    
    if (lowerMessage.includes('que puedo') || lowerMessage.includes('que hacer')) {
        return 'Puedes: explorar la galería de "Creaciones", leer reflexiones en el "Blog", conocer a Marco en "Sobre Mí", o ir a "Contacto" para comunicarte con él.';
    }
    
    // Respuesta por defecto con guía
    return 'Para ayudarte mejor, puedes preguntarme sobre: navegación por las secciones, contenido de las creaciones, información del blog, o cómo contactar a Marco. ¿Qué te interesa explorar?';
}

// Función para agregar mensaje al chat
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    messageDiv.innerHTML = `
        <div class="message-content">${text}</div>
        <div class="message-time">${timeString}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Función para mostrar indicador de escritura
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Función para ocultar indicador de escritura
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatbot-input');
    
    // Enfocar input cuando se abre el chat
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const chatbox = mutation.target;
                if (chatbox.style.display === 'flex') {
                    setTimeout(() => chatInput.focus(), 100);
                }
            }
        });
    });
    
    const chatbox = document.getElementById('chatbot-box');
    observer.observe(chatbox, { attributes: true });
    
    // Prevenir que el formulario se envíe si se presiona Enter
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
});

// Cerrar chatbot si se hace clic fuera de él
document.addEventListener('click', function(e) {
    const chatbox = document.getElementById('chatbot-box');
    const toggleBtn = document.getElementById('chatbot-toggle');
    
    if (chatbotOpen && !chatbox.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleChatbot();
    }
});
