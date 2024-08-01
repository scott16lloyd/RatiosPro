import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ProfilePicture() {
  return (
    <Avatar className="h-fit max-w-fit">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
