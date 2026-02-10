/**
 * Blog Page Logic
 * Handles articles data, rendering, filtering, search, and modal interactions.
 */

// Blog Data
const articles = [
    {
        id: 'article-hospital-to-home-1',
        category: 'hospital-to-home',
        categoryLabel: 'Hospital to Home',
        title: 'Seamless Transitions: From Hospital Ward to Home Comfort',
        date: 'Feb 8, 2024',
        readTime: '4 min read',
        image: '../../images/blog-hospital-to-home.png',
        excerpt:
            'Explore the critical steps in transitioning from hospital to home, and how dedicated support can reduce readmission risks and speed up recovery.',
        body: [
            { type: 'heading', content: 'The Critical Transition Phase' },
            {
                type: 'paragraph',
                content:
                    'Leaving the hospital is a significant milestone in any recovery journey. It signals a move away from acute care and back towards independence. However, the first few weeks at home are crucial. Without the right support, this transition can be overwhelming and fraught with challenges.'
            },
            {
                type: 'paragraph',
                content:
                    'At Cross Care Group, we specialise in bridging this gap. We understand that recovery doesn’t stop at the hospital exit doors; it continues in the comfort and familiarity of your own home.'
            },
            { type: 'heading', content: 'Clinical Expertise at Home' },
            {
                type: 'paragraph',
                content:
                    'One of the biggest concerns during this transition is the loss of immediate clinical oversight. Our Hospital to Home service addresses this by brings essential care directly to your living room.'
            },
            {
                type: 'paragraph',
                content:
                    'From medication management and wound care to monitoring vital signs, our registered nurses and support staff ensure that your medical needs are met with the highest standards of safety and professionalism.'
            },
            { type: 'heading', content: 'Reducing Readmission Risks' },
            {
                type: 'paragraph',
                content:
                    'Studies show that proper post-acute support significantly lowers the chance of hospital readmission. By having a dedicated team to identify early warning signs and manage complications, we help you stay safely at home.'
            },
            {
                type: 'paragraph',
                content:
                    'Our approach is proactive, not reactive. We work closely with your hospital discharge team to create a seamless care plan that anticipates your needs before you even walk through your front door.'
            },
            { type: 'heading', content: 'Restoring Confidence' },
            {
                type: 'paragraph',
                content:
                    'Beyond the physical aspects, returning home can be emotionally taxing. Our support workers provide the reassurance and companionship needed to rebuild confidence, empowering you to reclaim your daily routine at your own pace.'
            }
        ]
    },
    {
        id: 'article-community-care-1',
        category: 'community-care',
        categoryLabel: 'Community Care',
        title: 'Empowering Independence: The Heart of Community Care',
        date: 'Feb 5, 2024',
        readTime: '5 min read',
        image: '../../images/blog-community-care.png',
        excerpt:
            'Discover how community care services support individuals to live independently, stay connected, and thrive in their own homes and neighbourhoods.',
        body: [
            { type: 'heading', content: 'More Than Just Support' },
            {
                type: 'paragraph',
                content:
                    'Community care is fundamentally about fostering a sense of belonging and autonomy. It allows individuals who might otherwise need institutional care to remain in the homes they love, surrounded by the memories and communities they cherish.'
            },
            {
                type: 'paragraph',
                content:
                    'At Cross Care Group, we believe that support should be an enabler, not a limitation. Our goal is to provide just the right amount of assistance to help you maintain your independence without compromising your dignity.'
            },
            { type: 'heading', content: 'Staying Connected' },
            {
                type: 'paragraph',
                content:
                    'Isolation can be a major challenge for many living with disabilities or age-related conditions. Community care plays a vital role in combating loneliness by facilitating social connections.'
            },
            {
                type: 'paragraph',
                content:
                    'Whether it’s assistance with grocery shopping, transport to social clubs, or simply a companion for a morning coffee, our support workers are there to ensure you remain an active and valued member of your community.'
            },
            { type: 'heading', content: 'Tailored to You' },
            {
                type: 'paragraph',
                content:
                    'No two individuals are alike, and neither are our care plans. We take a person-centred approach, listening to your preferences, goals, and routines to design a support structure that fits seamlessly into your life.'
            },
            {
                type: 'paragraph',
                content:
                    'From assistance with daily household tasks and meal preparation to personal care and mobility support, our services are flexible and adaptable, changing as your needs change.'
            },
            { type: 'heading', content: 'A Partnership of Trust' },
            {
                type: 'paragraph',
                content:
                    'Inviting someone into your home requires trust. We pride ourselves on building strong, respectful relationships with our clients. Our support workers are not just service providers; they are partners in your journey towards a fulfilling and independent life.'
            }
        ]
    },
    {
        id: 'article-1',
        category: 'allied-health',
        categoryLabel: 'Allied Health',
        title: 'Rheumatoid Arthritis and the Role of Physical Exercise',
        date: 'Feb 1, 2024',
        readTime: '6 min read',
        image: '../../images/blog-allied-health-article-1.png',
        excerpt:
            'A plain-language guide to how tailored, low-impact exercise can help manage rheumatoid arthritis—reducing pain and stiffness, improving strength and mobility, and supporting overall wellbeing.',
        body: [
            {
                type: 'paragraph',
                content:
                    'Rheumatoid arthritis (RA) is a chronic autoimmune disease impacting not only joints but also significantly affecting overall quality of life. The discomfort and stiffness that accompany RA often lead to reduced physical activity. However, it’s important to understand the beneficial dynamics between rheumatoid arthritis and exercise.'
            },
            {
                type: 'paragraph',
                content:
                    'Engaging in regular, specifically designed physical activity is crucial for individuals with rheumatoid arthritis. It can notably decrease joint pain, enhance flexibility, boost muscle strength, and improve general wellbeing. Incorporating low-impact exercises such as walking, cycling, aquatic aerobics, swimming, and yoga can be an effective way to integrate exercise into daily life.'
            },
            {
                type: 'paragraph',
                content:
                    'At the core of managing RA lies a paradox: the need for physical activity despite experiencing pain and discomfort. Contrary to possibly causing more pain, well-chosen and appropriate exercises can actually serve as a valuable tool in managing RA symptoms. Regular physical activity, when done correctly, can alleviate pain and improve joint function, highlighting its importance in RA management.'
            },

            { type: 'heading', content: 'The Benefits of Exercise for Rheumatoid Arthritis Management' },
            {
                type: 'paragraph',
                content:
                    'Exercise plays a vital role in managing RA, offering multiple health benefits that might appear counterintuitive initially. Moving joints that are affected by RA pain can actually lead to significant improvements:'
            },
            {
                type: 'paragraph',
                content:
                    '1) Reduction of Joint Pain and Stiffness: Regular exercise helps maintain joint movement, preserving range of motion and flexibility, which can lead to a noticeable decrease in joint pain and stiffness.'
            },
            {
                type: 'paragraph',
                content:
                    '2) Muscle Strengthening: Strengthening the muscles surrounding affected joints provides better support, reducing stress on joints and improving stability and function.'
            },
            {
                type: 'paragraph',
                content:
                    '3) Improved Physical Function: Physical activity can make everyday tasks easier by enhancing overall function, supporting a better quality of life.'
            },
            {
                type: 'paragraph',
                content:
                    '4) Weight Management: Maintaining a healthy weight reduces extra stress on weight-bearing joints like hips and knees. Exercise supports weight management and can reduce this additional load.'
            },
            {
                type: 'paragraph',
                content:
                    '5) Cardiovascular Health: People with RA are at increased risk of cardiovascular disease. Aerobic exercise such as swimming, walking, and cycling supports heart health and can help reduce risk.'
            },
            {
                type: 'paragraph',
                content:
                    '6) Bone Strength: Regular exercise helps maintain bone strength—especially important for people on long-term corticosteroids. Stronger bones can reduce the risk of osteoporosis.'
            },

            { type: 'heading', content: 'Optimizing Physical Activity for Rheumatoid Arthritis Management' },
            {
                type: 'paragraph',
                content:
                    'When managing RA through physical activity, it’s important to personalise your routine to your capabilities and limitations. Here are some practical guidelines:'
            },
            {
                type: 'paragraph',
                content:
                    '1) Choose low-impact exercises: Swimming, walking, and cycling can deliver benefits while minimising joint stress.'
            },
            {
                type: 'paragraph',
                content:
                    '2) Include flexibility and strength training: Flexibility helps maintain mobility, while strength training builds supportive muscle around joints.'
            },
            {
                type: 'paragraph',
                content:
                    '3) Avoid high-impact activities initially: Jarring movements can exacerbate pain, especially early on.'
            },
            {
                type: 'paragraph',
                content:
                    '4) Listen to your body: If pain or discomfort increases, pause or modify the activity to make it more comfortable.'
            },
            {
                type: 'paragraph',
                content:
                    '5) Use assistive devices if needed: Braces, splints, or walking aids can add support and help make exercise safer and more effective.'
            },

            { type: 'heading', content: 'Recommended Exercises for Rheumatoid Arthritis' },
            {
                type: 'paragraph',
                content:
                    'Low-impact aerobic exercise: Brisk walking, swimming, and cycling can elevate heart rate without placing undue stress on joints.'
            },
            {
                type: 'paragraph',
                content:
                    '1) Strength training: Use light weights or resistance bands with slow, controlled movements to strengthen muscles around the joints.'
            },
            {
                type: 'paragraph',
                content:
                    '2) Water aerobics: Water resistance supports strength-building while buoyancy reduces joint stress—often helpful for pain and stiffness.'
            },
            {
                type: 'paragraph',
                content:
                    '3) Regular stretching: Stretching supports joint flexibility and can reduce stiffness.'
            },
            {
                type: 'paragraph',
                content:
                    '4) Yoga and Pilates: These can improve flexibility, strength, and balance, while controlled breathing may help reduce stress and stiffness.'
            },
            {
                type: 'paragraph',
                content:
                    '5) Range of motion exercises: Moving joints through their full range can help maintain and improve joint function and flexibility.'
            },

            { type: 'heading', content: 'Support Worker Assistance in Physical Activity for RA Management' },
            {
                type: 'paragraph',
                content:
                    '1) Tailored exercise guidance: Cross Care Group Support Workers can provide exercise recommendations designed for RA needs, including safer options and modifications.'
            },
            {
                type: 'paragraph',
                content:
                    '2) Leveraging partnerships: Cross Care Group has strategic partnerships with sports and community organisations to help develop specialised physical activity programs and inclusive sporting environments.'
            },
            {
                type: 'paragraph',
                content:
                    '3) Education and active participation: These initiatives extend support beyond traditional services—focusing on education, engagement, and skill development through tailored physical activity.'
            },
            {
                type: 'paragraph',
                content:
                    '4) Comprehensive support and access to resources: Support Workers can help connect clients to relevant opportunities and resources as part of a well-rounded approach to managing RA.'
            },
            {
                type: 'paragraph',
                content:
                    '5) Holistic care: Choosing Cross Care Group can provide access to a network that supports RA management, including guidance and support with physical activity.'
            },
            {
                type: 'paragraph',
                content:
                    'In essence, Support Workers can play a pivotal role in advising and guiding people with RA in physical activities—helping tailor routines and connect to supportive programs and resources.'
            },

            { type: 'heading', content: 'To find out more, reach out!' },
        ]
    }, {
        id: 'article-complex-care-24-7',
        category: 'complex-care',
        categoryLabel: 'Complex Care',
        title: '24/7 Care for Complex Needs: A Cross Care Group Approach',
        date: 'Jan 30, 2024',
        readTime: '4 min read',
        image: '../../images/blog-complex-care-article-24-7.png',
        excerpt:
            'An overview of Cross Care Group’s 24/7 complex care approach—personalised support plans, continuous staffing, and NDIS-aligned care that adapts as needs change.',
        body: [
            { type: 'heading', content: 'Complexity simplified' },
            {
                type: 'paragraph',
                content:
                    'At Cross Care Group, we understand that each individual with complex needs has a unique story. Our mission is to provide comprehensive 24/7 care that addresses not just the physical aspects of these needs, but the emotional and social ones as well.'
            },
            {
                type: 'paragraph',
                content:
                    'Our clients face diverse challenges, ranging from intellectual disabilities to chronic health conditions. We respond with personalised care plans, meticulously tailored to each client, to meet medical, emotional, and social requirements.'
            },
            {
                type: 'paragraph',
                content:
                    'Our 24/7 care services are the cornerstone of our commitment to those with complex needs. Continuous support is critical for managing the dynamic and often unpredictable nature of complex conditions.'
            },
            {
                type: 'paragraph',
                content:
                    'Our team of highly trained professional caregivers is equipped to provide consistent, immediate support—helping ensure safety, comfort, and wellbeing at all times.'
            },
            {
                type: 'paragraph',
                content:
                    'In line with our commitment to excellence, we strictly adhere to National Disability Insurance Scheme (NDIS) guidelines. This isn’t just about compliance—it’s about ensuring care that respects dignity and rights.'
            },
            {
                type: 'paragraph',
                content:
                    'We aim to provide a supportive environment where clients feel valued and respected, alongside high-quality clinical and day-to-day support.'
            },

            {
                type: 'paragraph',
                content:
                    'Because needs can change, we prioritise flexibility in care planning. Our care plans are regularly reviewed and updated to ensure support remains relevant, effective, and aligned to current needs.'
            },

            {
                type: 'paragraph',
                content:
                    'The impact of our work is reflected in the stories of those we care for. At Cross Care Group, we’re not just providing care—we’re nurturing a community where every individual, regardless of the complexity of their needs, can thrive.'
            }
        ]
    },
    {
        id: 'article-complex-care-needs-aus',
        category: 'complex-care',
        categoryLabel: 'Complex Care',
        title: 'Understanding the Needs of Complex Care Patients in Australia',
        date: 'Jan 23, 2024',
        readTime: '3 min read',
        image: '../../images/blog-complex-care-understanding-needs-australia.png',
        excerpt:
            'An overview of who complex care patients are in Australia, why their needs are multifaceted, and how a coordinated, multidisciplinary approach supports better outcomes.',
        body: [
            {
                type: 'paragraph',
                content:
                    'In the diverse landscape of healthcare, the term “complex care patient” often surfaces—particularly in discussions about providing tailored, high-quality medical and support services. In Australia, understanding the intricacies of complex care is important for healthcare providers, families, and the community.'
            },
            {
                type: 'paragraph',
                content:
                    'Complex care patients in Australia are individuals who require intensive, multidisciplinary medical care due to multiple, chronic, or severe health conditions. These conditions can range from severe physical disabilities and chronic illnesses to mental health disorders.'
            },
            {
                type: 'paragraph',
                content:
                    'The complexity isn’t only the medical condition itself—it’s also the need for multiple healthcare services, specialised equipment, and sometimes round-the-clock care.'
            },

            {
                type: 'paragraph',
                content:
                    'In Australia, complex care is often supported through a holistic approach that considers medical needs alongside psychological, social, and emotional factors.'
            },
            {
                type: 'paragraph',
                content:
                    'Services such as the National Disability Insurance Scheme (NDIS) can play a pivotal role by funding necessary supports, services, and equipment.'
            },
            {
                type: 'paragraph',
                content:
                    'One significant challenge is ensuring seamless coordination between multiple providers—such as doctors, nurses, therapists, and support workers.'
            },
            {
                type: 'paragraph',
                content:
                    'Australia’s geographic vastness can also make consistent service delivery harder, particularly for individuals and families in regional or remote areas.'
            },

            {
                type: 'paragraph',
                content:
                    'Complex care needs often go beyond standard medical treatment. A patient-centred, multidisciplinary approach is essential to help people live fulfilling, as-independent-as-possible lives while managing high or changing support needs.'
            },

            {
                type: 'paragraph',
                content:
                    'At Cross Care Group, we are committed to delivering exceptional complex care tailored to each individual’s needs. Contact us to learn more about how we can support you or your loved ones in navigating the complexities of healthcare in Australia.'
            }
        ]
    },
    {
        id: 'article-tailored-care-plans-complex-care',
        category: 'complex-care',
        categoryLabel: 'Complex Care',
        title: 'Tailored Care Plans: Pioneering Success in Complex Care',
        date: 'Dec 14, 2023',
        readTime: '5 min read',
        image: '../../images/blog-complex-care-tailored-care-plans.png',
        excerpt:
            'A plain-language look at why personalised NDIS care plans matter—built through collaboration, customised to the individual, and continuously updated to achieve meaningful outcomes.',
        body: [
            {
                type: 'paragraph',
                content:
                    'In the dynamic world of NDIS complex care services, the creation and implementation of personalised care plans stand as a beacon of hope and progress. These bespoke plans are more than just a checklist of services; they represent a commitment to understanding and fulfilling the unique needs of each NDIS participant.'
            },
            {
                type: 'paragraph',
                content:
                    'At Cross Care Group, we champion these tailored strategies as the linchpin in delivering not just care, but a pathway to an improved quality of life for those we serve.'
            },

            { type: 'heading', content: 'Understanding the Individual' },
            {
                type: 'paragraph',
                content:
                    'Understanding the individual in the context of NDIS care plans involves delving into the nuances of their life—comprehending not just their medical condition, but their personality, aspirations, cultural background, and community ties.'
            },
            {
                type: 'paragraph',
                content:
                    'This process goes beyond data collection; it’s about forming a connection, building trust, and ensuring each individual feels heard and valued. We prioritise personal narratives, believing effective NDIS care respects and responds to each person’s unique story.'
            },

            { type: 'heading', content: 'Collaborative Approach' },
            {
                type: 'paragraph',
                content:
                    'Crafting an effective NDIS care plan is a symphony of collaboration. It thrives on the contributions of a diverse team—including the participant, their family, and professionals such as support coordinators, social workers, and nurse navigators.'
            },
            {
                type: 'paragraph',
                content:
                    'This team approach helps create a 360-degree perspective, weaving together insights and expertise into a plan that is both comprehensive and cohesive.'
            },

            { type: 'heading', content: 'Customization is Key' },
            {
                type: 'paragraph',
                content:
                    'At the heart of our approach is a belief in the power of customisation. Each individual is a unique mosaic of needs, preferences, and dreams, and the care plan should reflect that individuality.'
            },
            {
                type: 'paragraph',
                content:
                    'Customisation might include adapting communication for sensory sensitivities, incorporating culturally specific elements into routines, or designing therapy supports aligned with each person’s challenges and strengths.'
            },

            { type: 'heading', content: 'Continuous Assessment and Adaptation' },
            {
                type: 'paragraph',
                content:
                    'Because needs and circumstances can evolve, continuous assessment and adaptation are integral to tailored care plans. Teams regularly evaluate effectiveness and adjust plans to reflect new challenges, progress, or changes in health and personal life.'
            },
            {
                type: 'paragraph',
                content:
                    'Regular reviews aren’t just procedural—they’re a commitment to keeping care responsive, relevant, and aligned with current goals.'
            },

            { type: 'heading', content: 'Outcome-Focused' },
            {
                type: 'paragraph',
                content:
                    'Care plans are designed with clear, measurable outcomes in mind—aiming not only to address immediate needs, but to enhance overall quality of life.'
            },
            {
                type: 'paragraph',
                content:
                    'This can include goals related to improved health, greater independence, social engagement, or educational and vocational achievements—so each step in the journey is purposeful and directed toward meaningful improvements.'
            },

            { type: 'heading', content: 'Empowering Through Education' },
            {
                type: 'paragraph',
                content:
                    'Education is a powerful tool for empowering participants and families. Informed participants are better equipped to make decisions about their care and life.'
            },
            {
                type: 'paragraph',
                content:
                    'This includes sharing information about conditions, treatment options, and resources, as well as offering training and support for families and caregivers—helping build confidence and a sense of control.'
            },

            { type: 'heading', content: 'Technology Integration' },
            {
                type: 'paragraph',
                content:
                    'Integrating technology into care planning can enhance service quality and access—especially within complex care. This can include digital health records for information sharing, telehealth for easier access to clinicians, and monitoring tools for real-time insights.'
            },
            {
                type: 'paragraph',
                content:
                    'Technology also supports more personalised and efficient care—from appointment scheduling to progress tracking and outcomes reporting.'
            },

            { type: 'heading', content: 'Conclusion' },
            {
                type: 'paragraph',
                content:
                    'Cross Care Group’s commitment to crafting tailored care plans aligned with best-practice NDIS provision reflects a personalised approach aimed at transforming lives.'
            },
            {
                type: 'paragraph',
                content:
                    'Whether you are seeking care, offering support, or looking to collaborate, reach out to learn more about how tailored care plans can make a difference in the NDIS complex care landscape.'
            }
        ]
    }



];

document.addEventListener('DOMContentLoaded', () => {

    // Grid & Filter Logic
    const grid = document.getElementById('articles-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('blog-search');

    // Modal Logic
    const modal = document.getElementById('article-modal');
    const modalContainer = document.getElementById('article-details-container');

    if (!grid) return; // Exit if not on blog page

    function renderArticles(filter = 'all', search = '') {
        grid.innerHTML = '';
        const filtered = articles.filter(a => {
            const matchesFilter = filter === 'all' || a.category === filter;
            const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                a.excerpt.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="col-span-full py-20 text-center text-slate-400 font-medium">No articles found matching your criteria.</div>';
            return;
        }

        filtered.forEach(article => {
            const card = document.createElement('div');
            card.className = 'article-card bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col cursor-pointer overflow-hidden group';
            card.onclick = () => openModal(article.id);

            card.innerHTML = `
                <div class="relative h-64 overflow-hidden">
                    <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-ccg-navy/40 to-transparent"></div>
                    <div class="absolute top-6 left-6">
                        <span class="bg-white/95 backdrop-blur-md text-ccg-navy px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">${article.categoryLabel}</span>
                    </div>
                </div>
                <div class="p-8 flex flex-col flex-1">
                    <div class="flex items-center gap-3 mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>${article.date}</span>
                        <span class="w-1 h-1 bg-ccg-gold rounded-full"></span>
                        <span>${article.readTime}</span>
                    </div>
                    <h3 class="text-2xl font-black text-ccg-navy mb-4 leading-tight group-hover:text-ccg-teal transition-colors line-clamp-2">${article.title}</h3>
                    <p class="text-slate-500 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">${article.excerpt}</p>
                    <div class="flex items-center gap-2 text-ccg-gold font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-3 transition-all mt-auto">
                        Read article
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function openModal(id) {
        const article = articles.find(a => a.id === id);
        if (!article) return;

        modalContainer.innerHTML = `
            <div class="p-8 md:p-16 max-w-4xl mx-auto">
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 bg-[#F0F7F9] px-4 py-2 rounded-full mb-8">
                        <span class="w-2 h-2 bg-ccg-gold rounded-full"></span>
                        <span class="text-ccg-navy font-black text-[10px] uppercase tracking-widest leading-none">${article.categoryLabel}</span>
                    </div>
                    <h2 class="text-4xl md:text-6xl font-black text-ccg-navy mb-8 leading-[1.1] tracking-tight text-center">${article.title}</h2>
                    <div class="flex items-center justify-center gap-6 text-slate-400 font-bold text-[13px] uppercase tracking-[0.2em]">
                        <span>${article.date}</span>
                        <span class="w-1.5 h-1.5 bg-ccg-gold rounded-full"></span>
                        <span>${article.readTime}</span>
                    </div>
                </div>

                <div class="rounded-[3rem] overflow-hidden mb-16 shadow-2xl h-[400px]">
                    <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover">
                </div>

                <div class="prose prose-xl max-w-none text-slate-600 font-medium leading-relaxed">
                    ${article.body.map(item => {
            if (item.type === 'heading') return `<h3 class="text-3xl font-black text-ccg-navy mt-12 mb-6">${item.content}</h3>`;
            return `<p class="mb-8">${item.content}</p>`;
        }).join('')}
                </div>

                <div class="mt-20 pt-12 border-t border-slate-100 italic text-slate-400 text-sm">
                    Disclaimer: This article provides general information and does not constitute clinical advice. Please consult with your medical practitioner or clinical lead for specific support questions.
                </div>

                <div class="mt-16 p-12 bg-ccg-navy rounded-[3rem] text-white relative overflow-hidden group">
                    <div class="absolute -right-10 -top-10 w-48 h-48 bg-ccg-gold/10 rounded-full blur-3xl transition-transform group-hover:scale-110"></div>
                    <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h4 class="text-2xl font-black mb-2">Need a clinical transition plan?</h4>
                            <p class="text-white/60 font-medium">Our specialists help bridge the gap between hospital and home.</p>
                        </div>
                        <a href="../../contact/" class="bg-ccg-gold text-ccg-navy px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-gold-500/10">TALK TO US</a>
                    </div>
                </div>

                <button id="close-article-btn" class="mt-20 block mx-auto text-xs font-black text-ccg-navy hover:text-ccg-gold transition-colors uppercase tracking-[0.2em] bg-slate-50 px-10 py-4 rounded-full">Close Article</button>
            </div>
        `;

        modal.classList.remove('invisible', 'opacity-0');
        document.body.style.overflow = 'hidden';
        document.getElementById('modal-content').scrollTop = 0;

        // Bind close button
        document.getElementById('close-article-btn').addEventListener('click', closeModalFunc);
    }

    function closeModalFunc() {
        modal.classList.add('invisible', 'opacity-0');
        document.body.style.overflow = '';
    }

    // Event Listeners
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'bg-ccg-navy', 'text-white');
                    b.classList.add('bg-white', 'text-ccg-navy/60', 'border-slate-200');
                });
                btn.classList.add('active', 'bg-ccg-navy', 'text-white');
                btn.classList.remove('bg-white', 'text-ccg-navy/60', 'border-slate-200');
                renderArticles(btn.dataset.filter, searchInput.value);
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeBtn = document.querySelector('.filter-btn.active');
            const activeFilter = activeBtn ? activeBtn.dataset.filter : 'all';
            renderArticles(activeFilter, e.target.value);
        });
    }

    const modalCloseBtn = document.getElementById('close-modal');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModalFunc);

    if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) overlay.addEventListener('click', closeModalFunc);
    }

    // Initial Render
    renderArticles();

});
