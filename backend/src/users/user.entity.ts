// user.entity.ts
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { Train } from "src/trains/train.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Train, (train) => train.user)
  trains: Train[];
}
