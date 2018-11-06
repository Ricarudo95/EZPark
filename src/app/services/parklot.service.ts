import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Parklot{
  cost_hour:number,
  location:string,
  name:string,
  spaces:Map<string,string>
}

@Injectable({
  providedIn: 'root'
})


export class ParklotService {

  private parklotCollection: AngularFirestoreCollection<Parklot>;

  private parklot: Observable<Parklot[]>
  constructor(db: AngularFirestore) { 
    this.parklotCollection = db.collection<Parklot>('Parkings')

    this.parklot = this.parklotCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a=> {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      })
    );
  }

  getParklots(){
    return this.parklot;
  }

  getParklot(id){
    return this.parklotCollection.doc<Parklot>(id).valueChanges();
  }

  updateParklots(parklot: Parklot, id: string){
    return this.parklotCollection.doc(id).update(parklot);
  }

  addParklot(parklot: Parklot){
    return this.parklotCollection.add(parklot);
  }

  removeParklot(id){
    return this.parklotCollection.doc(id).delete();
  }

}
