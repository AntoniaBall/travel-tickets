import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "../city/city.entity";

@Entity()
export class Station {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    address: number;

    @ManyToOne(() => City, (city) => city.stations)
    city : City;
}