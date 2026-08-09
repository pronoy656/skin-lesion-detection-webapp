import { Brain, HeartPulse, Search, ShieldCheck, Sparkles, Syringe, Zap } from "lucide-react";

export const categories = [
  {
    id: "mole-check",
    title: "Mole Check",
    description: "Analyze moles for irregular borders, asymmetry, and color variations.",
    icon: "Search", 
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    id: "skin-lesion",
    title: "Skin Lesion",
    description: "Identify and track changes in various skin lesions and spots over time.",
    icon: "HeartPulse",
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
  },
  {
    id: "full-body",
    title: "Full Body Map",
    description: "Comprehensive scanning of all body areas for early detection.",
    icon: "Brain",
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
  },
  {
    id: "prevention",
    title: "Prevention",
    description: "Daily care routines and sun protection to maintain skin health.",
    icon: "ShieldCheck",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
  },
  {
    id: "dermatology",
    title: "Dermatology",
    description: "Professional medical advice and treatment options.",
    icon: "Syringe",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
  },
  {
    id: "ai-analysis",
    title: "AI Analysis",
    description: "How our artificial intelligence models detect skin abnormalities.",
    icon: "Zap",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
  }
];

export const doctors = [
  {
    id: "dr-alexa-nova",
    name: "Dr. Alexa Nova",
    specialty: "Dermatologist",
    hospital: "Asian Hospital",
    rating: 5,
    reviews: 365,
    experience: "12+ Years",
    patients: "4.5k+",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    bio: "Dr. Alexa Nova is a board-certified dermatologist specializing in early skin cancer detection and dermoscopy. She leads the clinical integration of AI tools for preventative care.",
    qualifications: ["MD, Harvard Medical School", "Fellow of the American Academy of Dermatology"],
    expertise: ["Melanoma Screening", "Acne Treatment", "Laser Therapy"],
    availability: "Available Today"
  },
  {
    id: "dr-adrian-segara",
    name: "Dr. Adrian Segara",
    specialty: "Skin Specialist",
    hospital: "Apollo Hospital",
    rating: 5,
    reviews: 147,
    experience: "8 Years",
    patients: "2.1k+",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    bio: "Dr. Segara focuses on treating chronic skin conditions including eczema, psoriasis, and vitiligo. He takes a holistic approach to patient care.",
    qualifications: ["MBBS, University of London", "MSc Dermatology"],
    expertise: ["Chronic Conditions", "Pediatric Dermatology"],
    availability: "Next Available: Tomorrow"
  },
  {
    id: "dr-ryan-chen",
    name: "Dr. Ryan Chen",
    specialty: "Oncologist",
    hospital: "Mount Sinai",
    rating: 4,
    reviews: 89,
    experience: "15 Years",
    patients: "8k+",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    bio: "Specializing in surgical oncology, Dr. Chen performs advanced excisions of malignant skin lesions and coordinates complex treatment plans.",
    qualifications: ["MD, Stanford University", "Surgical Oncology Fellowship"],
    expertise: ["Mohs Surgery", "Melanoma Treatment", "Skin Grafts"],
    availability: "Next Available: Thursday"
  }
];

export const blogs = [
  {
    id: "early-signs-melanoma",
    title: "How to identify early signs of melanoma at home",
    categoryId: "mole-check",
    excerpt: "Learn the ABCDEs of melanoma and what to look for when checking your moles.",
    content: "Melanoma is the most serious type of skin cancer, but it is highly curable if caught early. The best way to identify melanoma at home is to follow the ABCDE rule:\n\n* **A for Asymmetry:** One half of a mole or birthmark does not match the other.\n* **B for Border:** The edges are irregular, ragged, notched, or blurred.\n* **C for Color:** The color is not the same all over and may include different shades of brown or black, or sometimes with patches of pink, red, white, or blue.\n* **D for Diameter:** The spot is larger than 6 millimeters across (about the size of a pencil eraser), although melanomas can sometimes be smaller than this.\n* **E for Evolving:** The mole is changing in size, shape, or color.\n\nRegular self-examinations are crucial. If you notice any of these signs, use our app to scan the lesion and consult a dermatologist immediately.",
    image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "5 min read",
    date: "Aug 12, 2026",
    author: "Dr. Alexa Nova"
  },
  {
    id: "best-sunscreen-sensitive",
    title: "The absolute best sunscreen for sensitive skin",
    categoryId: "prevention",
    excerpt: "Physical vs chemical sunscreens: which is better for sensitive skin?",
    content: "For those with sensitive skin, finding the right sunscreen can be a daunting task. The key lies in understanding the difference between physical (mineral) and chemical sunscreens.\n\n**Physical Sunscreens**\nThese contain active mineral ingredients, such as titanium dioxide or zinc oxide, which sit on top of the skin to deflect and scatter damaging UV rays away from the skin. They are generally much better tolerated by sensitive skin because they don't absorb into the skin.\n\n**Chemical Sunscreens**\nThese contain organic (carbon-based) compounds that create a chemical reaction and work by changing UV rays into heat, then releasing that heat from the skin. These can sometimes cause irritation in sensitive individuals.\n\nWe recommend looking for mineral-based formulas with zinc oxide and avoiding fragrances or parabens.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "3 min read",
    date: "Aug 10, 2026",
    author: "Sarah Jenkins, RN"
  },
  {
    id: "understanding-ai-analysis",
    title: "How AI is changing early skin cancer detection",
    categoryId: "ai-analysis",
    excerpt: "A deep dive into the neural networks powering modern dermoscopy.",
    content: "Artificial Intelligence has revolutionized the field of dermatology, particularly in the early detection of skin cancer. By training deep convolutional neural networks (CNNs) on hundreds of thousands of clinically verified skin lesion images, AI models can now identify subtle patterns that may be invisible to the naked eye.\n\nOur platform utilizes a proprietary model that analyzes over 50 distinct visual features, including border irregularity, color variegation, and texture asymmetry. When you take a photo, the AI compares these features against its vast database, providing a risk assessment within seconds.\n\nWhile AI is a powerful tool, it does not replace the critical diagnostic skills of a human dermatologist. Instead, it serves as an early warning system, empowering patients to seek professional help sooner.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "7 min read",
    date: "Aug 05, 2026",
    author: "Tech Health Labs"
  },
  {
    id: "common-types-lesions",
    title: "Common types of benign skin lesions",
    categoryId: "skin-lesion",
    excerpt: "Not all spots are dangerous. Learn about common harmless lesions.",
    content: "It's natural to worry when you discover a new spot on your skin, but the vast majority of skin lesions are entirely benign (harmless). Here are a few common ones:\n\n**Seborrheic Keratoses**\nThese are noncancerous skin growths that some people develop as they age. They often appear on the back or chest and look like a warty, stuck-on growth.\n\n**Cherry Angiomas**\nThese are common skin growths that can develop on most areas of your body. They're made up of a collection of small blood vessels, which gives them a reddish appearance.\n\n**Dermatofibromas**\nSmall, hard bumps that can appear on the legs or arms. They are completely harmless and often occur after a minor injury like a bug bite.\n\nAlways consult a professional if a lesion grows rapidly, bleeds, or changes color.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    readTime: "4 min read",
    date: "Jul 28, 2026",
    author: "Dr. Adrian Segara"
  }
];
