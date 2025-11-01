document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const progressBar = document.querySelector('.progress-bar');

    const questions = [
        {
            text: "كيف تشعرين ببشرتك في نهاية اليوم؟",
            name: "q1",
            options: {
                oily: "لامعة ومدهنة",
                dry: "مشدودة وجافة",
                combination: "دهنية في منطقة T وجافة في مناطق أخرى",
                normal: "متوازنة ومريحة"
            }
        },
        {
            text: "ما هو حجم مسام بشرتك؟",
            name: "q2",
            options: {
                oily: "واسعة وواضحة",
                dry: "صغيرة وغير مرئية",
                combination: "واسعة في منطقة T وصغيرة في مناطق أخرى",
                normal: "متوسطة الحجم"
            }
        },
        {
            text: "كم مرة تظهر الحبوب على بشرتك؟",
            name: "q3",
            options: {
                oily: "بشكل متكرر",
                dry: "نادراً جداً",
                combination: "أحياناً، خاصة في منطقة T",
                normal: "نادراً"
            }
        },
        {
            text: "بعد غسل وجهك، كيف تشعرين ببشرتك إذا لم تضعي أي منتج؟",
            name: "q4",
            options: {
                oily: "تبدأ باللمعان بسرعة",
                dry: "تشعرين بجفاف شديد وانزعاج",
                combination: "جفاف في الخدين ولمعان في الجبهة والأنف",
                normal: "تشعرين بالراحة"
            }
        },
        {
            text: "هل تعانين من احمرار وتهيج في البشرة؟",
            name: "q5",
            options: {
                sensitive: "نعم، بسهولة",
                'not-sensitive': "لا، نادراً"
            }
        },
        {
            text: "كيف تتفاعل بشرتك مع منتجات جديدة؟",
            name: "q6",
            options: {
                sensitive: "تتحسس وتتهيج بسرعة",
                'not-sensitive': "تتقبلها بشكل جيد"
            }
        },
        {
            text: "هل تلاحظين خطوطاً دقيقة وتجاعيد؟",
            name: "q7",
            options: {
                dry: "نعم، بشكل واضح",
                oily: "لا، بشكل قليل",
                normal: "قليلة ومناسبة للعمر"
            }
        },
        {
            text: "ما هي أكبر مشكلة تواجهينها مع بشرتك؟ (اختياري)",
            name: "problems",
            type: "checkbox",
            options: {
                acne: "حب الشباب",
                blackheads: "الرؤوس السوداء",
                redness: "الاحمرار",
                wrinkles: "التجاعيد"
            }
        }
    ];

    let currentQuestionIndex = 0;
    const userAnswers = {};

    function showQuestion(index) {
        const questionData = questions[index];
        const questionSlide = document.createElement('div');
        questionSlide.className = 'question-slide';

        const questionTitle = document.createElement('h2');
        questionTitle.className = 'question-title';
        questionTitle.textContent = questionData.text;
        questionSlide.appendChild(questionTitle);

        const answersContainer = document.createElement('div');
        answersContainer.className = 'answers';
        if (questionData.type === 'checkbox') {
            answersContainer.classList.add('checkbox-answers');
        }

        for (const [value, text] of Object.entries(questionData.options)) {
            const answerLabel = document.createElement('label');
            answerLabel.className = 'answer';

            const inputType = questionData.type === 'checkbox' ? 'checkbox' : 'radio';
            const input = document.createElement('input');
            input.type = inputType;
            input.name = questionData.name;
            input.value = value;

            answerLabel.appendChild(document.createTextNode(text));
            answerLabel.appendChild(input);
            
            answerLabel.addEventListener('click', (e) => {
                if (inputType === 'radio') {
                    userAnswers[questionData.name] = value;
                    nextQuestion();
                } else {
                    answerLabel.classList.toggle('selected');
                    const selectedProblems = Array.from(answersContainer.querySelectorAll('input:checked')).map(cb => cb.value);
                    userAnswers[questionData.name] = selectedProblems;
                }
            });

            answersContainer.appendChild(answerLabel);
        }

        questionSlide.appendChild(answersContainer);

        if (questionData.type === 'checkbox') {
            const submitButton = document.createElement('button');
            submitButton.id = 'submit-btn';
            submitButton.className = 'cta-button';
            submitButton.textContent = 'عرض النتيجة';
            submitButton.onclick = () => calculateResult();
            questionSlide.appendChild(submitButton);
        }

        quizContainer.innerHTML = '';
        quizContainer.appendChild(questionSlide);
        questionSlide.classList.add('active');

        updateProgressBar();
    }

    function nextQuestion() {
        const currentSlide = document.querySelector('.question-slide.active');
        if (currentSlide) {
            currentSlide.classList.add('exit');
            currentSlide.addEventListener('animationend', () => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion(currentQuestionIndex);
                } else {
                    calculateResult();
                }
            }, { once: true });
        }
    }

    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function calculateResult() {
        const answers = {
            oily: 0,
            dry: 0,
            combination: 0,
            normal: 0,
            sensitive: 0
        };

        for (const key in userAnswers) {
            const value = userAnswers[key];
            if (Array.isArray(value)) continue;

            if (value === 'sensitive') {
                answers.sensitive++;
            } else if (answers.hasOwnProperty(value)) {
                answers[value]++;
            }
        }

        let result = '';
        if (answers.oily > 1) {
            result = 'oily';
        } else if (answers.dry > 1) {
            result = 'dry';
        } else if (answers.combination > 1) {
            result = 'combination';
        } else {
            result = 'normal';
        }

        if (answers.sensitive > 0) {
            result += '-sensitive';
        }

        const problems = userAnswers.problems || [];
        window.location.href = `result.html?type=${result}&problems=${problems.join(',')}`;
    }

    showQuestion(currentQuestionIndex);
});
