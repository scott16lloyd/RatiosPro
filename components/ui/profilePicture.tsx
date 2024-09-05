import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ProfilePicture({ username }: { username: string }) {
  let initials = '';
  // Get the first two letters of the username
  if (username && username.includes(' ')) {
    initials = username
      .split(' ')
      .map((name) => name[0])
      .join('')
      .toUpperCase();
  } else {
    initials = username[0]?.toUpperCase();
  }

  return (
    <Avatar className="min-w-10">
      <AvatarImage />
      <AvatarFallback className="dark:bg-secondary">{initials}</AvatarFallback>
    </Avatar>
  );
}
