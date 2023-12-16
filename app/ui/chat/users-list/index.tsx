import Image from 'next/image';
import styles from "./styles.module.scss";

export default function UsersList() {
  return (
    <div className={styles.container}>
      Users list
      <div>
        <div className="flex items-center p-3">
          <Image
            src={'/users/user1.png'}
            alt={`user name`}
            className="mr-4 rounded-full"
            width={32}
            height={32}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold md:text-base">
              Name 1
            </p>
          </div>
        </div>
        <div className="flex items-center p-3">
          <Image
            src={'/users/user2.png'}
            alt={`user name`}
            className="mr-4 rounded-full"
            width={32}
            height={32}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold md:text-base">
              Name 2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
