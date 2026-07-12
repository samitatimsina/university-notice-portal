import {
  Calendar,
  GraduationCap,
  User,
  BookOpen,
} from "lucide-react";

import type { Notice} from "../types/notice";

import AttachmentList from "../components/AttachmentList";
import PriorityBadge from "../components/PriorityBadge";

interface Props {
  notice: Notice;
  isAdmin?: boolean;
  children?: React.ReactNode;
}

export default function NoticeDetailsCard({
  notice,
  isAdmin = false,
  children,
}: Props) {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

      {/* Header */}

      <div className="border-b px-8 py-6">
        <h1 className="text-3xl font-bold">
          {notice.title}
        </h1>

        <div className="flex flex-wrap gap-5 mt-5 text-gray-600">

          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            {notice.category}
          </div>

          <div className="flex items-center gap-2">
            <GraduationCap size={18} />
            {notice.faculty}
          </div>

          <div>
            AcademicLevel {notice.academic_level}
          </div>

          <PriorityBadge priority={notice.priority} />

        </div>
      </div>

      {/* Body */}

      <div className="px-8 py-8 space-y-8">

        <section>

          <h2 className="font-semibold text-xl mb-3">
            Description
          </h2>

          <p className="leading-8 whitespace-pre-wrap">
            {notice.description}
          </p>

        </section>

        <section>

          <h2 className="font-semibold text-xl mb-4">
            Attachments
          </h2>

          <AttachmentList
            attachments={notice.attachments}
          />

        </section>

      </div>

      {/* Footer */}

      <div className="bg-gray-50 border-t px-8 py-5 flex flex-wrap justify-between">

        <div className="space-y-2">

          <div className="flex gap-2 items-center">

            <User size={17} />

            <span>{notice.created_by}</span>

          </div>

          <div className="flex gap-2 items-center">

            <Calendar size={17} />

            <span>
              {new Date(
                notice.created_at
              ).toLocaleDateString()}
            </span>

          </div>

        </div>

        <div className="space-y-2 text-right">

          {isAdmin && (
            <div>
              Status :
              <span className="font-semibold ml-2">
                {notice.status}
              </span>
            </div>
          )}

        </div>

      </div>

      {children}

    </div>
  );
}