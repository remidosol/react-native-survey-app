import { SurveyQuestionData } from "../data";

export enum QuestionType {
  multiple = "multiple",
  single = "single",
  slider = "slider",
}

export type SurveyAnswer = {
  questionId: string;
  questionType: QuestionType;
  answer: (string | number) | (string | number)[];
  lastAnswerDate: string | Date;
};

export type SurveyScreenRouteParams = {
  surveyId: string;
  title: string;
  surveyQuestionsData: SurveyQuestionData<QuestionType>[];
};

export type StoredSurveyData = {
  [surveyId: string]: {
    surveyAnswers: SurveyAnswer[];
    score?: number;
    isSurveyCompleted: boolean;
    currentQuestionIndex: number;
    lastAnswerDate: string;
    userId: string;
    title: string;
  };
};

export type SurveyDetailDataItem = {
  surveyId: string;
  surveyAnswers: SurveyAnswer[];
  isSurveyCompleted: boolean;
  currentQuestionIndex: number;
  score?: number;
  lastAnswerDate: string;
  userId: string;
  title: string;
};
