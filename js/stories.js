/**
 * Stories Page Logic
 * Handles stories data, rendering, filtering, and modal interactions.
 */

const stories = [
    {
        id: 'testimonial-1',
        category: 'community-care',
        author: 'Margaret, Client',
        title: 'A sense of relief for the whole family',
        message: 'The consistency of the support team has made a world of difference. I don\'t have to explain myself every time someone new walks in. They just know my routine, and that gives me so much confidence to stay in my own home.',
        fullStory: 'Margaret had been struggling with inconsistent support scheduling which caused significant anxiety. By implementing a dedicated team and a structured "Client First" routine, we were able to restore her confidence. "It\'s not just the help with daily tasks," her daughter says, "it\'s the peace of mind knowing she\'s with people who actually care about her preferences."'
    },
    {
        id: 'testimonial-2',
        category: 'allied-health',
        author: 'Robert, Client',
        title: 'Practical plans that actually work',
        message: 'The Occupational Therapy assessment wasn\'t just a list of things I couldn\'t do. It was a plan for all the things I can do with just a few small changes. I feel safer and more independent than I have in years.',
        fullStory: 'Robert wanted to maintain his independence but was worried about safety in his kitchen and bathroom. Our OT focused on functional goals—preparing his own morning coffee and showering safely. By introducing micro-modifications and simple strategies, Robert achieved his goals within three weeks. "The plan was realistic," Robert notes, "it didn\'t feel like a medical checklist."'
    },
    {
        id: 'testimonial-3',
        category: 'hospital-to-home',
        author: 'The Thompson Family',
        title: 'A smooth transition during a stressful time',
        message: 'Returning home from the hospital felt overwhelming until the Cross Care team stepped in. They coordinated everything—from nursing check-ins to equipment delivery. We never felt alone in the process.',
        fullStory: 'The Thompson family was facing a complex discharge with multiple moving parts. Cross Care acted as the single point of coordination, ensuring that the clinical plan established in the hospital was seamlessly continued at home. Their lead clinician provided daily updates to the family, reducing the emotional burden of the transition.'
    },
    {
        id: 'testimonial-4',
        category: 'community-care',
        author: 'Sarah, Participant',
        title: 'Reconnecting with my community',
        message: 'I used to feel isolated because getting out was so difficult. My support worker didn\'t just drive me places; she helped me build the confidence to join a local art group. Now I have friends I see every week.',
        fullStory: 'Sarah had withdrawn from social activities due to mobility challenges and anxiety. Her support worker, trained in capacity building, started with small outings to quiet places. Over three months, they worked towards Sarah\'s goal of joining an art class. Today, Sarah attends independently sometimes, a huge milestone in her journey.'
    },
    {
        id: 'testimonial-5',
        category: 'allied-health',
        author: 'David, Client',
        title: 'Regaining strength and mobility',
        message: 'The physio exercises were tailored exactly to what I needed. I can now walk to the mailbox and back without my frame, which was my big goal for the year.',
        fullStory: 'David was recovering from hip surgery and feared he would lose his independence. Our mobile physiotherapist designed a home-based exercise program that used his own furniture and environment. This practical approach meant David did his exercises more often, leading to a faster recovery than expected.'
    },
    {
        id: 'testimonial-6',
        category: 'hospital-to-home',
        author: 'Emily, Daughter of Client',
        title: 'Compassionate palliation at home',
        message: 'Bringing Mum home for her final weeks was her wish, but we were scared. The nursing team was incredible—managing her pain and supporting us through the hardest days. They allowed us to just be her family.',
        fullStory: 'The family wanted their mother to spend her end-of-life phase at home but lacked the clinical skills to manage complex symptoms. Cross Care Group provided 24/7 nursing support, working closely with the palliative care doctors. The team\'s presence ensured the client was pain-free and comfortable, while the family received emotional support and respite.'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Search & Filter Logic
    const grid = document.getElementById('stories-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Modal Logic
    const modal = document.getElementById('story-modal');
    const modalContainer = document.getElementById('story-details-container');
    const closeModal = document.getElementById('close-modal');

    if (!grid || !modal) return;

    function renderStories(filter = 'all') {
        grid.innerHTML = '';
        const filtered = filter === 'all' ? stories : stories.filter(s => s.category === filter);

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="col-span-full py-16 text-center text-slate-400">No stories found.</div>';
            return;
        }

        filtered.forEach(story => {
            const card = document.createElement('div');
            card.className = 'story-card bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col cursor-pointer relative group';
            card.onclick = () => openModal(story.id);

            card.innerHTML = `
                <div class="absolute top-8 right-8 text-ccg-gold/20">
                    <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V5C14.017 4.44772 14.4647 4 15.017 4H20.017C21.1216 4 22.017 4.89543 22.017 6V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.01705 21L3.01705 18C3.01705 16.8954 3.91248 16 5.01705 16H8.01705C8.56933 16 9.01705 15.5523 9.01705 15V9C9.01705 8.44772 8.56933 8 8.01705 8H4.01705C3.46477 8 3.01705 7.55228 3.01705 7V5C3.01705 4.44772 3.46477 4 4.01705 4H9.01705C10.1216 4 11.017 4.89543 11.017 6V15C11.017 18.3137 8.33075 21 5.01705 21H3.01705Z"/></svg>
                </div>
                <div class="flex items-center gap-3 mb-8">
                    <span class="text-[10px] font-black uppercase tracking-[0.2em] text-ccg-teal bg-ccg-teal/10 px-3 py-1 rounded-full">${story.category.replace(/-/g, ' ')}</span>
                </div>
                <p class="text-xl text-ccg-navy font-bold mb-8 flex-1 leading-relaxed">"${story.message}"</p>
                <div class="mt-auto">
                    <span class="block text-ccg-navy font-black text-xs uppercase tracking-widest mb-1">— ${story.author}</span>
                    <span class="block text-slate-400 text-[10px] font-bold uppercase tracking-widest">${story.title}</span>
                </div>
                <div class="mt-8 flex items-center gap-2 text-ccg-gold font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-3 transition-all">
                    Read full message
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-ccg-navy', 'text-white');
                    b.classList.add('bg-white', 'text-ccg-navy/60', 'border-slate-200');
                });
                btn.classList.add('active', 'bg-ccg-navy', 'text-white');
                btn.classList.remove('bg-white', 'text-ccg-navy/60', 'border-slate-200');
                renderStories(btn.dataset.filter);
            });
        });
    }

    function openModal(id) {
        const story = stories.find(s => s.id === id);
        if (!story) return;

        modalContainer.innerHTML = `
            <div class="px-6 py-12 md:p-16 max-w-4xl mx-auto relative">
                <!-- Header Section -->
                <div class="text-center mb-12 md:mb-16">
                    <div class="inline-flex items-center gap-2 bg-white border border-slate-100 shadow-sm px-5 py-2.5 rounded-full mb-8">
                        <span class="w-2 h-2 rounded-full ${story.category === 'community-care' ? 'bg-ccg-teal' : story.category === 'allied-health' ? 'bg-ccg-gold' : 'bg-ccg-navy'}"></span>
                        <span class="text-ccg-navy font-black text-[11px] uppercase tracking-[0.2em] leading-none">${story.category.replace(/-/g, ' ')} Feedback</span>
                    </div>
                    <h2 class="text-3xl md:text-5xl lg:text-6xl font-black text-ccg-navy mb-6 leading-[1.1] tracking-tight text-center max-w-3xl mx-auto">"${story.title}"</h2>
                    <div class="flex items-center justify-center gap-6 text-slate-400 font-bold text-[13px] uppercase tracking-[0.25em]">
                        <span>${story.author}</span>
                    </div>
                </div>

                <!-- Content Box -->
                <div class="bg-[#F7F9FB] p-8 md:p-14 rounded-[2.5rem] relative isolate overflow-hidden">
                    <!-- Decorative Background element -->
                    <div class="absolute top-0 right-0 -mt-10 -mr-10 text-slate-200/50 -z-10 select-none pointer-events-none">
                       <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V5C14.017 4.44772 14.4647 4 15.017 4H20.017C21.1216 4 22.017 4.89543 22.017 6V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.01705 21L3.01705 18C3.01705 16.8954 3.91248 16 5.01705 16H8.01705C8.56933 16 9.01705 15.5523 9.01705 15V9C9.01705 8.44772 8.56933 8 8.01705 8H4.01705C3.46477 8 3.01705 7.55228 3.01705 7V5C3.01705 4.44772 3.46477 4 4.01705 4H9.01705C10.1216 4 11.017 4.89543 11.017 6V15C11.017 18.3137 8.33075 21 5.01705 21H3.01705Z"/></svg>
                    </div>

                    <div class="prose prose-lg md:prose-xl max-w-none">
                        <p class="text-xl md:text-2xl leading-relaxed md:leading-relaxed mb-10 text-ccg-navy/90 font-serif italic">"${story.message}"</p>
                        
                        <div class="flex items-center gap-4 py-8">
                            <div class="h-px bg-slate-200 flex-1"></div>
                            <h4 class="text-xs font-black text-slate-400 uppercase tracking-[0.25em] m-0 shrink-0">The Context</h4>
                            <div class="h-px bg-slate-200 flex-1"></div>
                        </div>
                        
                        <p class="text-slate-600 font-medium leading-relaxed text-base md:text-lg">${story.fullStory}</p>
                    </div>
                </div>

                <div class="mt-12 md:mt-16 text-center">
                    <button id="close-modal-btn" class="group inline-flex items-center gap-2 text-[11px] font-black text-ccg-navy bg-white hover:bg-ccg-navy hover:text-white transition-all uppercase tracking-[0.2em] px-8 py-4 rounded-full shadow-lg hover:shadow-xl border border-slate-100 hover:border-ccg-navy transform hover:-translate-y-0.5">
                        <span>Close Story</span>
                    </button>
                </div>
            </div>
        `;

        modal.classList.remove('invisible', 'opacity-0');
        document.body.style.overflow = 'hidden';

        // Reset scroll position to top
        const modalContent = document.getElementById('modal-content');
        if (modalContent) modalContent.scrollTop = 0;

        // Improve accessibility focus
        const closeBtn = document.getElementById('close-modal-btn');
        if (closeBtn) closeBtn.addEventListener('click', closeModalFunc);
    }

    function closeModalFunc() {
        modal.classList.add('invisible', 'opacity-0');
        document.body.style.overflow = '';
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeModalFunc();
        }
    });

    // Initial render
    renderStories();
});
