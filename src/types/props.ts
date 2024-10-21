import { User } from "./auth";
import { SurveyAnswer } from "./survey";

export type BaseNavigationRouteParam = {
  userId?: number;
  token?: string;
};

export type UseSaveUserDataProps = {
  user?: Partial<User>;
  token?: string;
};

export type UseSaveSurveyDataProps = {
  surveyId: string;
  userId: number;
  title: string;
  surveyAnswers: SurveyAnswer[];
  isSurveyCompleted: boolean;
  currentQuestionIndex: number;
};

export type CommonSliderSvgAnimatedProps = {
  sliderValue: number;
};
