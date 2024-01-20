import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Station } from "../station/station.entity";
import { CityName } from "../cityName/cityName.entity";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    cityId: number;

    @Column()
    originalName: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @OneToMany(() => CityName, (cityName) => cityName.city)
    cityNames: CityName[];

    @OneToMany(() => Station, (station) => station.city)
    stations: Station[];
}