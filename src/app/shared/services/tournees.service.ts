import { TourneeInterface } from './../interfaces/tournee';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ResaService } from './resa.service';
import { ResaModel } from '../models/resa-model';

@Injectable({
  providedIn: 'root'
})
export class TourneesService {
  private resaService: ResaService = new ResaService();

  constructor() {
   }

  public getTournees(): Promise<Array<TourneeInterface>> {
    return new Promise((resolve) => {
      const tournees: Array<TourneeInterface> = new Array<TourneeInterface>();
      const today: moment.Moment = moment();
      this.resaService.getAll().then((resas) => {
        tournees.push(
          {
            hour: today.clone().hour(8).minute(0).second(0),
            dispo: this.setDispos(resas, today.clone().hour(8).minute(0).second(0)),
            resa: 1
          },
          {
            hour: today.clone().hour(11).minute(0).second(0),
            dispo: this.setDispos(resas, today.clone().hour(11).minute(0).second(0)),
            resa: 1
          },
          {
            hour: today.clone().hour(14).minute(0).second(0),
            dispo: this.setDispos(resas, today.clone().hour(14).minute(0).second(0)),
            resa: 1
          },
          {
            hour: today.clone().hour(17).minute(0).second(0),
            dispo: this.setDispos(resas, today.clone().hour(17).minute(0).second(0)),
            resa: 1
          },
        );

        resolve(tournees);
      });

    });
  }

  private setDispos(resas: Array<ResaModel>, tourHour: moment.Moment): number {

    const indice: number = resas.findIndex((obj) => {
      return obj.getTourDate().isSame(tourHour, 'hour');
    });

    if (indice !== -1) {
      return 8 - resas[indice].getPlaces();
    }
    return 8;
  }
}
