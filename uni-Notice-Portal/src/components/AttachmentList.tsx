import { Paperclip } from "lucide-react";

interface Props {
  attachment?: string | null;
}

export default function AttachmentList({
  attachment,
}: Props) {
  if (!attachment) {
    return <p className="text-gray-500">No attachments</p>;
  }

  return (
    <a
      href={`http://localhost:5000${attachment}`}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 border rounded-lg p-3 hover:bg-gray-100"
    >
      <Paperclip size={18} />
      <span>{attachment.split("/").pop()}</span>
    </a>
  );
}