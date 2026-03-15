
        // ==================================================================
        //  PART 1: 3D ANIMATIONS WITH THREE.JS (Crazy, interactive, educative)
        // ==================================================================
        // We import Three.js and create a scene with floating, rotating objects
        // that represent knowledge: books, atoms, molecules, etc.
        import * as THREE from 'three';
        import { OrbitControls } from 'https://unpkg.com/three@0.128.0/examples/jsm/controls/OrbitControls.js';

        // --- SETUP SCENE, CAMERA, RENDERER ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x050510); // deep space blue

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 12);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true; // for cool shadows
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById('canvas-container').appendChild(renderer.domElement);

        // --- CONTROLS: allow user to interact with 3D world ---
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // smooth inertia
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8;
        controls.enableZoom = true;
        controls.enablePan = false;
        controls.rotateSpeed = 0.5;
        controls.enableTilt = true;
        controls.enableRotate = true;

        // --- LIGHTS: create a dramatic, colorful atmosphere ---
        // Ambient base light
        const ambientLight = new THREE.AmbientLight(0x404060);
        scene.add(ambientLight);

        // Main directional light (simulates sun)
        const mainLight = new THREE.DirectionalLight(0xffeedd, 1);
        mainLight.position.set(5, 5, 10);
        mainLight.castShadow = true;
        mainLight.receiveShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        scene.add(mainLight);

        // Colorful point lights for vibrant reflections
        const light1 = new THREE.PointLight(0xff00ff, 1, 20);
        light1.position.set(3, 3, 3);
        scene.add(light1);
        const light2 = new THREE.PointLight(0x00ffff, 1, 20);
        light2.position.set(-3, 1, 5);
        scene.add(light2);
        const light3 = new THREE.PointLight(0xffff00, 0.8, 25);
        light3.position.set(2, -2, -5);
        scene.add(light3);

        // --- CREATE AMAZING 3D OBJECTS representing learning subjects ---

        // 1. Central glowing atom (Science) - a nucleus with orbiting electrons
        const nucleus = new THREE.Mesh(
            new THREE.SphereGeometry(0.8, 32, 32),
            new THREE.MeshStandardMaterial({ color: 0xff5500, emissive: 0x442200, roughness: 0.3, metalness: 0.7 })
        );
        nucleus.castShadow = true;
        nucleus.receiveShadow = true;
        scene.add(nucleus);

        // Orbiting electrons (3 rings with small spheres)
        const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x33ccff, emissive: 0x004466, wireframe: true, transparent: true, opacity: 0.3 });
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.05, 16, 100), ringMaterial);
        ring1.rotation.x = Math.PI / 2;
        ring1.rotation.z = 0.3;
        scene.add(ring1);
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.05, 16, 100), ringMaterial);
        ring2.rotation.y = Math.PI / 2;
        ring2.rotation.x = 0.7;
        scene.add(ring2);
        const ring3 = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.05, 16, 100), ringMaterial);
        ring3.rotation.x = 1.2;
        ring3.rotation.z = 0.9;
        scene.add(ring3);

        // Electron particles
        const electronGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const electronMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x0088aa });
        const electron1 = new THREE.Mesh(electronGeo, electronMat);
        const electron2 = new THREE.Mesh(electronGeo, electronMat);
        const electron3 = new THREE.Mesh(electronGeo, electronMat);
        scene.add(electron1);
        scene.add(electron2);
        scene.add(electron3);

        // 2. Floating books (Mathematics & Literature) - a stack of rotating books
        const bookGroup = new THREE.Group();
        for (let i = 0; i < 5; i++) {
            const book = new THREE.Mesh(
                new THREE.BoxGeometry(0.8, 0.1, 0.5),
                new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0xffaa33 : 0x33aaff, emissive: 0x221100, roughness: 0.4 })
            );
            book.position.y = i * 0.15;
            book.rotation.z = 0.1;
            book.rotation.x = -0.1;
            book.castShadow = true;
            book.receiveShadow = true;
            bookGroup.add(book);
        }
        bookGroup.position.set(-2, 1, 0);
        scene.add(bookGroup);

        // 3. A glowing globe (Geography)
        const globeGroup = new THREE.Group();
        const globe = new THREE.Mesh(
            new THREE.SphereGeometry(0.9, 32, 32),
            new THREE.MeshStandardMaterial({ color: 0x2288ff, emissive: 0x004466, roughness: 0.2, metalness: 0.8 })
        );
        globe.castShadow = true;
        globe.receiveShadow = true;
        globeGroup.add(globe);
        // Add a wireframe around it
        const wireframeGlobe = new THREE.Mesh(
            new THREE.SphereGeometry(0.92, 32, 32),
            new THREE.MeshBasicMaterial({ wireframe: true, color: 0x88ddff, transparent: true, opacity: 0.2 })
        );
        globeGroup.add(wireframeGlobe);
        // Tilt the globe
        globeGroup.rotation.x = 0.3;
        globeGroup.rotation.z = 0.5;
        globeGroup.position.set(2.5, 0.5, -1);
        scene.add(globeGroup);

        // 4. Abstract floating particles (thousands of tiny stars) to create a magical atmosphere
        const particleCount = 2000;
        const particleGeo = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i += 3) {
            particlePositions[i] = (Math.random() - 0.5) * 40;
            particlePositions[i+1] = (Math.random() - 0.5) * 40;
            particlePositions[i+2] = (Math.random() - 0.5) * 40;
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0x88aaff,
            size: 0.08,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // 5. A DNA-like helix (Biology)
        const helixGroup = new THREE.Group();
        const sphereMat = new THREE.MeshStandardMaterial({ color: 0xff44aa, emissive: 0x331122 });
        const connectorMat = new THREE.MeshStandardMaterial({ color: 0x88aaff, emissive: 0x112233 });
        for (let i = 0; i < 10; i++) {
            const angle = i * 0.8;
            const y = i * 0.4 - 2;
            // Two spheres
            const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), sphereMat);
            sphere1.position.set(Math.sin(angle) * 0.8, y, Math.cos(angle) * 0.8);
            sphere1.castShadow = true;
            helixGroup.add(sphere1);
            const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), sphereMat);
            sphere2.position.set(Math.sin(angle + Math.PI) * 0.8, y, Math.cos(angle + Math.PI) * 0.8);
            sphere2.castShadow = true;
            helixGroup.add(sphere2);
            // Connector bar
            const connector = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.6, 8), connectorMat);
            connector.position.set(0, y, 0);
            connector.rotation.z = 1.2;
            connector.rotation.x = 0.8;
            connector.castShadow = true;
            helixGroup.add(connector);
        }
        helixGroup.position.set(0, 0, 3);
        scene.add(helixGroup);

        // Store objects we want to animate in an array for efficiency
        const animatedObjects = [ring1, ring2, ring3, electron1, electron2, electron3, bookGroup, globeGroup, helixGroup, particles];

        // --- ANIMATION LOOP ---
        function animate() {
            requestAnimationFrame(animate);

            // Auto-rotate controls for a cinematic feel
            controls.update();

            // Rotate rings around the atom
            ring1.rotation.y += 0.01;
            ring2.rotation.x += 0.008;
            ring3.rotation.z += 0.006;

            // Move electrons along the rings (simple orbit)
            const time = Date.now() * 0.002;
            electron1.position.x = Math.sin(time) * 1.8;
            electron1.position.z = Math.cos(time) * 1.8;
            electron1.position.y = Math.sin(time * 0.8) * 0.2;

            electron2.position.x = Math.sin(time + 2) * 1.8;
            electron2.position.y = Math.cos(time + 2) * 1.8;
            electron2.position.z = Math.sin(time * 0.7) * 0.5;

            electron3.position.y = Math.sin(time + 3) * 1.8;
            electron3.position.z = Math.cos(time + 3) * 1.8;
            electron3.position.x = Math.cos(time * 0.9) * 0.6;

            // Float the book group
            bookGroup.rotation.y += 0.005;
            bookGroup.position.y = 1 + Math.sin(time * 0.5) * 0.1;

            // Rotate globe
            globeGroup.rotation.y += 0.002;
            globeGroup.rotation.x += 0.001;

            // Slowly rotate helix
            helixGroup.rotation.y += 0.003;
            helixGroup.rotation.x += 0.0015;

            // Rotate particles slowly
            particles.rotation.y += 0.0002;

            renderer.render(scene, camera);
        }

        animate();

        // --- HANDLE WINDOW RESIZE ---
        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        // ==================================================================
        //  PART 2: QUIZ DATA & LOGIC (Educative, interactive)
        // ==================================================================
        // We'll define an array of quiz categories. Each contains a set of questions.
        // Each question has text, options, correct answer index (0-based), and an explanation.
        const quizDatabase = {
            math: {
                name: "Mathematics",
                icon: "🧮",
                questions: [
                    {
                        question: "What is the value of π (pi) approximately?",
                        options: ["3.14", "2.71", "1.62", "4.20"],
                        correct: 0,
                        explanation: "π ≈ 3.14159... It's the ratio of circumference to diameter."
                    },
                    {
                        question: "Solve for x: 2x + 5 = 15",
                        options: ["x = 5", "x = 10", "x = 7.5", "x = 4"],
                        correct: 0,
                        explanation: "2x = 10 → x = 5"
                    },
                    {
                        question: "What is the square root of 144?",
                        options: ["12", "14", "10", "16"],
                        correct: 0,
                        explanation: "12 × 12 = 144"
                    }
                ]
            },
            science: {
                name: "Science",
                icon: "🔬",
                questions: [
                    {
                        question: "What is the chemical symbol for water?",
                        options: ["H2O", "CO2", "NaCl", "O2"],
                        correct: 0,
                        explanation: "H2O: two hydrogen atoms and one oxygen atom."
                    },
                    {
                        question: "Which planet is known as the Red Planet?",
                        options: ["Venus", "Mars", "Jupiter", "Saturn"],
                        correct: 1,
                        explanation: "Mars has a reddish appearance due to iron oxide on its surface."
                    },
                    {
                        question: "What is the hardest natural substance on Earth?",
                        options: ["Gold", "Iron", "Diamond", "Platinum"],
                        correct: 2,
                        explanation: "Diamond is the hardest known natural material."
                    }
                ]
            },
            history: {
                name: "History",
                icon: "🏛️",
                questions: [
                    {
                        question: "In which year did World War II end?",
                        options: ["1945", "1918", "1939", "1944"],
                        correct: 0,
                        explanation: "WWII ended in 1945 with the surrender of Japan and Germany."
                    },
                    {
                        question: "Who was the first President of the United States?",
                        options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
                        correct: 2,
                        explanation: "George Washington served as the first president from 1789 to 1797."
                    },
                    {
                        question: "The ancient Mayans were located mainly on which continent?",
                        options: ["Africa", "Asia", "South America", "Europe"],
                        correct: 2,
                        explanation: "The Mayan civilization was in Mesoamerica, primarily on the Yucatán Peninsula (North & Central America)."
                    }
                ]
            },
            geography: {
                name: "Geography",
                icon: "🌍",
                questions: [
                    {
                        question: "What is the capital of France?",
                        options: ["London", "Berlin", "Madrid", "Paris"],
                        correct: 3,
                        explanation: "Paris has been the capital of France since 987 AD."
                    },
                    {
                        question: "Which is the longest river in the world?",
                        options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
                        correct: 1,
                        explanation: "The Nile is approximately 6,650 km long, slightly longer than the Amazon."
                    },
                    {
                        question: "Which desert is the largest (non-polar) in the world?",
                        options: ["Sahara", "Arabian", "Gobi", "Kalahari"],
                        correct: 0,
                        explanation: "The Sahara Desert in Africa covers about 9.2 million km²."
                    }
                ]
            }
        };

        // --- QUIZ STATE VARIABLES ---
        let currentCategory = null;      // which category is active
        let currentQuestions = [];       // array of questions for this category
        let currentIndex = 0;           // index of current question
        let userAnswers = [];           // store selected answers (indices)
        let score = 0;                // number of correct answers
        let selectedOption = null;      // currently selected option for the displayed question

        // Get modal element
        const modal = document.getElementById('quizModal');
        const modalTitle = document.getElementById('modalCategoryTitle');
        const quizArea = document.getElementById('quizArea');

        // --- ATTACH EVENT LISTENERS TO CARDS ---
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                const category = this.dataset.category;
                startQuiz(category);
            });
        });

        // --- FUNCTION: startQuiz(category) ---
        // Initializes quiz state and opens modal.
        function startQuiz(category) {
            currentCategory = category;
            currentQuestions = quizDatabase[category].questions;
            currentIndex = 0;
            userAnswers = new Array(currentQuestions.length).fill(null); // no answer yet
            score = 0;
            selectedOption = null;
            modalTitle.textContent = `${quizDatabase[category].icon} ${quizDatabase[category].name} Quiz`;
            renderQuestion();
            modal.style.display = 'flex';
        }

        // --- FUNCTION: renderQuestion() ---
        // Displays the current question, options, and navigation.
        function renderQuestion() {
            if (!currentQuestions || currentQuestions.length === 0) return;
            
            const q = currentQuestions[currentIndex];
            // Determine previously selected answer for this question (if any)
            const savedAnswer = userAnswers[currentIndex];
            
            let html = `
                <div style="margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
                    <span style="background: rgba(0,255,255,0.3); padding: 0.3rem 1rem; border-radius: 20px;">Question ${currentIndex+1}/${currentQuestions.length}</span>
                    <span class="score">⭐ Score: ${score}</span>
                </div>
                <div class="quiz-question">${q.question}</div>
                <div class="quiz-options" id="quizOptions">
            `;
            
            q.options.forEach((opt, idx) => {
                const isSelected = (savedAnswer === idx) ? 'selected' : '';
                html += `<div class="quiz-option ${isSelected}" data-opt-index="${idx}">${String.fromCharCode(65+idx)}. ${opt}</div>`;
            });
            
            html += `</div>`;
            
            // Feedback area (if already answered)
            if (savedAnswer !== null) {
                const isCorrect = (savedAnswer === q.correct);
                const feedbackClass = isCorrect ? 'correct-feedback' : 'incorrect-feedback';
                const feedbackText = isCorrect ? '✅ Correct!' : `❌ Incorrect. ${q.explanation}`;
                html += `<div class="quiz-feedback ${feedbackClass}">${feedbackText}</div>`;
            }
            
            // Navigation buttons
            html += `<div class="quiz-nav">`;
            if (currentIndex > 0) {
                html += `<button id="prevBtn">◀ Previous</button>`;
            } else {
                html += `<div></div>`; // placeholder
            }
            
            if (currentIndex < currentQuestions.length - 1) {
                html += `<button id="nextBtn">Next ▶</button>`;
            } else {
                html += `<button id="finishBtn">Finish Quiz</button>`;
            }
            html += `</div>`;

            quizArea.innerHTML = html;

            // Attach event listeners to option divs
            const optionDivs = document.querySelectorAll('.quiz-option');
            optionDivs.forEach(optDiv => {
                optDiv.addEventListener('click', function() {
                    // Remove selected class from all options
                    optionDivs.forEach(el => el.classList.remove('selected'));
                    // Add selected class to this one
                    this.classList.add('selected');
                    const optIndex = parseInt(this.dataset.optIndex);
                    selectedOption = optIndex;
                    // Save the answer
                    userAnswers[currentIndex] = optIndex;
                    // Re-render to show feedback
                    renderQuestion();
                });
            });

            // Attach navigation listeners
            const prevBtn = document.getElementById('prevBtn');
            if (prevBtn) prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; renderQuestion(); } });
            const nextBtn = document.getElementById('nextBtn');
            if (nextBtn) nextBtn.addEventListener('click', () => { if (currentIndex < currentQuestions.length - 1) { currentIndex++; renderQuestion(); } });
            const finishBtn = document.getElementById('finishBtn');
            if (finishBtn) finishBtn.addEventListener('click', showResults);

            // Recalculate score whenever answers change
            calculateScore();
        }

        // --- FUNCTION: calculateScore() ---
        // Loops through userAnswers and counts correct ones.
        function calculateScore() {
            score = 0;
            for (let i = 0; i < currentQuestions.length; i++) {
                if (userAnswers[i] !== null && userAnswers[i] === currentQuestions[i].correct) {
                    score++;
                }
            }
            // Update score display if present
            const scoreSpan = document.querySelector('.score');
            if (scoreSpan) scoreSpan.innerHTML = `⭐ Score: ${score}`;
        }

        // --- FUNCTION: showResults() ---
        // Displays final score and correct answers.
        function showResults() {
            calculateScore();
            let resultHtml = `<h2 style="color: #ffd966;">🎉 Quiz Completed!</h2>`;
            resultHtml += `<p style="font-size: 2rem; margin: 1rem 0;">Your Score: ${score} / ${currentQuestions.length}</p>`;
            resultHtml += `<h3>Review Answers:</h3>`;
            currentQuestions.forEach((q, idx) => {
                const userAns = userAnswers[idx];
                const isCorrect = (userAns === q.correct);
                const correctLetter = String.fromCharCode(65 + q.correct);
                const correctText = q.options[q.correct];
                resultHtml += `<div style="margin: 1rem 0; padding: 0.8rem; background: rgba(255,255,255,0.1); border-radius: 10px;">`;
                resultHtml += `<p><strong>Q${idx+1}:</strong> ${q.question}</p>`;
                if (userAns !== null) {
                    resultHtml += `<p>Your answer: ${String.fromCharCode(65+userAns)}. ${q.options[userAns]}</p>`;
                } else {
                    resultHtml += `<p style="color: orange;">You did not answer this question.</p>`;
                }
                resultHtml += `<p style="color: ${isCorrect ? '#aaffaa' : '#ffaaaa'};">Correct: ${correctLetter}. ${correctText}</p>`;
                resultHtml += `<p style="font-style: italic;">💡 ${q.explanation}</p>`;
                resultHtml += `</div>`;
            });
            resultHtml += `<div style="text-align: center; margin-top: 2rem;"><button onclick="closeModal()">Close</button></div>`;
            quizArea.innerHTML = resultHtml;
        }

        // --- GLOBAL FUNCTION: closeModal() ---
        // Closes the quiz modal.
        window.closeModal = function() {
            modal.style.display = 'none';
            // Optionally reset
        }

        // Close modal if clicking outside content
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

   
    