import HappyFaceAnimated from "./components/Animated/AnimatedHappyFace";
import { CommonSliderSvgAnimatedProps } from "./types/props";
import { QuestionType } from "./types/survey";

export type SurveyQuestionData<T extends QuestionType> = {
  id: string;
  questionType: T;
  questionText: {
    en: string;
    tr: string;
  };
  svgComponent?: T extends QuestionType.slider ? React.FC<CommonSliderSvgAnimatedProps> : undefined;
  options?: {
    en: string[];
    tr: string[];
  };
};

export const singleChoiceQuestionsData: SurveyQuestionData<QuestionType.single>[] = [
  {
    id: "1",
    questionType: QuestionType.single,
    questionText: {
      en: "How would you rate your overall experience with our service?",
      tr: "Hizmetimizle ilgili genel deneyiminizi nasıl değerlendirirsiniz?",
    },
    options: {
      en: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
      tr: ["Mükemmel", "İyi", "Orta", "Kötü", "Çok Kötü"],
    },
  },
  {
    id: "2",
    questionType: QuestionType.single,
    questionText: {
      en: "How likely are you to recommend us to a friend?",
      tr: "Bizi bir arkadaşınıza tavsiye etme olasılığınız nedir?",
    },
    options: {
      en: ["Definitely", "Probably", "Not Sure", "Probably Not", "Definitely Not"],
      tr: ["Kesinlikle", "Muhtemelen", "Emin Değil", "Muhtemelen Değil", "Kesinlikle Değil"],
    },
  },
  {
    id: "3",
    questionType: QuestionType.single,
    questionText: {
      en: "How satisfied are you with the product quality?",
      tr: "Ürün kalitesinden ne kadar memnunsunuz?",
    },
    options: {
      en: ["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied", "Very Unsatisfied"],
      tr: ["Çok Memnun", "Memnun", "Nötr", "Memnun Değil", "Hiç Memnun Değil"],
    },
  },
  {
    id: "4",
    questionType: QuestionType.single,
    questionText: {
      en: "How often do you use our services?",
      tr: "Hizmetlerimizi ne sıklıkla kullanıyorsunuz?",
    },
    options: {
      en: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
      tr: ["Günlük", "Haftalık", "Aylık", "Nadiren", "Hiçbir Zaman"],
    },
  },
  {
    id: "5",
    questionType: QuestionType.single,
    questionText: {
      en: "How easy was it to navigate our website?",
      tr: "Web sitemizde gezinmek ne kadar kolaydı?",
    },
    options: {
      en: ["Very Easy", "Easy", "Neutral", "Difficult", "Very Difficult"],
      tr: ["Çok Kolay", "Kolay", "Nötr", "Zor", "Çok Zor"],
    },
  },
  {
    id: "6",
    questionType: QuestionType.single,
    questionText: {
      en: "How do you feel about the customer support you received?",
      tr: "Aldığınız müşteri desteği hakkında ne düşünüyorsunuz?",
    },
    options: {
      en: ["Very Positive", "Positive", "Neutral", "Negative", "Very Negative"],
      tr: ["Çok Olumlu", "Olumlu", "Nötr", "Olumsuz", "Çok Olumsuz"],
    },
  },
  {
    id: "7",
    questionType: QuestionType.single,
    questionText: {
      en: "Did our product meet your expectations?",
      tr: "Ürünümüz beklentilerinizi karşıladı mı?",
    },
    options: {
      en: ["Far Exceeded", "Exceeded", "Met", "Below", "Far Below"],
      tr: ["Çok Aştı", "Aştı", "Karşıladı", "Altında", "Çok Altında"],
    },
  },
  {
    id: "8",
    questionType: QuestionType.single,
    questionText: {
      en: "How satisfied are you with the pricing of our products?",
      tr: "Ürünlerimizin fiyatlandırmasından ne kadar memnunsunuz?",
    },
    options: {
      en: ["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied", "Very Unsatisfied"],
      tr: ["Çok Memnun", "Memnun", "Nötr", "Memnun Değil", "Hiç Memnun Değil"],
    },
  },
  {
    id: "9",
    questionType: QuestionType.single,
    questionText: {
      en: "How likely are you to purchase from us again?",
      tr: "Bizden tekrar satın alma olasılığınız nedir?",
    },
    options: {
      en: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"],
      tr: ["Çok Muhtemel", "Muhtemel", "Nötr", "Pek Muhtemel Değil", "Hiç Muhtemel Değil"],
    },
  },
  {
    id: "10",
    questionType: QuestionType.single,
    questionText: {
      en: "How would you describe your overall interaction with our team?",
      tr: "Ekibimizle genel etkileşiminizi nasıl tanımlarsınız?",
    },
    options: {
      en: ["Very Pleasant", "Pleasant", "Neutral", "Unpleasant", "Very Unpleasant"],
      tr: ["Çok Hoş", "Hoş", "Nötr", "Hoş Değil", "Çok Hoş Değil"],
    },
  },
];

export const sliderQuestionsData: SurveyQuestionData<QuestionType.slider>[] = [
  {
    id: "1",
    questionType: QuestionType.slider,
    questionText: {
      en: "How are you feeling today?",
      tr: "Bugün nasıl hissediyorsunuz?",
    },
    svgComponent: HappyFaceAnimated,
  },
  {
    id: "2",
    questionType: QuestionType.slider,
    questionText: {
      en: "How are you feeling today?",
      tr: "Bugün nasıl hissediyorsunuz?",
    },
    svgComponent: HappyFaceAnimated,
  },
  {
    id: "3",
    questionType: QuestionType.slider,
    questionText: {
      en: "How are you feeling today?",
      tr: "Bugün nasıl hissediyorsunuz?",
    },
    svgComponent: HappyFaceAnimated,
  },
  {
    id: "4",
    questionType: QuestionType.slider,
    questionText: {
      en: "How are you feeling today?",
      tr: "Bugün nasıl hissediyorsunuz?",
    },
    svgComponent: HappyFaceAnimated,
  },
  {
    id: "5",
    questionType: QuestionType.slider,
    questionText: {
      en: "How are you feeling today?",
      tr: "Bugün nasıl hissediyorsunuz?",
    },
    svgComponent: HappyFaceAnimated,
  },
  {
    id: "6",
    questionType: QuestionType.slider,
    questionText: {
      en: "How are you feeling today?",
      tr: "Bugün nasıl hissediyorsunuz?",
    },
    svgComponent: HappyFaceAnimated,
  },
  {
    id: "7",
    questionType: QuestionType.slider,
    questionText: {
      en: "How are you feeling today?",
      tr: "Bugün nasıl hissediyorsunuz?",
    },
    svgComponent: HappyFaceAnimated,
  },
  {
    id: "8",
    questionType: QuestionType.slider,
    questionText: {
      en: "How are you feeling today?",
      tr: "Bugün nasıl hissediyorsunuz?",
    },
    svgComponent: HappyFaceAnimated,
  },
  {
    id: "9",
    questionType: QuestionType.slider,
    questionText: {
      en: "How are you feeling today?",
      tr: "Bugün nasıl hissediyorsunuz?",
    },
    svgComponent: HappyFaceAnimated,
  },
  {
    id: "10",
    questionType: QuestionType.slider,
    questionText: {
      en: "How are you feeling today?",
      tr: "Bugün nasıl hissediyorsunuz?",
    },
    svgComponent: HappyFaceAnimated,
  },
  //   {
  //     id: "2",
  //     questionType: QuestionType.slider,
  //     questionText: {
  //       en: "How stressed do you feel at work?",
  //       tr: "İş yerinde ne kadar stresli hissediyorsunuz?",
  //     },
  //     svgComponent: "./components/Animated/AnimatedStressMeter.tsx",
  //   },
  //   {
  //     id: "3",
  //     questionType: QuestionType.slider,
  //     questionText: {
  //       en: "How motivated are you to achieve your goals?",
  //       tr: "Hedeflerinize ulaşmak için ne kadar motive hissediyorsunuz?",
  //     },
  //     svgComponent: "./components/Animated/AnimatedMotivationBar.tsx",
  //   },
  //   {
  //     id: "4",
  //     questionType: QuestionType.slider,
  //     questionText: {
  //       en: "How much energy do you have right now?",
  //       tr: "Şu anda ne kadar enerjiye sahipsiniz?",
  //     },
  //     svgComponent: "./components/Animated/AnimatedEnergyGauge.tsx",
  //   },
  //   {
  //     id: "5",
  //     questionType: QuestionType.slider,
  //     questionText: {
  //       en: "How confident are you in your skills?",
  //       tr: "Becerileriniz konusunda ne kadar kendinize güveniyorsunuz?",
  //     },
  //     svgComponent: "./components/Animated/AnimatedConfidenceMeter.tsx",
  //   },
  //   {
  //     id: "6",
  //     questionType: QuestionType.slider,
  //     questionText: {
  //       en: "How relaxed are you at this moment?",
  //       tr: "Bu anda ne kadar rahat hissediyorsunuz?",
  //     },
  //     svgComponent: "./components/Animated/AnimatedRelaxationFace.tsx",
  //   },
  //   {
  //     id: "7",
  //     questionType: QuestionType.slider,
  //     questionText: {
  //       en: "How focused are you on your tasks today?",
  //       tr: "Bugün görevlerinize ne kadar odaklandınız?",
  //     },
  //     svgComponent: "./components/Animated/AnimatedFocusMeter.tsx",
  //   },
  //   {
  //     id: "8",
  //     questionType: QuestionType.slider,
  //     questionText: {
  //       en: "How happy are you with your progress this week?",
  //       tr: "Bu hafta ilerlemenizden ne kadar memnunsunuz?",
  //     },
  //     svgComponent: "./components/Animated/AnimatedProgressFace.tsx",
  //   },
  //   {
  //     id: "9",
  //     questionType: QuestionType.slider,
  //     questionText: {
  //       en: "How much do you enjoy your daily activities?",
  //       tr: "Günlük aktivitelerinizden ne kadar keyif alıyorsunuz?",
  //     },
  //     svgComponent: "./components/Animated/AnimatedEnjoymentMeter.tsx",
  //   },
  //   {
  //     id: "10",
  //     questionType: QuestionType.slider,
  //     questionText: {
  //       en: "How well did you sleep last night?",
  //       tr: "Dün gece ne kadar iyi uyudunuz?",
  //     },
  //     svgComponent: "./components/Animated/AnimatedSleepMeter.tsx",
  //   },
];

export const multipleChoiceQuestionsData: SurveyQuestionData<QuestionType.multiple>[] = [
  {
    id: "1",
    questionType: QuestionType.multiple,
    questionText: {
      en: "What features do you value the most in our product?",
      tr: "Ürünümüzde en çok hangi özellikleri değerli buluyorsunuz?",
    },
    options: {
      en: ["Ease of Use", "Design", "Performance", "Customer Support", "Pricing"],
      tr: ["Kullanım Kolaylığı", "Tasarım", "Performans", "Müşteri Desteği", "Fiyatlandırma"],
    },
  },
  {
    id: "2",
    questionType: QuestionType.multiple,
    questionText: {
      en: "Which of the following best describes how you use our product?",
      tr: "Aşağıdakilerden hangisi ürünümüzü nasıl kullandığınızı en iyi tanımlar?",
    },
    options: {
      en: ["Personal", "Business", "Education", "Research", "Other"],
      tr: ["Kişisel", "İş", "Eğitim", "Araştırma", "Diğer"],
    },
  },
  {
    id: "3",
    questionType: QuestionType.multiple,
    questionText: {
      en: "What communication channels do you prefer?",
      tr: "Hangi iletişim kanallarını tercih edersiniz?",
    },
    options: {
      en: ["Email", "Phone", "Chat", "Social Media", "In-Person"],
      tr: ["E-posta", "Telefon", "Sohbet", "Sosyal Medya", "Yüz Yüze"],
    },
  },
  {
    id: "4",
    questionType: QuestionType.multiple,
    questionText: {
      en: "Which products have you purchased from us?",
      tr: "Bizden hangi ürünleri satın aldınız?",
    },
    options: {
      en: ["Product A", "Product B", "Product C", "Product D", "Product E"],
      tr: ["Ürün A", "Ürün B", "Ürün C", "Ürün D", "Ürün E"],
    },
  },
  {
    id: "5",
    questionType: QuestionType.multiple,
    questionText: {
      en: "What factors influenced your decision to buy our product?",
      tr: "Ürünümüzü satın alma kararınızı hangi faktörler etkiledi?",
    },
    options: {
      en: ["Price", "Features", "Brand Reputation", "Reviews", "Availability"],
      tr: ["Fiyat", "Özellikler", "Marka İtibarı", "Yorumlar", "Erişilebilirlik"],
    },
  },
  {
    id: "6",
    questionType: QuestionType.multiple,
    questionText: {
      en: "What do you use our app for the most?",
      tr: "Uygulamamızı en çok ne için kullanıyorsunuz?",
    },
    options: {
      en: ["Socializing", "Work", "Learning", "Entertainment", "Shopping"],
      tr: ["Sosyalleşme", "İş", "Öğrenme", "Eğlence", "Alışveriş"],
    },
  },
  {
    id: "7",
    questionType: QuestionType.multiple,
    questionText: {
      en: "What improvements would you like to see?",
      tr: "Hangi geliştirmeleri görmek istersiniz?",
    },
    options: {
      en: ["More Features", "Better Design", "Faster Performance", "Lower Prices", "More Support"],
      tr: [
        "Daha Fazla Özellik",
        "Daha İyi Tasarım",
        "Daha Hızlı Performans",
        "Daha Düşük Fiyatlar",
        "Daha Fazla Destek",
      ],
    },
  },
  {
    id: "8",
    questionType: QuestionType.multiple,
    questionText: {
      en: "Which services have you used from us?",
      tr: "Bizden hangi hizmetleri aldınız?",
    },
    options: {
      en: ["Consultation", "Training", "Support", "Custom Solutions", "Subscription"],
      tr: ["Danışmanlık", "Eğitim", "Destek", "Özel Çözümler", "Abonelik"],
    },
  },
  {
    id: "9",
    questionType: QuestionType.multiple,
    questionText: {
      en: "What type of content do you enjoy the most?",
      tr: "En çok hangi tür içerikten hoşlanıyorsunuz?",
    },
    options: {
      en: ["Videos", "Articles", "Podcasts", "Infographics", "Interactive Tools"],
      tr: ["Videolar", "Makaleler", "Podcast'ler", "Bilgi Grafikleri", "Etkileşimli Araçlar"],
    },
  },
  {
    id: "10",
    questionType: QuestionType.multiple,
    questionText: {
      en: "Which social media platforms do you follow us on?",
      tr: "Bizi hangi sosyal medya platformlarında takip ediyorsunuz?",
    },
    options: {
      en: ["Facebook", "Twitter", "Instagram", "LinkedIn", "YouTube"],
      tr: ["Facebook", "Twitter", "Instagram", "LinkedIn", "YouTube"],
    },
  },
];
