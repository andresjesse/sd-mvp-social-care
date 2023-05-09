export type SocialService = {
  id?: string;
  date: Date | string;
  origin: string;
  demands: string[];
  otherDemand?: string;
  forward?: string;
};
