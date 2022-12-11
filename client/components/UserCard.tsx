import Image from 'next/image';

const UserCard = () => {
  return (
    <div className='border-t-2 flex items-center gap-4 border-gray p-6'>
      <Image
        src='/user.png'
        width={50}
        height={50}
        alt='user photo'
        className='rounded-sm'
      />
      <h3 className='text-lg'>Yasser Saleh</h3>
    </div>
  );
};
export default UserCard;
