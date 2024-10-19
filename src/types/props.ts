import { User } from "./auth";
import { SurveyAnswer } from "./survey";

export type BaseNavigationRouteParam = {
  userId?: string;
  token?: string;
};

export type UseSaveUserDataProps = {
  user?: Partial<User>;
  token?: string;
};

export type UseSaveSurveyDataProps = {
  surveyId: string;
  userId: string;
  title: string;
  surveyAnswers: SurveyAnswer[];
  isSurveyCompleted: boolean;
  currentQuestionIndex: number;
};

export type CommonSliderSvgAnimatedProps = {
  sliderValue: number;
};
