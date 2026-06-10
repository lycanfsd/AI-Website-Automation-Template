export type ClientService = {
  title: string;
  shortDescription: string;
  description: string;
  bestFor: string;
  highlights: string[];
};

export type ClientTestimonial = {
  quote: string;
  name: string;
  detail: string;
};

export type ClientFaq = {
  question: string;
  answer: string;
};

export type ClientPreset = {
  businessName: string;
  tagline: string;
  industry: string;
  location: string;
  phone: string;
  email: string;
  address: string;
  websiteUrl: string;
  bookingUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  logoText: string;
  logoPath: string;
  primaryCTA: string;
  secondaryCTA: string;
  serviceArea: string;
  hours: string;
  offer: string;
  toneStyleSuggestion: string;
  services: ClientService[];
  testimonials: ClientTestimonial[];
  faqs: ClientFaq[];
  brandColors: {
    primary: string;
    primaryDark: string;
    accent: string;
    ink: string;
  };
  seoTitle: string;
  seoDescription: string;
};

export const clientPresets = {
  personalTrainer: {
    businessName: "PeakForm Coaching",
    tagline: "Personalized coaching for stronger, healthier weeks.",
    industry: "Personal training and wellness coaching",
    location: "Austin, TX",
    phone: "(555) 014-2048",
    email: "hello@peakform.test",
    address: "418 Summit Ave, Austin, TX",
    websiteUrl: "https://www.peakformcoaching.com",
    bookingUrl: "",
    instagramUrl: "https://www.instagram.com/",
    facebookUrl: "https://www.facebook.com/",
    logoText: "PF",
    logoPath: "",
    primaryCTA: "Book a free consult",
    secondaryCTA: "View services",
    serviceArea: "Austin and nearby communities",
    hours: "Mon-Fri 6am-7pm, Sat 8am-1pm",
    offer: "Free 20-minute fit assessment for new leads",
    toneStyleSuggestion:
      "Confident, supportive, practical, and focused on consistency instead of extreme transformation promises.",
    services: [
      {
        title: "1-on-1 Personal Training",
        shortDescription:
          "Private coaching for strength, mobility, form, and confidence.",
        description:
          "Private coaching for strength, mobility, form, and confidence with sessions tailored to your goals and schedule.",
        bestFor: "Clients who want focused coaching and hands-on guidance.",
        highlights: ["Movement assessment", "Custom session plan", "Progress tracking"],
      },
      {
        title: "Online Coaching",
        shortDescription:
          "Remote programming, check-ins, and accountability without commuting.",
        description:
          "Remote programming, check-ins, and accountability for clients who want expert support without commuting.",
        bestFor: "Busy clients who need structure they can follow anywhere.",
        highlights: ["Weekly programming", "Video form review", "Messaging support"],
      },
      {
        title: "Nutrition Guidance",
        shortDescription:
          "Habit-based nutrition support built around real routines.",
        description:
          "Simple habit-based nutrition support built around real preferences, realistic routines, and sustainable consistency.",
        bestFor: "Clients who want better energy, habits, and clarity around food.",
        highlights: ["Habit coaching", "Meal rhythm support", "Practical adjustments"],
      },
      {
        title: "Transformation Program",
        shortDescription:
          "A structured coaching plan for strength, habits, and confidence.",
        description:
          "A focused coaching plan for clients ready to improve strength, habits, body composition, and confidence over time.",
        bestFor: "Clients who want a more structured, goal-driven commitment.",
        highlights: ["Goal roadmap", "Training and habits", "Regular reviews"],
      },
      {
        title: "Strength & Conditioning",
        shortDescription:
          "Performance-minded training for strength, conditioning, and durability.",
        description:
          "Performance-minded coaching that builds power, conditioning, durability, and smarter movement mechanics.",
        bestFor: "Active adults who want to train hard with better structure.",
        highlights: ["Strength blocks", "Conditioning work", "Recovery planning"],
      },
      {
        title: "Accountability Coaching",
        shortDescription:
          "Ongoing check-ins and adjustments that keep momentum visible.",
        description:
          "Ongoing check-ins and plan adjustments that help you stay consistent when life gets busy.",
        bestFor: "Clients who know what to do but need follow-through.",
        highlights: ["Weekly check-ins", "Plan adjustments", "Momentum tracking"],
      },
    ],
    testimonials: [
      {
        quote:
          "PeakForm helped me rebuild consistency without feeling overwhelmed. The consult alone gave me more clarity than months of trying random plans.",
        name: "Maya R.",
        detail: "Strength coaching client",
      },
      {
        quote:
          "The coaching feels personal and precise. I know what to do, why it matters, and how to fit it into a normal work week.",
        name: "Chris M.",
        detail: "Mobility and recovery client",
      },
      {
        quote:
          "I booked after one conversation because the plan was realistic. No pressure, just a smart path forward.",
        name: "Elena P.",
        detail: "Nutrition habits client",
      },
    ],
    faqs: [
      {
        question: "Is the consultation really free?",
        answer:
          "Yes. The first consult is a short fit assessment so you can understand the recommended service before choosing a plan.",
      },
      {
        question: "Do I need to be in shape before starting?",
        answer:
          "No. Coaching is adapted to your current ability, comfort level, and training history.",
      },
      {
        question: "What happens after I submit the form?",
        answer:
          "The team reviews your goals and follows up with available consult times, usually within one business day.",
      },
      {
        question: "Can I train if I have an old injury or limitation?",
        answer:
          "Tell the team before booking so the consult can focus on appropriate movement, comfort, and whether another provider should be involved.",
      },
    ],
    brandColors: {
      primary: "#256f52",
      primaryDark: "#174535",
      accent: "#b46a3c",
      ink: "#17211d",
    },
    seoTitle: "PeakForm Coaching | Personal Training in Austin, TX",
    seoDescription:
      "PeakForm Coaching helps Austin-area adults build strength, improve mobility, and stay consistent with personalized coaching and free consultations.",
  },

  smallGym: {
    businessName: "Forge Local Gym",
    tagline: "Small-group strength training with real coaching and community.",
    industry: "Small gym and group fitness",
    location: "Denver, CO",
    phone: "(555) 018-4410",
    email: "hello@forgelocal.test",
    address: "2108 Larimer St, Denver, CO",
    websiteUrl: "https://www.forgelocalgym.com",
    bookingUrl: "",
    instagramUrl: "https://www.instagram.com/",
    facebookUrl: "https://www.facebook.com/",
    logoText: "FG",
    logoPath: "",
    primaryCTA: "Claim a trial class",
    secondaryCTA: "See memberships",
    serviceArea: "Denver and nearby neighborhoods",
    hours: "Mon-Fri 5:30am-8pm, Sat-Sun 8am-12pm",
    offer: "Free first class and membership consult",
    toneStyleSuggestion:
      "Energetic, community-driven, direct, and encouraging without sounding like a high-pressure fitness franchise.",
    services: [
      {
        title: "Small Group Strength",
        shortDescription: "Coach-led strength sessions with focused attention.",
        description:
          "Small group training that combines expert coaching, smart programming, and a supportive room that keeps members consistent.",
        bestFor: "People who want coaching energy without getting lost in a large class.",
        highlights: ["Coach-led sessions", "Progressive programming", "Form feedback"],
      },
      {
        title: "Conditioning Classes",
        shortDescription: "Sweaty, structured conditioning for busy schedules.",
        description:
          "Efficient conditioning sessions built to improve stamina, work capacity, and confidence at a realistic pace.",
        bestFor: "Members who want a coached workout that feels challenging but approachable.",
        highlights: ["Scalable intervals", "Clear coaching", "Community energy"],
      },
      {
        title: "Open Gym Membership",
        shortDescription: "Flexible gym access with a cleaner, calmer setup.",
        description:
          "A straightforward membership for people who want quality equipment, good space, and a gym that feels local.",
        bestFor: "Self-directed lifters who want a reliable neighborhood gym.",
        highlights: ["Flexible access", "Strength equipment", "Clean training floor"],
      },
      {
        title: "Intro Coaching Session",
        shortDescription: "A first-session walkthrough before joining.",
        description:
          "A coach helps new members understand the gym, choose class options, and start with the right level.",
        bestFor: "New members who want confidence before jumping into classes.",
        highlights: ["Goal review", "Movement overview", "Membership guidance"],
      },
    ],
    testimonials: [
      {
        quote:
          "Forge feels like the gym I kept hoping to find. The coaches know my name, and the workouts are challenging without being chaotic.",
        name: "Andre L.",
        detail: "Small group member",
      },
      {
        quote:
          "I came for a trial class and stayed because the programming finally made sense for my schedule.",
        name: "Dana K.",
        detail: "Strength class member",
      },
      {
        quote:
          "It has the community feel of a studio with the equipment of a serious gym.",
        name: "Marcus T.",
        detail: "Open gym member",
      },
    ],
    faqs: [
      {
        question: "Can beginners join group classes?",
        answer:
          "Yes. Coaches scale movements and help new members choose the right starting point.",
      },
      {
        question: "Do I need to sign a long contract?",
        answer:
          "Use this answer to describe the client's actual membership terms, billing policy, and cancellation rules.",
      },
      {
        question: "What should I bring to a trial class?",
        answer:
          "Comfortable workout clothes, water, and a few minutes early arrival for a coach check-in.",
      },
      {
        question: "Is open gym included with classes?",
        answer:
          "Replace this with the client's real membership structure before launch.",
      },
    ],
    brandColors: {
      primary: "#315f72",
      primaryDark: "#183948",
      accent: "#d08a3c",
      ink: "#172026",
    },
    seoTitle: "Forge Local Gym | Small Group Training in Denver",
    seoDescription:
      "Forge Local Gym offers small-group strength, conditioning classes, and flexible gym access for Denver locals.",
  },

  medSpa: {
    businessName: "LumaSkin Med Spa",
    tagline: "Modern aesthetic care with calm guidance and natural-looking goals.",
    industry: "Med spa and aesthetics",
    location: "Scottsdale, AZ",
    phone: "(555) 019-8821",
    email: "hello@lumaskin.test",
    address: "7420 E Main St, Scottsdale, AZ",
    websiteUrl: "https://www.lumaskinmedspa.com",
    bookingUrl: "",
    instagramUrl: "https://www.instagram.com/",
    facebookUrl: "https://www.facebook.com/",
    logoText: "LS",
    logoPath: "",
    primaryCTA: "Request a consultation",
    secondaryCTA: "View treatments",
    serviceArea: "Scottsdale and Phoenix-area clients",
    hours: "Tue-Fri 10am-6pm, Sat 9am-2pm",
    offer: "Complimentary aesthetic consultation for new clients",
    toneStyleSuggestion:
      "Polished, calm, elevated, and trust-building. Avoid exaggerated beauty claims or guaranteed treatment outcomes.",
    services: [
      {
        title: "Injectables Consultation",
        shortDescription: "Personalized guidance for subtle, refreshed-looking options.",
        description:
          "A consultation-focused visit to discuss aesthetic goals, treatment options, and appropriate next steps with a licensed provider.",
        bestFor: "Clients exploring wrinkle relaxers, volume support, or refreshed-looking treatment plans.",
        highlights: ["Goal review", "Provider consultation", "Treatment planning"],
      },
      {
        title: "Skin Rejuvenation",
        shortDescription: "Treatment planning for smoother, brighter-looking skin.",
        description:
          "Skin-focused services designed around tone, texture, and maintenance goals after a provider review.",
        bestFor: "Clients who want a guided plan for skin refresh and ongoing care.",
        highlights: ["Skin assessment", "Treatment options", "Maintenance guidance"],
      },
      {
        title: "Facials and Peels",
        shortDescription: "Professional skin treatments for glow and maintenance.",
        description:
          "Customized facial and peel options selected around skin type, comfort, and provider recommendations.",
        bestFor: "Clients who want recurring professional skin support.",
        highlights: ["Customized approach", "Comfort-focused visit", "Home care guidance"],
      },
      {
        title: "Wellness Add-ons",
        shortDescription: "Optional supportive services reviewed by the team.",
        description:
          "A selection of wellness-focused add-ons that should be scoped to the client's licensed services and local rules.",
        bestFor: "Clients interested in supportive aesthetic and wellness care.",
        highlights: ["Eligibility review", "Clear expectations", "Provider oversight"],
      },
    ],
    testimonials: [
      {
        quote:
          "The consultation felt thoughtful and never rushed. I appreciated how clearly everything was explained before making a decision.",
        name: "Priya S.",
        detail: "Aesthetic consultation client",
      },
      {
        quote:
          "LumaSkin has a calm, premium feel. The team helped me choose a plan that felt natural for me.",
        name: "Natalie B.",
        detail: "Skin care client",
      },
      {
        quote:
          "I felt heard from the first message. The follow-up was fast, professional, and reassuring.",
        name: "Camille R.",
        detail: "New med spa client",
      },
    ],
    faqs: [
      {
        question: "Do I need a consultation first?",
        answer:
          "Yes. New clients should start with a consultation so the provider can review goals, eligibility, and appropriate options.",
      },
      {
        question: "Can you guarantee treatment results?",
        answer:
          "No. Individual outcomes vary, and the provider will explain realistic expectations during the consultation.",
      },
      {
        question: "Who performs treatments?",
        answer:
          "Replace this with the client's actual provider credentials, supervision model, and local compliance details.",
      },
      {
        question: "What should I do before my appointment?",
        answer:
          "The team will share client-specific preparation instructions after reviewing the requested service.",
      },
    ],
    brandColors: {
      primary: "#7a626d",
      primaryDark: "#46343c",
      accent: "#c69a83",
      ink: "#221b1f",
    },
    seoTitle: "LumaSkin Med Spa | Aesthetic Consultations in Scottsdale",
    seoDescription:
      "LumaSkin Med Spa offers consultation-led aesthetic care, skin treatments, and professional guidance in Scottsdale.",
  },

  chiropractor: {
    businessName: "AlignPoint Chiropractic",
    tagline: "Chiropractic care built around clear plans and comfortable visits.",
    industry: "Chiropractic clinic",
    location: "Charlotte, NC",
    phone: "(555) 016-7732",
    email: "hello@alignpoint.test",
    address: "905 Central Ave, Charlotte, NC",
    websiteUrl: "https://www.alignpointchiro.com",
    bookingUrl: "",
    instagramUrl: "https://www.instagram.com/",
    facebookUrl: "https://www.facebook.com/",
    logoText: "AP",
    logoPath: "",
    primaryCTA: "Request an appointment",
    secondaryCTA: "Explore care options",
    serviceArea: "Charlotte and nearby communities",
    hours: "Mon-Thu 8am-6pm, Fri 8am-1pm",
    offer: "New patient consultation request",
    toneStyleSuggestion:
      "Reassuring, clinical-but-friendly, clear, and careful. Avoid promising pain relief or diagnosing in marketing copy.",
    services: [
      {
        title: "New Patient Exam",
        shortDescription: "A careful first visit to understand concerns and history.",
        description:
          "A structured first appointment where the team reviews health history, movement concerns, and whether chiropractic care is appropriate.",
        bestFor: "New patients who want clarity before starting care.",
        highlights: ["History review", "Exam process", "Care recommendation"],
      },
      {
        title: "Chiropractic Adjustments",
        shortDescription: "Provider-guided care based on exam findings.",
        description:
          "Chiropractic visits planned around the provider's evaluation, patient comfort, and appropriate care goals.",
        bestFor: "Patients who have completed an exam and received a care recommendation.",
        highlights: ["Provider assessment", "Comfort-focused care", "Clear next steps"],
      },
      {
        title: "Mobility Support",
        shortDescription: "Guided movement support for daily function.",
        description:
          "Movement education and mobility guidance that supports the care plan without replacing medical advice.",
        bestFor: "Patients who want help understanding movement and daily habits.",
        highlights: ["Movement review", "At-home guidance", "Progress check-ins"],
      },
      {
        title: "Wellness Visits",
        shortDescription: "Ongoing visits for patients with an established plan.",
        description:
          "Scheduled follow-up visits for patients who have a provider-reviewed plan and want consistent support.",
        bestFor: "Returning patients following an established care schedule.",
        highlights: ["Follow-up visits", "Plan updates", "Patient education"],
      },
    ],
    testimonials: [
      {
        quote:
          "The first visit was clear and organized. I understood the process and felt comfortable asking questions.",
        name: "Rachel W.",
        detail: "New patient",
      },
      {
        quote:
          "The team communicates well and keeps appointments running smoothly. That matters a lot with my schedule.",
        name: "Devin H.",
        detail: "Returning patient",
      },
      {
        quote:
          "I appreciated that they explained options and did not pressure me into anything.",
        name: "Lauren C.",
        detail: "Consultation patient",
      },
    ],
    faqs: [
      {
        question: "Do I need an exam before care starts?",
        answer:
          "New patients usually begin with an exam or consultation so the provider can determine what is appropriate.",
      },
      {
        question: "Can chiropractic care guarantee pain relief?",
        answer:
          "No. Individual situations vary, and the provider will discuss realistic expectations after an evaluation.",
      },
      {
        question: "Do you accept insurance?",
        answer:
          "Replace this with the clinic's real insurance, self-pay, and billing details before launch.",
      },
      {
        question: "What should I bring to my first visit?",
        answer:
          "Bring relevant health history, referral information if applicable, and any questions you want to discuss.",
      },
    ],
    brandColors: {
      primary: "#22615f",
      primaryDark: "#153d3c",
      accent: "#8da46b",
      ink: "#142322",
    },
    seoTitle: "AlignPoint Chiropractic | New Patient Appointments in Charlotte",
    seoDescription:
      "AlignPoint Chiropractic offers new patient consultations, chiropractic care planning, and movement support in Charlotte.",
  },

  physicalTherapy: {
    businessName: "RestoreLab Physical Therapy",
    tagline: "One-on-one physical therapy for stronger, more confident movement.",
    industry: "Physical therapy clinic",
    location: "Raleigh, NC",
    phone: "(555) 017-2904",
    email: "hello@restorelab.test",
    address: "318 Glenwood Ave, Raleigh, NC",
    websiteUrl: "https://www.restorelabpt.com",
    bookingUrl: "",
    instagramUrl: "https://www.instagram.com/",
    facebookUrl: "https://www.facebook.com/",
    logoText: "RL",
    logoPath: "",
    primaryCTA: "Request an evaluation",
    secondaryCTA: "View therapy services",
    serviceArea: "Raleigh and nearby communities",
    hours: "Mon-Fri 7am-6pm",
    offer: "Free discovery call for new patients",
    toneStyleSuggestion:
      "Professional, calm, evidence-informed, and patient-centered. Avoid diagnosis, outcome guarantees, or replacing provider evaluation.",
    services: [
      {
        title: "Initial Evaluation",
        shortDescription: "A one-on-one assessment with a licensed therapist.",
        description:
          "A focused first visit to review symptoms, goals, movement, and the most appropriate plan of care.",
        bestFor: "New patients who want expert evaluation before starting therapy.",
        highlights: ["Licensed PT evaluation", "Goal review", "Plan of care"],
      },
      {
        title: "Orthopedic Rehab",
        shortDescription: "Therapy support for muscles, joints, and movement concerns.",
        description:
          "One-on-one rehabilitation sessions planned around therapist findings, patient goals, and functional progress.",
        bestFor: "Patients recovering from orthopedic concerns or movement limitations.",
        highlights: ["Hands-on support", "Exercise progression", "Functional goals"],
      },
      {
        title: "Sports Rehab",
        shortDescription: "Progressive rehab for active people and athletes.",
        description:
          "Return-to-activity planning designed around sport demands, strength, mobility, and therapist guidance.",
        bestFor: "Active patients who want a structured path back to training or sport.",
        highlights: ["Sport demands review", "Progress testing", "Return planning"],
      },
      {
        title: "Post-Surgical Rehab",
        shortDescription: "Guided therapy after surgery based on provider protocols.",
        description:
          "Post-operative therapy coordinated around surgeon guidance, patient tolerance, and safe progression.",
        bestFor: "Patients with a referral or surgical protocol.",
        highlights: ["Protocol review", "Measured progress", "Care coordination"],
      },
    ],
    testimonials: [
      {
        quote:
          "RestoreLab made the process feel organized from day one. I knew what we were working on and why.",
        name: "Ben A.",
        detail: "Orthopedic rehab patient",
      },
      {
        quote:
          "The one-on-one attention was completely different from rushed clinic visits I had tried before.",
        name: "Mina J.",
        detail: "Physical therapy patient",
      },
      {
        quote:
          "Scheduling was easy, and the plan felt specific to my goals instead of generic.",
        name: "Trevor P.",
        detail: "Sports rehab patient",
      },
    ],
    faqs: [
      {
        question: "Do I need a referral?",
        answer:
          "Referral rules vary by state, insurance, and patient situation. Replace this with clinic-specific guidance.",
      },
      {
        question: "Will the first visit include treatment?",
        answer:
          "The therapist will begin with an evaluation and explain the recommended next steps based on findings.",
      },
      {
        question: "Can you guarantee recovery timelines?",
        answer:
          "No. Progress varies by person, condition, and plan of care. The therapist will discuss realistic expectations.",
      },
      {
        question: "What should I wear?",
        answer:
          "Wear comfortable clothing that allows movement and access to the area being evaluated when appropriate.",
      },
    ],
    brandColors: {
      primary: "#2b6d7a",
      primaryDark: "#163f48",
      accent: "#6fa88e",
      ink: "#142126",
    },
    seoTitle: "RestoreLab Physical Therapy | One-on-One PT in Raleigh",
    seoDescription:
      "RestoreLab Physical Therapy provides one-on-one evaluations, orthopedic rehab, sports rehab, and post-surgical therapy in Raleigh.",
  },

  yogaPilates: {
    businessName: "FlowHouse Studio",
    tagline: "Small-class yoga and Pilates for strength, breath, and balance.",
    industry: "Yoga and Pilates studio",
    location: "Portland, OR",
    phone: "(555) 013-6842",
    email: "hello@flowhouse.test",
    address: "1442 SE Division St, Portland, OR",
    websiteUrl: "https://www.flowhousestudio.com",
    bookingUrl: "",
    instagramUrl: "https://www.instagram.com/",
    facebookUrl: "https://www.facebook.com/",
    logoText: "FH",
    logoPath: "",
    primaryCTA: "Book an intro class",
    secondaryCTA: "View class options",
    serviceArea: "Portland-area students",
    hours: "Mon-Fri 6am-8pm, Sat-Sun 8am-1pm",
    offer: "Intro class special for new students",
    toneStyleSuggestion:
      "Calm, welcoming, sensory, and grounded. Emphasize belonging, consistency, and mindful movement.",
    services: [
      {
        title: "Intro Yoga Classes",
        shortDescription: "Beginner-friendly classes with a welcoming pace.",
        description:
          "Accessible yoga classes designed to help new students learn the studio flow, breath, and movement basics.",
        bestFor: "Students new to yoga or returning after time away.",
        highlights: ["Welcoming pace", "Clear guidance", "Breath and movement"],
      },
      {
        title: "Mat Pilates",
        shortDescription: "Core-focused classes for control, strength, and posture.",
        description:
          "Small-group mat Pilates classes that build strength, control, and body awareness with instructor guidance.",
        bestFor: "Students who want focused strength work without large classes.",
        highlights: ["Core strength", "Controlled movement", "Small class feel"],
      },
      {
        title: "Private Sessions",
        shortDescription: "One-on-one support for goals, comfort, and confidence.",
        description:
          "Private yoga or Pilates sessions shaped around individual goals, modifications, and schedule needs.",
        bestFor: "Students who want personalized support before joining classes.",
        highlights: ["Goal review", "Personal pacing", "Modification support"],
      },
      {
        title: "Studio Membership",
        shortDescription: "Consistent weekly practice with flexible class options.",
        description:
          "Membership options for students who want a steady practice and a familiar local studio community.",
        bestFor: "Students ready to make movement part of their weekly rhythm.",
        highlights: ["Weekly classes", "Flexible schedule", "Community support"],
      },
    ],
    testimonials: [
      {
        quote:
          "FlowHouse is calm without feeling intimidating. I felt comfortable from the first intro class.",
        name: "Sara M.",
        detail: "Intro yoga student",
      },
      {
        quote:
          "The Pilates classes are small enough that I actually get guidance, which keeps me coming back.",
        name: "Jules R.",
        detail: "Mat Pilates member",
      },
      {
        quote:
          "I started with a private session and finally felt ready to join group classes.",
        name: "Nora T.",
        detail: "Private session student",
      },
    ],
    faqs: [
      {
        question: "I am brand new. Which class should I start with?",
        answer:
          "Start with an intro class or private session so the instructor can help you choose a comfortable pace.",
      },
      {
        question: "Do I need to bring a mat?",
        answer:
          "Replace this with the studio's actual equipment and rental policy.",
      },
      {
        question: "Are classes beginner-friendly?",
        answer:
          "Many classes are beginner-friendly, and instructors can suggest modifications when appropriate.",
      },
      {
        question: "How do memberships work?",
        answer:
          "Use this answer to explain the client's real class packs, memberships, and cancellation policy.",
      },
    ],
    brandColors: {
      primary: "#6e7d62",
      primaryDark: "#3c4736",
      accent: "#c58d74",
      ink: "#20251f",
    },
    seoTitle: "FlowHouse Studio | Yoga and Pilates Classes in Portland",
    seoDescription:
      "FlowHouse Studio offers intro yoga, mat Pilates, private sessions, and welcoming memberships for Portland-area students.",
  },

  nutritionCoach: {
    businessName: "NourishPath Coaching",
    tagline: "Practical nutrition coaching for calmer routines and consistent habits.",
    industry: "Nutrition coaching",
    location: "Nashville, TN",
    phone: "(555) 012-5088",
    email: "hello@nourishpath.test",
    address: "Virtual and Nashville-area coaching",
    websiteUrl: "https://www.nourishpathcoaching.com",
    bookingUrl: "",
    instagramUrl: "https://www.instagram.com/",
    facebookUrl: "https://www.facebook.com/",
    logoText: "NP",
    logoPath: "",
    primaryCTA: "Book a nutrition consult",
    secondaryCTA: "View coaching options",
    serviceArea: "Nashville and virtual clients",
    hours: "Mon-Thu 9am-5pm",
    offer: "Free 20-minute nutrition coaching consult",
    toneStyleSuggestion:
      "Warm, non-judgmental, practical, and habit-focused. Avoid diet-culture language and guaranteed weight-loss outcomes.",
    services: [
      {
        title: "Nutrition Coaching",
        shortDescription: "Habit-based support for meals, routines, and consistency.",
        description:
          "Personal nutrition coaching focused on practical habits, food routines, and sustainable follow-through.",
        bestFor: "Clients who want guidance without rigid meal plans or shame.",
        highlights: ["Habit review", "Meal rhythm support", "Weekly check-ins"],
      },
      {
        title: "Meal Planning Support",
        shortDescription: "Simple planning systems for busy weeks.",
        description:
          "Support building a realistic meal planning rhythm around schedule, preferences, and capacity.",
        bestFor: "Clients who feel stuck deciding what to eat during busy weeks.",
        highlights: ["Planning framework", "Grocery rhythm", "Simple prep ideas"],
      },
      {
        title: "Accountability Check-ins",
        shortDescription: "Ongoing support to keep nutrition habits visible.",
        description:
          "Regular check-ins that help clients reflect, adjust, and stay connected to their goals.",
        bestFor: "Clients who know what matters but need consistent support.",
        highlights: ["Weekly reflection", "Progress notes", "Next-step planning"],
      },
      {
        title: "Family Nutrition Routines",
        shortDescription: "Practical food systems for households and families.",
        description:
          "Coaching support for building calmer household routines around meals, snacks, and planning.",
        bestFor: "Busy households looking for less stressful food routines.",
        highlights: ["Household routines", "Preference mapping", "Realistic planning"],
      },
    ],
    testimonials: [
      {
        quote:
          "NourishPath helped me stop overcomplicating food. The plan felt realistic for my work week.",
        name: "Alyssa G.",
        detail: "Nutrition coaching client",
      },
      {
        quote:
          "The check-ins were supportive and never judgmental. I finally built habits I could repeat.",
        name: "Morgan E.",
        detail: "Accountability client",
      },
      {
        quote:
          "I appreciated the focus on routines instead of another strict plan I would quit after two weeks.",
        name: "Kira L.",
        detail: "Meal planning client",
      },
    ],
    faqs: [
      {
        question: "Will I get a strict meal plan?",
        answer:
          "The default approach is habit-based coaching. Replace this with the coach's actual scope and credentials.",
      },
      {
        question: "Do you guarantee weight loss?",
        answer:
          "No. Outcomes vary, and coaching focuses on practical habits, consistency, and personalized support.",
      },
      {
        question: "Can you help with medical nutrition needs?",
        answer:
          "Medical nutrition needs should be handled by an appropriately licensed professional. Customize this based on credentials and local rules.",
      },
      {
        question: "Is coaching virtual?",
        answer:
          "This preset supports virtual or local coaching. Replace with the client's real delivery model.",
      },
    ],
    brandColors: {
      primary: "#47725f",
      primaryDark: "#29483b",
      accent: "#d19b5f",
      ink: "#1d241f",
    },
    seoTitle: "NourishPath Coaching | Nutrition Coach in Nashville",
    seoDescription:
      "NourishPath Coaching offers practical nutrition coaching, meal planning support, and accountability for Nashville and virtual clients.",
  },
} satisfies Record<string, ClientPreset>;

export type ClientPresetKey = keyof typeof clientPresets;
