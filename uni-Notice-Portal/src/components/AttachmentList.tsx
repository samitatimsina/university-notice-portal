import type { Attachment } from "../types/notice";
import { Paperclip } from "lucide-react";

interface Props {
  attachments?: Attachment[];
}

export default function AttachmentList({
  attachments,
}: Props) {
  if (!attachments?.length)
    return <p className="text-gray-500">No attachments</p>;

  return (
    <div className="space-y-3">
      {attachments.map((file) => (
        <a
          key={file.id}
          href={file.file_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 border rounded-lg p-3 hover:bg-gray-100"
        >
          <Paperclip size={18} />
          <span>{file.file_name}</span>
        </a>
      ))}
    </div>
  );
}