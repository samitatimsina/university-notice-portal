export interface Attachment {
  id: number;
  file_name: string;
  file_url: string;
}

export interface Notice {
  notice_id: number;
  title: string;
  description: string;
  category: string;
  faculty: string;
  academic_level: string;
  priority: "Low" | "Medium" | "High";
  created_by: string;
  created_at: string;
  updated_at?: string;
  status: "Published";
  views?: number;
  attachments?: Attachment[];
}

export interface NoticeStats {
  totalUsers: number;
  delivered: number;
  read: number;
  unread: number;
}