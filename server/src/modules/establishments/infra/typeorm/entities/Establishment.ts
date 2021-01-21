import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import uploadConfig from '@config/UploadConfig';
import Address from './Address';

@Entity('establishments')
class Establishment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  type: string;

  @OneToOne(() => Address, { eager: true, cascade: true })
  @JoinColumn()
  address: Address;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${
          process.env.APP_API_URL
        }/files/establishment_avatars/${encodeURIComponent(this.avatar)}`;
      case 's3':
        return `https://${
          uploadConfig.config.aws.bucket
        }.s3.amazonaws.com/files/establishment_avatars/${encodeURIComponent(
          this.avatar,
        )}`;
      default:
        return null;
    }
  }
}

export default Establishment;
