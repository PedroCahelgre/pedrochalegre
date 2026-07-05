export const VIDEOS = {
  hero: "https://res.cloudinary.com/dcfkufr9h/video/upload/v1783207176/Man_in_confident_pose_202607041609_online-video-cutter.com_ldojib.mp4",
  about:
    "https://res.cloudinary.com/dcfkufr9h/video/upload/v1783192198/Man_in_confident_pose_202607041609_avzgg0.mp4",
  expertise:
    "https://res.cloudinary.com/dcfkufr9h/video/upload/v1783193651/Man_walking_in_hallway_202607041633_bnqnrq.mp4",
  cta: "https://res.cloudinary.com/dcfkufr9h/video/upload/v1783210233/Man_walking_in_corridor_smiling_202607041735_online-video-cutter.com_wgmzxk.mp4",
} as const;

export const SOCIAL = {
  github: "https://github.com/PedroCahelgre",
  linkedin: "https://www.linkedin.com/in/pedrochalegre/",
  instagram: "https://www.instagram.com/chalegredev",
  whatsapp: "https://wa.me/5512992515171?text=Ol%C3%A1%2C%20vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.",
  email: "mailto:contato@pedrochalegre.dev",
} as const;

export type SkillGroup = {
  index: string;
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    index: "01",
    title: "Front-end",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP"],
  },
  {
    index: "02",
    title: "Back-end",
    skills: ["Node.js", "Express", "REST API", "Prisma", "Authentication"],
  },
  {
    index: "03",
    title: "Banco de Dados",
    skills: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    index: "04",
    title: "Cloud",
    skills: ["Vercel", "Firebase", "Cloudinary"],
  },
  {
    index: "05",
    title: "Ferramentas",
    skills: ["Git", "GitHub", "Docker", "Figma", "VS Code"],
  },
];

export type Project = {
  number: string;
  name: string;
  description: string;
  tech: string[];
  year: string;
  image: string;
  live: string;
  github: string;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "C4 Odonto",
    description:
      "Website institucional para clínica odontológica referência em implantes e estética dental em Jaboatão. Design elegante com informações sobre tratamentos, equipe e agendamento online.",
    tech: ["React", "TypeScript", "CSS3", "SEO Local"],
    year: "2026",
    image: "https://pedrochalegre.netlify.app/c4odonto.png",
    live: "https://c4odonto.com.br/",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "02",
    name: "Atelier Premium",
    description:
      "Website premium para salão de beleza. Plataforma elegante com catálogo de serviços, agendamento online, galeria de trabalhos e informações sobre tratamentos de beleza personalizados.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    year: "2026",
    image: "https://pedrochalegre.netlify.app/png%20(29).png",
    live: "https://atelierpremium.netlify.app",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "03",
    name: "LMB Engenharia",
    description:
      "Website corporativo para construtora especializada em obras comerciais no Brasil. +600 entregas desde 2006 no modelo chave na mão.",
    tech: ["React", "Vite", "TypeScript", "CSS3", "SEO"],
    year: "2026",
    image: "https://pedrochalegre.netlify.app/grupolmb.png",
    live: "https://grupolmb.com.br/",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "04",
    name: "PR LMB",
    description:
      "Sistema corporativo interno do Grupo LMB para gerenciamento de chamados, ordens de serviço e documentação técnica. Plataforma segura com autenticação e dashboard administrativo.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    year: "2026",
    image: "https://pedrochalegre.netlify.app/prlmb.png",
    live: "https://prlmb.grupolmb.com.br/",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "05",
    name: "Art Sapiens Tattoo Studio",
    description:
      "Website institucional para estúdio de tatuagem com mais de 30 anos de experiência em Recife. Galeria de trabalhos, agendamento online e informações sobre serviços.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    year: "2026",
    image: "https://pedrochalegre.netlify.app/art%20sapiens.png",
    live: "https://testetatto2.netlify.app",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "06",
    name: "Barbearia Meus Manos",
    description:
      "Website moderno para barbearia com agendamento online, galeria de cortes e serviços. Experiência mobile-first com integração direta ao WhatsApp.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    year: "2026",
    image: "https://pedrochalegre.netlify.app/meusmanos2.png",
    live: "https://barbeariameusmanos.vercel.app/",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "07",
    name: "Feijoada das Pretas",
    description:
      "Cardápio digital para delivery de feijoada artesanal em Jaboatão. Experiência mobile-first com pedidos online via WhatsApp.",
    tech: ["React", "Vite", "CSS3", "WhatsApp API"],
    year: "2024",
    image: "https://pedrochalegre.netlify.app/feijoadadaspretas.png",
    live: "https://feijoadadaspretas.netlify.app/",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "08",
    name: "GSAP & Scroll Trigger",
    description:
      "Projeto de estudo e demonstração das bibliotecas GSAP e Scroll Trigger. Criação de animações avançadas e efeitos de scroll interativos em uma landing page.",
    tech: ["React", "Vite", "GSAP", "Scroll Trigger", "Tailwind CSS"],
    year: "2024",
    image: "https://pedrochalegre.netlify.app/testegeladeira.png",
    live: "https://testegeladeira.vercel.app/",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "09",
    name: "Clenia Medeiros Imóveis",
    description:
      "Plataforma imobiliária especializada em imóveis de luxo no litoral pernambucano. Sistema de busca, galeria de propriedades e contato direto com a corretora.",
    tech: ["React", "Next.js", "Firebase", "Tailwind CSS"],
    year: "2025",
    image: "https://pedrochalegre.netlify.app/imoveis.png",
    live: "https://cleniamedeirosimoveis.netlify.app",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "10",
    name: "Jackson Menezes - Marketing Digital",
    description:
      "Website de serviços de marketing digital especializado em negócios locais. Oferece gestão de tráfego pago, criação de sites focados em conversão e otimização do Google Meu Negócio.",
    tech: ["React", "Gatsby", "GraphQL", "Styled Components"],
    year: "2025",
    image: "https://pedrochalegre.netlify.app/jackson.png",
    live: "https://jacksonmenezes.netlify.app",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "11",
    name: "Meus Manos Barber",
    description:
      "Website para barbearia tradicional com foco em cortes masculinos e tratamentos de barba. Galeria de trabalhos, preços e agendamento online.",
    tech: ["React", "Next.js", "Stripe", "Tailwind CSS"],
    year: "2024",
    image: "https://pedrochalegre.netlify.app/meus%20manos.png",
    live: "https://meusmanosbarber.netlify.app",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "12",
    name: "Matheus Silva Barber",
    description:
      "Portfolio profissional de barbeiro com mais de 8 anos de experiência. Showcase de serviços, preços e sistema de agendamento personalizado.",
    tech: ["HTML5", "CSS3", "JavaScript", "WhatsApp API"],
    year: "2024",
    image: "https://pedrochalegre.netlify.app/ms.png",
    live: "https://msthebarber.netlify.app",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "13",
    name: "Chalegre Energy",
    description:
      "Website para empresa de serviços elétricos atendendo Recife, Jaboatão e Olinda. Catálogo de serviços, área de cobertura e formulário de orçamento.",
    tech: ["React", "Next.js", "Tailwind CSS", "Formik"],
    year: "2025",
    image: "https://pedrochalegre.netlify.app/ce.png",
    live: "https://chalegreenergy.netlify.app",
    github: "https://github.com/PedroCahelgre",
  },
  {
    number: "14",
    name: "TVG Engenharia",
    description:
      "Website corporativo para empresa de engenharia especializada em construção e manutenção de postos de combustível. Portfolio de projetos e serviços.",
    tech: ["HTML5", "CSS3", "JavaScript", "jQuery"],
    year: "2024",
    image: "https://pedrochalegre.netlify.app/tvg.png",
    live: "https://tvgengenharia.com.br",
    github: "https://github.com/PedroCahelgre",
  },
];

export type Metric = {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  word?: string;
};

export const metrics: Metric[] = [
  { value: 30, prefix: "+", suffix: "", label: "Projetos entregues" },
  { value: 95, prefix: "", suffix: "+", label: "Lighthouse Score" },
  { value: 100, prefix: "", suffix: "%", label: "Responsivo" },
  { value: 0, prefix: "", suffix: "", label: "Clean Code", word: "A+" },
  { value: 0, prefix: "", suffix: "", label: "Performance", word: "60fps" },
  { value: 0, prefix: "", suffix: "", label: "Escalabilidade", word: "∞" },
];
