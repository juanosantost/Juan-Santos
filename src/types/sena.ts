export interface ApprenticeProfile {
  fullName: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP' | 'PPT';
  documentNumber: string;
  fichaNumber: string;
  programName: string;
  centerName: string;
  regional: string;
}

export interface LearningTopic {
  id: string;
  title: string;
  subtitle: string;
  articleRef?: string;
  content: string[];
  keyPoints: string[];
  exampleScenario?: {
    context: string;
    action: string;
    explanation: string;
  };
}

export interface LearningModule {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  iconName: string;
  topics: LearningTopic[];
  quizQuestionCount: number;
}

export interface CaseChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  consequence: string;
  legalBasis: string;
  xpReward: number;
}

export interface CaseDilemma {
  id: string;
  title: string;
  category: 'Derecho' | 'Deber' | 'Prohibición' | 'Convivencia' | 'Etapa Productiva';
  scenario: string;
  character: string;
  role: string;
  choices: CaseChoice[];
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  legalArticle: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserProgress {
  completedModules: string[];
  completedCases: string[];
  quizPassed: boolean;
  quizScore: number;
  xp: number;
  level: number;
  badges: string[];
  certificateIssuedDate?: string;
  certificateCode?: string;
}
