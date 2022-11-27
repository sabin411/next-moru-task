export type UserCardProps = {
  liked?: boolean;
  onLike: (id: number) => void;
  onEdit: (editedUserData: UserCardDataProps) => void;
  onDelete: (id: number) => void;
} & UserCardDataProps;

export type UserCardDataProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
};
