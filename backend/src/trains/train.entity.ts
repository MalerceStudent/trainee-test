// train.entity.ts
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";

@Entity()
export class Train {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  name: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  departure: string;

  @Column()
  arrival: string;

  // зв’язок: потяг належить одному користувачу
  @ManyToOne(() => User, (user) => user.trains, { onDelete: "CASCADE" })
  user: User;
}
