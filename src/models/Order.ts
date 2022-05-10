import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import OrderProduct from "./OrderProduct";

@Entity("orders")
export class Order {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, { eager: true })
  products: OrderProduct[];

  @Column()
  desk: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;