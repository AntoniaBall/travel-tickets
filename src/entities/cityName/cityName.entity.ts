import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "../city/city.entity";

@Entity()
export class CityName {
    @PrimaryGeneratedColumn()
    cityNameId: number;

    @Column()
    translatedName: string;
    
    @Column()
    language: string;

    @ManyToOne(() => City, (city) => city.cityNames)
    city: City;
}