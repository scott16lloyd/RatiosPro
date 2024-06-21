import Image from 'next/image';
import person1 from '@/public/DemoUserProfileImages/person1.jpg';
import person3 from '@/public/DemoUserProfileImages/person3.jpg';
import person4 from '@/public/DemoUserProfileImages/person4.jpg';

export function WaitlisterProfiles() {
  const profileImages = [person1, person3, person4];
  return (
    <div className="flex flex-row items-center">
      {profileImages.map((image, index) => (
        <div
          key={index}
          className="bg-white rounded-full w-10 h-10 -mr-2 overflow-hidden border-white border-[1px]"
        >
          <Image
            src={image}
            alt={`profile-${index}`}
            fit="cover"
            className="rounded-full"
          />
        </div>
      ))}
      <span className="text-white ml-4 text-lg md:text-xl">
        Join 48+ waitlisters
      </span>
    </div>
  );
}
