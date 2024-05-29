export interface Engagement {
  _id: number;
  data: DataEngagement;
  totalItems: number;
}

export interface DataEngagement {
  image_url: string;
  username: string;
  course: string;
  timestamp: string;
  expression: string;
  confidence: number;
  ftp_path: string;
  updated_at: string;
}

export interface EngagementImage {
  _id: number;
  image_url: string;
}
